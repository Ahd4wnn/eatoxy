import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { rupees, type Product } from "../data/products";
import { useCart } from "../lib/cart";
import { ImageSlot } from "./ImageSlot";

export function ProductCard({ product: p }: { product: Product }) {
  const { view } = useCart();

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <button onClick={() => view(p.id)} className="group block w-full text-left" aria-label={`${p.name}, ${rupees(p.price)}`}>
        <div className="relative">
          <ImageSlot product={p} className="transition-transform duration-500 ease-out group-hover:scale-[0.985]" />
          <span className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-lime text-ink transition-transform group-hover:scale-110">
            <Plus size={22} />
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="display text-[1.85rem] text-forest">{p.name}</h3>
          <span className="shrink-0 font-bold tabular-nums">{rupees(p.price)}</span>
        </div>
        {p.ingredients.length > 0 && (
          <p className="mt-1.5 line-clamp-2 text-[0.95rem] text-ink/65">{p.ingredients.join(", ")}</p>
        )}
      </button>
    </motion.li>
  );
}
