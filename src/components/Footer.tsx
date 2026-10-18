import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, Location01Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { BACKUP, INSTAGRAM, PRIMARY, chatUrl } from "../lib/whatsapp";
import { reducedMotion } from "../lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const link = "flex items-center gap-2 transition-colors hover:text-forest/60";

// Claims are only what f13s.com itself says.
const f13s = [
  ["Media", "Campaigns, video and AI video"],
  ["AI agents", "Customer care and workflow automation"],
  ["Software", "Apps, websites and web apps"],
];

/** Studio credit. Hover/focus shows a card on pointer devices; touch gets a one-line subtitle instead. */
function MadeBy() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <AnimatePresence>
        {open && (
          <motion.div
            id="f13s-card"
            role="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 z-20 mb-3 hidden w-80 origin-bottom-right rounded-[24px] bg-forest p-6 text-paper shadow-[0_24px_60px_-20px_rgba(22,38,15,0.55)] [@media(hover:hover)]:block"
          >
            <p className="display text-4xl normal-case text-lime">f13s</p>
            <p className="mt-1 text-sm text-paper/70">Independent minds. Shared ambition.</p>
            <ul className="mt-5 space-y-3 border-t border-paper/15 pt-4">
              {f13s.map(([title, body]) => (
                <li key={title} className="text-sm">
                  <span className="font-bold text-paper">{title}</span>
                  <span className="block text-paper/65">{body}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-bold text-ink">
              Start a project <ArrowUpRight size={16} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://f13s.com"
        target="_blank"
        rel="noopener"
        aria-describedby="f13s-card"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="group inline-flex min-h-11 items-center gap-1.5 text-forest/70 transition-colors hover:text-forest"
      >
        Website made by <span className="font-bold text-forest underline decoration-lime decoration-2 underline-offset-4">f13s</span>
        <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
      <p className="text-forest/50 [@media(hover:hover)]:hidden">Media, AI agents & software studio</p>
    </div>
  );
}

// BAGGU pattern: link rows on top, the real logo wordmark edge to edge below.
export function Footer() {
  const mark = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!mark.current || reducedMotion()) return;
    const tween = gsap.fromTo(
      mark.current,
      { yPercent: 18 },
      { yPercent: 0, ease: "none", scrollTrigger: { trigger: mark.current, start: "top bottom", end: "bottom bottom", scrub: true } },
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <footer className="overflow-hidden border-t border-forest/15 px-5 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 text-sm text-forest sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="display text-4xl md:text-5xl">Healthy bowls,<br />better you.</p>
            <a href={chatUrl()} className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-bold text-ink transition-transform hover:scale-[1.03]">
              <HugeiconsIcon icon={WhatsappIcon} size={18} strokeWidth={1.75} /> Order on WhatsApp
            </a>
          </div>
          <div className="space-y-3">
            <p className="eyebrow mb-4 text-forest/50">Order</p>
            <a className={link} href={`https://wa.me/${PRIMARY.digits}`}>{PRIMARY.label}</a>
            <a className={link} href={`https://wa.me/${BACKUP.digits}`}>{BACKUP.label}</a>
          </div>
          <nav aria-label="Footer" className="space-y-3">
            <p className="eyebrow mb-4 text-forest/50">Explore</p>
            <Link className={link} to="/">Home</Link>
            <Link className={link} to="/shop">Shop</Link>
            <Link className={link} to="/about">About</Link>
          </nav>
          <div className="space-y-3">
            <p className="eyebrow mb-4 text-forest/50">Find us</p>
            <a className={link} href={INSTAGRAM} target="_blank" rel="noreferrer"><HugeiconsIcon icon={InstagramIcon} size={18} strokeWidth={1.5} />@eat0xy</a>
            <p className="flex items-center gap-2"><HugeiconsIcon icon={Location01Icon} size={18} strokeWidth={1.5} />Mannarkkad, Kerala</p>
          </div>
        </div>

        <img ref={mark} src="/brand/wordmark.svg" alt="" aria-hidden width={2145} height={733} loading="lazy" className="mt-16 w-full select-none md:mt-24" />

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-forest/15 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-xs text-forest/60 md:flex-row md:items-center">
          <span>eatoxy.shop · © {new Date().getFullYear()} Eatoxy · Fresh, natural, good for you</span>
          <MadeBy />
        </div>
      </div>
    </footer>
  );
}
