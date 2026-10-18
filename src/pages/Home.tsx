import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { CategoryTabs } from "../components/CategoryTabs";
import { ImageSlot } from "../components/ImageSlot";
import { ProductCard } from "../components/ProductCard";
import { Reviews } from "../components/Reviews";
import { categories, productById, products, rupees, type Category } from "../data/products";
import { useCart } from "../lib/cart";
import { reducedMotion } from "../lib/scroll";
import { chatUrl } from "../lib/whatsapp";

const hero = productById("protein-crave")!;

function Hero() {
  const bowl = useRef<HTMLDivElement>(null);
  const { view } = useCart();

  useEffect(() => {
    if (!bowl.current || reducedMotion()) return;
    const tween = gsap.to(bowl.current, {
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: bowl.current, start: "top 70%", end: "bottom top", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section className="px-5 pb-16 pt-28 text-forest md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow text-center text-forest/70">Mannarkkad · Made fresh to order</p>
        <div className="dotted mt-5 text-forest/35" />
        <h1 className="display py-5 text-center text-[clamp(4.25rem,14vw,13.5rem)] md:py-7">
          Healthy bowls,<br />better you.
        </h1>
        <div className="dotted text-forest/35" />

        <div className="mt-10 grid items-end gap-10 md:grid-cols-[1fr_minmax(0,26rem)_1fr]">
          <div ref={bowl} className="relative mx-auto w-[min(80vw,26rem)] md:order-2">
            <button onClick={() => view(hero.id)} className="block w-full" aria-label={`${hero.name}, ${rupees(hero.price)}`}>
              <ImageSlot product={hero} eager />
            </button>
            <span className="display pointer-events-none absolute -right-3 -top-5 grid size-28 rotate-[10deg] place-items-center rounded-full bg-lime text-center text-[1.35rem] text-ink md:-right-10 md:size-32">
              {hero.name}<br />{rupees(hero.price)}
            </span>
          </div>

          <div className="md:order-1">
            <p className="max-w-xs text-lg leading-relaxed text-ink/75">
              High-protein salads, chaat, oats and pasta, made the day you order. Preorder and delivery on WhatsApp.
            </p>
            <a href={chatUrl()} className="mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-lime px-7 font-bold text-ink transition-transform hover:scale-[1.03] active:scale-95">
              <HugeiconsIcon icon={WhatsappIcon} size={20} strokeWidth={1.75} /> Order on WhatsApp
            </a>
          </div>

          <div className="flex flex-col gap-3 md:order-3 md:items-end md:text-right">
            <Link to="/shop" className="inline-flex h-14 w-fit items-center gap-2 rounded-full border border-forest/30 px-7 font-bold transition-colors hover:bg-forest hover:text-paper">
              See the menu <ArrowDown size={18} />
            </Link>
            <p className="eyebrow text-forest/60">High protein · Made to order · Preorder & delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [tab, setTab] = useState<Category>("Salads");

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-forest/60">The menu</p>
            <h2 className="display mt-3 text-[clamp(3rem,8vw,7rem)] text-forest">Pick your bowl.</h2>
          </div>
          <Link to="/shop" className="flex min-h-11 items-center gap-2 self-start font-bold underline underline-offset-[6px] md:self-auto">
            Full menu, {products.length} items <ArrowUpRight size={18} />
          </Link>
        </div>

        <CategoryTabs tabs={categories} value={tab} onChange={setTab} id="home-tab" />

        <ul key={tab} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((p) => p.category === tab).map((p) => <ProductCard key={p.id} product={p} />)}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <Reviews />
    </>
  );
}
