import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { rupees } from "../data/products";
import { useCart } from "../lib/cart";
import { lockScroll } from "../lib/scroll";
import { buildOrderUrl, chatUrl } from "../lib/whatsapp";

const field = "w-full rounded-2xl border border-forest/20 bg-transparent px-4 py-3 text-base placeholder:text-forest/40 focus:border-forest focus:outline-none";

export function OrderSheet() {
  const { open, setOpen, orderLines, change, clear, total } = useCart();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-ink/45"
          />
          <motion.aside
            role="dialog" aria-modal="true" aria-label="Your order"
            data-lenis-prevent
            initial={{ x: "110%" }} animate={{ x: 0 }} exit={{ x: "110%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-3 right-3 top-3 z-[70] flex w-[min(30rem,calc(100%-1.5rem))] flex-col rounded-[2rem] bg-paper p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_24px_80px_-24px_rgba(22,38,15,0.45)]"
          >
            <div className="flex items-center justify-between">
              <h2 className="display text-5xl text-forest">Your order</h2>
              <button ref={closeRef} aria-label="Close" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full border border-forest/25 hover:bg-forest hover:text-paper">
                <X size={18} />
              </button>
            </div>

            {orderLines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-5">
                <p className="max-w-xs text-lg text-ink/70">Nothing here yet. Pick a bowl from the menu, or just say hi.</p>
                <Link to="/shop" onClick={() => setOpen(false)} className="rounded-full bg-lime px-6 py-3 font-bold text-ink">See the menu</Link>
                <a href={chatUrl()} className="text-sm underline underline-offset-4">Chat on WhatsApp instead</a>
              </div>
            ) : (
              <>
                <ul className="mt-6 flex-1 divide-y divide-forest/15 overflow-y-auto">
                  {orderLines.map((l, i) => (
                    <li key={`${l.name}-${l.dressing}`} className="flex items-center justify-between gap-4 py-4">
                      <div className="min-w-0">
                        <p className="display text-2xl text-forest">{l.name}</p>
                        <p className="text-sm text-ink/60">{l.dressing ? `${l.dressing} · ` : ""}{rupees(l.qty * l.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button aria-label={`Less ${l.name}`} onClick={() => change(i, -1)} className="grid size-8 place-items-center rounded-full border border-forest/25"><Minus size={14} /></button>
                        <span className="w-5 text-center font-bold tabular-nums">{l.qty}</span>
                        <button aria-label={`More ${l.name}`} onClick={() => change(i, 1)} className="grid size-8 place-items-center rounded-full border border-forest/25"><Plus size={14} /></button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-3">
                  <div className="flex items-baseline justify-between border-t border-forest/20 pt-4">
                    <span className="eyebrow text-forest/60">Total</span>
                    <span className="display text-4xl text-forest">{rupees(total)}</span>
                  </div>
                  <input className={field} placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  <textarea className={`${field} resize-none`} rows={2} placeholder="Delivery area, time, allergies…" value={note} onChange={(e) => setNote(e.target.value)} />
                  <a
                    href={buildOrderUrl(orderLines, name, note)}
                    target="_blank" rel="noreferrer"
                    className="flex h-14 items-center justify-center gap-2 rounded-full bg-lime font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <HugeiconsIcon icon={WhatsappIcon} size={20} strokeWidth={1.75} /> Send on WhatsApp
                  </a>
                  <button onClick={clear} className="w-full text-center text-sm text-ink/55 underline underline-offset-4">Clear order</button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
