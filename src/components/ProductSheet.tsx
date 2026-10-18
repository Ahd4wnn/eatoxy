import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, Minus, Plus, X } from "lucide-react";
import clsx from "clsx";
import { productById, rupees, type Product } from "../data/products";
import { dressings, NO_DRESSING } from "../data/dressings";
import { useCart } from "../lib/cart";
import { lockScroll } from "../lib/scroll";
import { ImageSlot } from "./ImageSlot";

/** Item modal (DoorDash / sweetgreen pattern); bottom sheet on mobile. */
export function ProductSheet() {
  const { viewing, view } = useCart();
  const product = viewing ? productById(viewing) : undefined;

  useEffect(() => {
    if (!product) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && view(null);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [product, view]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => view(null)}
            className="fixed inset-0 z-[60] bg-ink/45"
          />
          <motion.div
            role="dialog" aria-modal="true" aria-label={product.name}
            data-lenis-prevent
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[70] max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[2rem] bg-paper md:inset-x-0 md:top-1/2 md:bottom-auto md:mx-auto md:max-w-4xl md:-translate-y-1/2"
          >
            <Body key={product.id} product={product} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Body({ product: p }: { product: Product }) {
  const { view, add } = useCart();
  const [qty, setQty] = useState(1);
  const [dressing, setDressing] = useState<string>();
  const [nudge, setNudge] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dressingRef = useRef<HTMLFieldSetElement>(null);
  const needsDressing = p.dressing && !dressing;

  useEffect(() => closeRef.current?.focus(), []);
  useEffect(() => {
    if (!nudge) return;
    const t = setTimeout(() => setNudge(false), 1400);
    return () => clearTimeout(t);
  }, [nudge]);

  // Instead of a dead disabled button, point people at the step they missed.
  const showDressings = () => {
    dressingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setNudge(true);
  };

  return (
    <div className="grid gap-5 p-4 md:grid-cols-2 md:gap-8 md:p-6">
      {/* Shorter photo on phones so the dressing step starts above the fold. */}
      <ImageSlot product={p} className="max-md:aspect-[16/10]" />

      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow mt-2 text-forest/60">{p.category}</p>
          <button ref={closeRef} aria-label="Close" onClick={() => view(null)} className="grid size-10 shrink-0 place-items-center rounded-full border border-forest/25 hover:bg-forest hover:text-paper">
            <X size={18} />
          </button>
        </div>
        <h2 className="display mt-2 text-[clamp(2.5rem,5vw,3.75rem)] text-forest">{p.name}</h2>
        <p className="mt-2 text-xl font-bold tabular-nums">{rupees(p.price)}</p>

        {p.ingredients.length > 0 && (
          <p className="mt-5 leading-relaxed text-ink/75">{p.ingredients.join(", ")}</p>
        )}

        {p.dressing && (
          <fieldset
            ref={dressingRef}
            className={clsx(
              "-mx-3 mt-5 scroll-mb-28 rounded-[20px] px-3 pb-3 pt-1 transition-colors duration-500",
              nudge ? "bg-lime/35" : "bg-transparent",
            )}
          >
            <legend className="eyebrow float-left mb-3 mt-2 w-full text-forest/70">
              Choose a dressing <span className="normal-case tracking-normal text-forest/50">· required</span>
            </legend>
            <div className="clear-both flex flex-wrap gap-2">
              {[...dressings, NO_DRESSING].map((d) => (
                <button
                  key={d}
                  aria-pressed={dressing === d}
                  onClick={() => setDressing(d)}
                  className={clsx(
                    "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    dressing === d ? "border-forest bg-forest text-paper" : "border-forest/25 hover:border-forest",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* When stuck it sits on the scroller's edge, past the sheet padding, so it carries its own bottom gap. */}
        <div className="sticky bottom-0 -mb-4 mt-auto flex items-center gap-3 bg-paper pb-[max(1rem,env(safe-area-inset-bottom))] pt-5 md:mb-0 md:pb-0">

          <div className="flex h-14 items-center rounded-full border border-forest/25 px-1.5">
            <button aria-label="Less" disabled={qty === 1} onClick={() => setQty(qty - 1)} className="grid size-11 place-items-center rounded-full disabled:opacity-30"><Minus size={16} /></button>
            <span className="w-6 text-center font-bold tabular-nums">{qty}</span>
            <button aria-label="More" onClick={() => setQty(qty + 1)} className="grid size-11 place-items-center rounded-full"><Plus size={16} /></button>
          </div>
          <button
            onClick={() => (needsDressing ? showDressings() : add(p.id, qty, p.dressing ? dressing : undefined))}
            className={clsx(
              "flex h-14 flex-1 items-center justify-center gap-2 rounded-full font-bold transition-transform hover:scale-[1.02] active:scale-95",
              needsDressing ? "bg-forest text-paper" : "bg-lime text-ink",
            )}
          >
            {needsDressing ? <>Choose a dressing <ArrowDown size={18} /></> : `Add to order · ${rupees(qty * p.price)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
