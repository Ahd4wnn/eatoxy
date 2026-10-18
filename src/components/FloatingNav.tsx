import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingBag01Icon } from "@hugeicons/core-free-icons";
import { useCart } from "../lib/cart";
import { lockScroll } from "../lib/scroll";
import { MenuOverlay } from "./MenuOverlay";

/** Floating pill, inset from every edge. Hides on scroll down, returns on scroll up. */
export function FloatingNav() {
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { count, setOpen } = useCart();
  const { pathname } = useLocation();
  const close = useCallback(() => setMenu(false), []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(close, [pathname, close]);
  useEffect(() => {
    lockScroll(menu);
    return () => lockScroll(false);
  }, [menu]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menu ? -96 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 top-4 z-50 mx-auto flex max-w-3xl items-center justify-between rounded-full border border-forest/10 bg-paper/90 py-2 pl-5 pr-2 backdrop-blur-md"
      >
        <Link to="/" aria-label="Eatoxy home" className="block py-1.5">
          <img src="/brand/wordmark.svg" alt="Eatoxy" width={2145} height={733} className="h-8 w-auto md:h-9" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { close(); setOpen(true); }}
            className="flex h-10 items-center gap-2 rounded-full bg-lime px-4 text-sm font-bold text-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            <HugeiconsIcon icon={ShoppingBag01Icon} size={18} strokeWidth={1.75} />
            Order
            {count > 0 && <span className="grid size-5 place-items-center rounded-full bg-forest text-xs text-paper">{count}</span>}
          </button>

          <button
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
            className="relative size-10 rounded-full bg-forest text-paper"
          >
            <motion.span
              className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -ml-2 bg-current"
              animate={{ y: menu ? 0 : -3.5, rotate: menu ? 45 : 0 }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -ml-2 bg-current"
              animate={{ y: menu ? 0 : 3.5, rotate: menu ? -45 : 0 }}
            />
          </button>
        </div>
      </motion.header>
      <MenuOverlay open={menu} onClose={close} />
    </>
  );
}
