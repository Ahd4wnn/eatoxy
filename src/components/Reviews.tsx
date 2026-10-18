import clsx from "clsx";
import { reviews, sampleReviews } from "../data/reviews";
import { chatUrl } from "../lib/whatsapp";

// Busy Bee Honey pattern: solid colour cards, quote set in the display face.
const tones = ["bg-forest text-paper", "bg-lime text-ink", "bg-kraft text-ink", "bg-paper-2 text-ink"];

export function Reviews() {
  const list = reviews.length ? reviews : sampleReviews;

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
          <ul className="-mx-5 mt-14 flex snap-x gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {list.map((r, i) => (
              <li key={i} className={clsx("flex min-h-80 w-[78vw] shrink-0 snap-start flex-col justify-between rounded-[28px] p-7 md:w-auto", tones[i % tones.length])}>
                <span aria-label="5 stars" className="tracking-[0.3em]">★★★★★</span>
                <blockquote className="display text-[2rem]">{r.quote}</blockquote>
                <p className="eyebrow opacity-70">{r.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
