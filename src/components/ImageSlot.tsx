import clsx from "clsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { SaladIcon } from "@hugeicons/core-free-icons";
import type { Product } from "../data/products";

/** 1:1 product image. Until photos arrive (Product.image), renders a quiet placeholder tile. */
export function ImageSlot({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={clsx("relative aspect-square overflow-hidden rounded-[28px] bg-paper-2", className)}>
      {/* Photos are shot on white; multiply lets the white take the tile colour so they sit in the page. */}
      {product.image ? (
        <img src={product.image} alt={product.name} loading="lazy" width={1000} height={1000} className="size-full object-cover mix-blend-multiply" />
      ) : (
        <div className="grid size-full place-items-center text-forest/25" aria-hidden>
          <div className="flex flex-col items-center gap-3">
            <HugeiconsIcon icon={SaladIcon} size={44} strokeWidth={1.25} />
            <span className="eyebrow text-[0.65rem]">Photo soon</span>
          </div>
        </div>
      )}
    </div>
  );
}
