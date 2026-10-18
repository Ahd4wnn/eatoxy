import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { productById } from "../data/products";
import { NO_DRESSING } from "../data/dressings";
import { orderTotal, type OrderLine } from "./whatsapp";

interface Line { productId: string; dressing?: string; qty: number }

interface CartValue {
  lines: Line[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (productId: string, qty: number, dressing?: string) => void;
  total: number;
  /** Product whose detail sheet is open. */
  viewing: string | null;
  view: (productId: string | null) => void;
  change: (index: number, delta: number) => void;
  clear: () => void;
  orderLines: OrderLine[];
}

const KEY = "eatoxy-cart";
const Ctx = createContext<CartValue | null>(null);

function load(): Line[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((l) => productById(l?.productId) && l.qty > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(load);
  const [open, setOpen] = useState(false);
  const [viewing, view] = useState<string | null>(null);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* storage blocked: cart lives in memory */ }
  }, [lines]);

  const value = useMemo<CartValue>(() => {
    const orderLines = lines.map((l) => ({
      name: productById(l.productId)?.name ?? l.productId,
      qty: l.qty,
      price: productById(l.productId)?.price ?? 0,
      dressing: l.dressing && l.dressing !== NO_DRESSING ? l.dressing : undefined,
    }));
    return {
      lines,
      open,
      setOpen,
      viewing,
      view,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add: (productId, qty, dressing) => {
        setLines((cur) => {
          const i = cur.findIndex((l) => l.productId === productId && l.dressing === dressing);
          if (i === -1) return [...cur, { productId, dressing, qty }];
          return cur.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
        });
        view(null);
        setOpen(true);
      },
      change: (index, delta) =>
        setLines((cur) => cur.map((l, i) => (i === index ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0)),
      clear: () => setLines([]),
      orderLines,
      total: orderTotal(orderLines),
    };
  }, [lines, open, viewing]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside CartProvider");
  return v;
}
