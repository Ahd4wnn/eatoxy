import { useState } from "react";
import { CategoryTabs } from "../components/CategoryTabs";
import { ProductCard } from "../components/ProductCard";
import { categories, products, type Category } from "../data/products";

const tabs = ["All", ...categories] as const;

export default function Shop() {
  const [tab, setTab] = useState<Category | "All">("All");
  const shown = tab === "All" ? products : products.filter((p) => p.category === tab);

  return (
    <div className="px-5 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow text-forest/60">The menu · {products.length} items</p>
        <h1 className="display mt-3 text-[clamp(4rem,13vw,12rem)] text-forest">What are you craving?</h1>
        <p className="mt-6 max-w-lg text-lg text-ink/70">
          Tap any item to see what goes in it. Salads come with your pick of 12 dressings.
        </p>

        <div className="sticky top-[5.5rem] z-30 -mx-5 mt-12 bg-paper/95 px-5 pt-3 backdrop-blur md:-mx-10 md:px-10">
          <CategoryTabs tabs={tabs} value={tab} onChange={setTab} id="shop-tab" />
        </div>

        <ul key={tab} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <ProductCard key={p.id} product={p} />)}
        </ul>
      </div>
    </div>
  );
}
