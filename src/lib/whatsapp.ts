export const PRIMARY = { digits: "919895556180", label: "+91 98955 56180" };
export const BACKUP = { digits: "917356380996", label: "+91 73563 80996" };
export const INSTAGRAM = "https://www.instagram.com/eat0xy/";

export interface OrderLine { name: string; qty: number; price: number; dressing?: string }

export const chatUrl = (text = "Hi Eatoxy!") => `https://wa.me/${PRIMARY.digits}?text=${encodeURIComponent(text)}`;

export const orderTotal = (lines: OrderLine[]) => lines.reduce((n, l) => n + l.qty * l.price, 0);

export function buildOrderUrl(lines: OrderLine[], name: string, note: string) {
  const items = lines.map((l) => `${l.qty}× ${l.name}${l.dressing ? ` (${l.dressing})` : ""}  ₹${l.qty * l.price}`);
  const text = [
    "Hi Eatoxy! I'd like to order:",
    "",
    ...items,
    "",
    `Total: ₹${orderTotal(lines)}`,
    ...(name.trim() ? [`Name: ${name.trim()}`] : []),
    ...(note.trim() ? [`Note: ${note.trim()}`] : []),
    "",
    "Sent from eatoxy.shop",
  ].join("\n");
  return chatUrl(text);
}
