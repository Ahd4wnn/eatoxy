import { useState } from "react";
import { CategoryTabs } from "../components/CategoryTabs";
import { ProductCard } from "../components/ProductCard";
import { categories, products, type Category } from "../data/products";

const tabs = ["All", ...categories] as const;

export default function Shop() {
  const [tab, setTab] = useState<Category | "All">("All");
  const shown = tab === "All" ? products : products.filter((p) => p.category === tab);

  return (
    <div className="pb-28 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-5 md:box-content md:px-10">
        <p className="eyebrow text-forest/60">The menu · {products.length} items</p>
        <h1 className="display mt-3 text-[clamp(4rem,13vw,12rem)] text-forest">What are you craving?</h1>
        <p className="mt-6 max-w-lg text-lg text-ink/70">
          Tap any item to see what goes in it. Salads come with your pick of 12 dressings.
        </p>
      </div>

      {/* Full-bleed and opaque from the viewport top, so cards never show between the floating nav and the tabs. */}
      <div className="sticky top-0 z-30 border-b border-forest/10 bg-paper pt-[5.75rem]">
        <div className="mx-auto max-w-[1400px] px-5 md:box-content md:px-10">
          <CategoryTabs tabs={tabs} value={tab} onChange={setTab} id="shop-tab" />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:box-content md:px-10">
        <ul key={tab} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <ProductCard key={p.id} product={p} />)}
        </ul>
      </div>
    </div>
  );
}
