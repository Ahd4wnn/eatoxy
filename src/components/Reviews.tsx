import clsx from "clsx";
import { reviews } from "../data/reviews";
import { chatUrl } from "../lib/whatsapp";

// Busy Bee Honey pattern: solid colour cards, quote set in the display face.
const tones = ["bg-forest text-paper", "bg-lime text-ink", "bg-kraft text-ink", "bg-paper-2 text-ink"];

export function Reviews() {
  const list = reviews;

  return (
    <section className="px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow text-center text-forest/60">Reviews</p>
        <h2 className="display mt-4 text-center text-[clamp(3rem,9vw,8rem)] text-forest">
          {list.length ? "Good food, good mood" : "Tried us? Tell us."}
        </h2>

        {list.length === 0 ? (
          <div className="mt-12 flex justify-center">
            <a href={chatUrl("Hi Eatoxy! Here's my review: ")} className="rounded-full bg-lime px-7 py-4 font-bold text-ink transition-transform hover:scale-[1.03]">
              Send a review on WhatsApp
            </a>
          </div>
        ) : (
          <ul className="-mx-5 mt-14 flex snap-x gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-4">
            {list.map((r, i) => (
              <li key={r.name + i} className={clsx("flex min-h-80 w-[80vw] shrink-0 snap-start flex-col gap-6 rounded-[28px] p-7 md:w-auto", tones[i % tones.length])}>
                <p className="flex items-center justify-between text-sm">
                  <span aria-hidden className="tracking-[0.3em]">★★★★★</span>
                  <span className="font-bold">{r.rating}</span>
                </p>
                {/* Long quotes step down a size so every card keeps the same rhythm. */}
                <blockquote className={clsx("display flex-1", r.quote.length > 80 ? "text-[1.45rem] leading-[1.02]" : "text-[2.25rem]")}>
                  “{r.quote}”
                </blockquote>
                <p className="eyebrow">
                  {r.name}
                  {r.role && <span className="mt-1 block normal-case tracking-normal opacity-70">{r.role}</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
