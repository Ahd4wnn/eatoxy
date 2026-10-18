import { HugeiconsIcon } from "@hugeicons/react";
import { BodyWeightIcon, DigestionIcon, EnergyIcon, FavouriteIcon, InstagramIcon, Shield01Icon } from "@hugeicons/core-free-icons";
import { ArrowUpRight } from "lucide-react";
import { INSTAGRAM } from "../lib/whatsapp";

const steps = [
  ["Pick", "Choose from the menu. Every bowl is made to order, so nothing sits around."],
  ["Dress", "Salads come with your choice of 12 dressings, from Honey Mustard to Smoky Chipotle."],
  ["Send", "Your order lands on our WhatsApp. We confirm the timing, then prepare it fresh."],
];

const benefits = [
  { label: "Immunity", icon: Shield01Icon },
  { label: "Digestion", icon: DigestionIcon },
  { label: "Heart health", icon: FavouriteIcon },
  { label: "Weight management", icon: BodyWeightIcon },
  { label: "Energy", icon: EnergyIcon },
];

export default function About() {
  return (
    <>
      <section className="px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow text-forest/60">About Eatoxy</p>
          <h1 className="display mt-4 max-w-6xl text-[clamp(3.5rem,9vw,8.5rem)] text-forest">
            A new kitchen in Mannarkkad making healthy food you actually crave.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/75">
            Fresh vegetables, real protein and honest portions. Salads, chaat, oats and pasta, prepared the day you order and delivered from our kitchen. Fresh, natural, good for you.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow mb-8 text-forest/60">How it works</p>
          <ol>
            {steps.map(([title, body], i) => (
              <li key={title} className="grid gap-3 border-t border-forest/20 py-8 last:border-b md:grid-cols-[6rem_1fr_1fr] md:items-baseline md:py-10">
                <span className="display text-4xl text-lime [-webkit-text-stroke:1px_var(--color-forest)]">0{i + 1}</span>
                <h2 className="display text-[clamp(3rem,6vw,5.5rem)] text-forest">{title}</h2>
                <p className="max-w-md text-lg text-ink/70">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow mb-8 text-forest/60">Good food, good for</p>
          <ul className="flex flex-wrap gap-x-12 gap-y-6">
            {benefits.map((b) => (
              <li key={b.label} className="display flex items-center gap-3 text-[clamp(2.25rem,5vw,4rem)] text-forest">
                <HugeiconsIcon icon={b.icon} size={40} strokeWidth={1.5} />
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-3 pb-12 pt-8">
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          className="group mx-auto flex min-h-[22rem] max-w-[1440px] flex-col justify-between rounded-[2rem] bg-forest p-8 text-paper md:p-12"
        >
          <HugeiconsIcon icon={InstagramIcon} size={32} strokeWidth={1.5} />
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="max-w-sm text-lg text-paper/70">Follow along for what's fresh this week.</p>
              <p className="display mt-3 text-[clamp(3.5rem,10vw,9rem)] text-lime">@eat0xy</p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight />
            </span>
          </div>
        </a>
      </section>
    </>
  );
}
