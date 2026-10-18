import { motion } from "motion/react";
import clsx from "clsx";

/** Big Tanker tabs with a gliding lime underline (sweetgreen pattern). */
export function CategoryTabs<T extends string>({ tabs, value, onChange, id }: { tabs: readonly T[]; value: T; onChange: (t: T) => void; id: string }) {
  return (
    <div role="tablist" aria-label="Menu categories" className="flex gap-6 overflow-x-auto pb-2 pr-12 [scrollbar-width:none] max-md:[mask-image:linear-gradient(to_right,black_80%,transparent)] md:gap-10 md:pr-0">
      {tabs.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={value === t}
          onClick={() => onChange(t)}
          className={clsx("display relative min-h-11 shrink-0 pb-3 text-[clamp(1.6rem,3.4vw,2.75rem)] transition-colors", value === t ? "text-forest" : "text-forest/35 hover:text-forest/70")}
        >
          {t}
          {value === t && <motion.span layoutId={id} className="absolute inset-x-0 bottom-0 h-[5px] rounded-full bg-lime" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />}
        </button>
      ))}
    </div>
  );
}
