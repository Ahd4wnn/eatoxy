import { useEffect } from "react";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { BACKUP, INSTAGRAM, PRIMARY } from "../lib/whatsapp";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          aria-label="Main"
          initial={{ clipPath: "inset(0 0 100% 0 round 2rem)" }}
          animate={{ clipPath: "inset(0 0 0% 0 round 2rem)" }}
          exit={{ clipPath: "inset(0 0 100% 0 round 2rem)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-3 z-40 flex flex-col justify-between rounded-[2rem] bg-forest px-6 pb-8 pt-28 text-paper md:px-12"
        >
          <ul>
            {links.map((l, i) => (
              <li key={l.to} className="overflow-hidden border-b border-paper/15">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `display flex items-baseline gap-4 py-3 text-[clamp(3.5rem,14vw,9rem)] transition-colors hover:text-lime ${isActive ? "text-lime" : ""}`
                    }
                  >
                    <span className="font-sans text-sm font-medium tracking-widest text-paper/50">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 text-sm md:flex-row md:items-end md:justify-between">
            <p className="max-w-xs text-paper/70">
              Fresh, made to order in Mannarkkad. Order, ask or preorder on WhatsApp.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-paper">
              <a className="flex items-center gap-2 hover:text-lime" href={`https://wa.me/${PRIMARY.digits}`}>
                <HugeiconsIcon icon={WhatsappIcon} size={18} strokeWidth={1.5} /> {PRIMARY.label}
              </a>
              <a className="flex items-center gap-2 hover:text-lime" href={`https://wa.me/${BACKUP.digits}`}>
                <HugeiconsIcon icon={WhatsappIcon} size={18} strokeWidth={1.5} /> {BACKUP.label}
              </a>
              <a className="flex items-center gap-2 hover:text-lime" href={INSTAGRAM} target="_blank" rel="noreferrer">
                <HugeiconsIcon icon={InstagramIcon} size={18} strokeWidth={1.5} /> @eat0xy
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
