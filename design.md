# Eatoxy: design spec (v2)

Status: **approved decisions (2026-10-18).** These override anything below that contradicts them.
- Font **A: Tanker + Supreme.**
- **No cut-outs and no photos for now.** Every product image is a **1:1 placeholder** tile. Photos come later through `image` in `src/data/products.ts`.
- **No ingredient line** for French Toast, Classy Pasta or Chicken Pasta.
- **Prices and names from the posters.**
- No poster strip on About, since images come later.

Refinements from a second Mobbin pass:
- **Hero = Hungry Tiger "WE BOTTLE BOLD" layout** ([ref](https://mobbin.com/sites/sections/0a65ae4c-404c-4d2d-bc70-bef248345510)):
  - Centred eyebrow, then dotted rule, then the full-width Tanker line **HEALTHY BOWLS, BETTER YOU.** (the posters' own tagline), then dotted rule.
  - Below that, a 1:1 bowl placeholder with a lime price sticker.
  - Small copy and the lime CTA sit bottom-left; "See the menu ↓" sits bottom-right. Static.
- **Product sheet = DoorDash / sweetgreen item modal** ([DoorDash](https://mobbin.com/screens/2a7d1e36-9235-47bd-9ada-8ede3bd38f40), [sweetgreen](https://mobbin.com/screens/416da98d-2390-46bf-85aa-27cc9bb9013a)):
  - Square image on the left, with name, price and ingredients on the right.
  - Dressing chips, a quantity stepper, and a sticky "Add to order · ₹total".
  - It becomes a bottom sheet on mobile.
- **About "How it works" = Craft Agency numbered rows** ([ref](https://mobbin.com/sites/sections/698886b8-377c-40e9-97e1-767a59eb9f28)): the number, a Tanker title, and the body text on the right, divided by hairlines.

## 1. Why v1 failed
- **No Mobbin.** I skipped the reference research you asked for. v2 below is built from Mobbin references.
- **The wrong font.** Boska is a thin, high-contrast literary serif. It reads like a book jacket, not a salad brand.
- **Effects instead of food.** v1 led with the animated aura and the gooey text reveal, which were decoration. Both are **removed**.
- **No food on screen.** Now that the AI bowl images exist, the food is the hero.

## 2. What we're designing from
| Source | What it gives us |
|---|---|
| `media/brand/logo.jpg` | Wordmark with the bowl-"O", cream paper, forest green, a touch of tomato |
| `media/ai/*.jpeg` (17 posters, 13 unique; 14-17 repeat 3-6) | Bowl photography, **prices**, final product names, the brand's energy (bold, green, lime, kraft bowls) |
| `media/products/*.jpeg` | Ingredient lists and dressings |
| Instagram @eat0xy | Mannarkkad, made fresh, preorder and delivery, high protein |

### Mobbin references, and what we take from each
- **sweetgreen**, [menu](https://mobbin.com/sites/sections/ef00c77c-841c-4e12-b207-df44ce97a57a) and [hero](https://mobbin.com/sites/sections/a7dbacd8-c85d-459f-b06f-635450c43365):
  - Cream page, deep green type, one **lime pill** CTA.
  - Big category tabs (Salads / Warm Bowls / Sides).
  - Product cards: photo, name, ingredient line, "Order now".
  - This is the backbone of our menu.
- **Eat Hungry Tiger**, [hero](https://mobbin.com/sites/sections/f6d74eb3-c4bb-4302-bff9-41aa18c34f68): one confident, oversized condensed headline with the product dead centre, and pill-shaped nav buttons. This sets the hero's attitude.
- **re_**, [product grid](https://mobbin.com/sites/sections/73d10ac2-8d3b-4bac-a470-913e42e4d6f3): the product sits on a quiet tile and the type is allowed to be big. This is our shop rhythm.
- **Busy Bee Honey**, [reviews](https://mobbin.com/sites/sections/f76e6f05-6d56-49f6-98ee-a6dafdf1a703): reviews as solid-colour rounded cards with the quote set large in the display face. This is our reviews section.
- **BAGGU** and **Structured**, [BAGGU footer](https://mobbin.com/sites/sections/ddfad441-10db-4949-9baa-299e7e0edeee) and [Structured footer](https://mobbin.com/sites/sections/cf954a98-4f2e-41d3-b2a1-168e4ba0108d): link rows on top, then the brand wordmark run edge-to-edge. Our footer uses **the real Eatoxy logo wordmark** this way.

## 3. Direction: "Kraft & Lime"
Cream paper, forest green, a lime-yellow accent, and real bowls in kraft cups. The type is loud and the layout is quiet. The food photos carry the colour; the UI stays flat.

## 4. Tokens

### Colour
Sampled from the logo and the posters.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2ECDC` | Page background. Matches the logo's paper exactly, so the logo sits on it seamlessly. |
| `paper-2` | `#E8E0C9` | Card and tile backgrounds |
| `forest` | `#1F4D1A` | Headlines, text, dark blocks |
| `lime` | `#D4E34A` | Primary CTA, price stickers, active tab (as in the posters) |
| `kraft` | `#C9A27A` | Rare accent, one review card |
| `tomato` | `#C93615` | Tiny accents only (the "O" in the logo). Never a button. |
| `ink` | `#16260F` | Body text |

- No gradients. No glows. No shadows, except a single soft one on the open order sheet.
- One theme. The brand is cream.

### Type (open the specimen: `design/fonts.html`)
- **Recommended: A. Tanker + Supreme.**
  - Tanker (Fontshare) is a condensed, ultra-bold poster face, set in uppercase for headlines and product names. It has the same energy as the posters without copying their brush script.
  - Supreme (Fontshare) is a neutral grotesk for body, UI and ingredients.
- **B. Young Serif + Supreme.** Soft, chunky serif that echoes the logo. Warmer and calmer.
- **C. Cabinet Grotesk 900 + Supreme.** A friendly heavy sans. The safest of the three.

Scale (with A):

| Element | Size and treatment |
|---|---|
| Hero headline | `clamp(4rem, 11vw, 10rem)`, line-height 0.88 |
| Section titles | `clamp(2.5rem, 6vw, 5rem)` |
| Product name | 28-34px, uppercase |
| Body | 17-18px / 1.55 |
| Eyebrow | 12px, letter-spacing .2em, uppercase |

### Shape and spacing
- Cards and tiles: radius 28px. Buttons and chips: fully round pills.
- Hairline rules are `forest/20`.
- Section padding 112-160px desktop, 80px mobile. Side gutter 20px mobile, 40px desktop. Max width 1280px.

### Icons
- Lucide for UI controls: plus, minus, x, arrows.
- Hugeicons stroke-rounded for brand and info icons: WhatsApp, Instagram, location, and the benefit icons on About.
- 1.5 stroke, 18-20px, always `currentColor`.

## 5. Imagery
- **Source:** crop the bowl out of each poster, below the title and price badge and above the green icon strip, at roughly the 47-87% height band. One crop per product, kept at 4:3, exported as WebP.
- **Cut-outs (recommended upgrade):** remove the background so the bowls float on cream, in the Hungry Tiger / re_ style. This needs either:
  - your OK to send the images to a background-removal service, or
  - a local tool, which is a ~170 MB model download.
- **Never** show the posters' baked-in text in product cards.
- **Posters as content:** the full posters appear in one place only, a horizontal "From our feed" strip on About, because they are the brand's own ads.

## 6. Motion rules
Allowed, and subtle:
- Lenis smooth scroll.
- Nav pill hides on scroll down.
- Menu overlay and order sheet slide in (Motion).
- Category tab indicator glides (Motion `layoutId`).
- Cards fade up once when they enter the viewport.
- Hero bowl: one gentle parallax (GSAP, about 40px max).
- Footer wordmark rises in on scroll.

**Banned:**
- The animated shader or aura background.
- Text reveal or gooey or split-text animation, anywhere.
- Cursor effects, marquee tickers, magnetic buttons and auto-playing carousels.

All motion turns off under `prefers-reduced-motion`.

## 7. Layout

### Nav: floating pill (unchanged concept)
- Inset 16px from every edge, cream, hairline border.
- Left: logo wordmark. Right: lime **Order (n)** pill and a forest round **sandwich** button.
- The sandwich opens an inset forest panel with huge Tanker links (Home, Shop, About) and the contact line.

### Home 1: Hero (static)
- Cream, full viewport, no background effect.
- **Left column:**
  - Eyebrow: "Mannarkkad · made fresh to order".
  - Headline: **FRESH BOWLS. REAL PROTEIN.**
  - One line of sub copy.
  - Lime "Order on WhatsApp" pill and an outline "See the menu" pill.
- **Right column:** the Protein Crave bowl, large. It is a rounded tile now, and becomes a floating cut-out if cut-outs are approved.
- A rotated lime sticker on the bowl: "PROTEIN CRAVE ₹149".
- **Bottom row:** "High protein · Made to order · Preorder & delivery", plain text and hairlines, not cards.
- **Mobile:** headline first, then the bowl, then the CTAs.

### Home 2: Main products (sweetgreen pattern)
- Tanker tabs: **Salads · Chaat & Fruit · Breakfast · Pasta**.
- A 3-column grid (1 column mobile, 2 tablet). Each card has:
  - the bowl photo,
  - the NAME,
  - an ingredient line (first 5 items),
  - the price,
  - a round lime **+** button.
- "See the full menu" links to /shop.

### Home 3: Reviews (Busy Bee pattern)
- A row of 3-4 solid cards (forest / lime / kraft / paper-2) with the quote in large Tanker or Supreme and the name small. It scrolls horizontally on mobile.
- **Real reviews only.** Until you send them (the Instagram "reviews" highlight), the section shows a single card: "Tried us? Tell us" with a WhatsApp link.

### Home 4: Footer (BAGGU pattern)
- Cream. The top row has link columns:
  - Order: both WhatsApp numbers.
  - Menu.
  - Instagram @eat0xy.
  - Mannarkkad, Kerala.
- Under that, the **actual logo wordmark** at full width, rising in on scroll.
- Bottom line: eatoxy.shop · © 2026 · Fresh · Natural · Good for you.

### Shop
- A Tanker page title, then sticky tabs (All + 4 categories), then the full grid.
- Clicking a card opens a **product sheet**, a bottom sheet on mobile and a side sheet on desktop. It holds:
  - the big photo,
  - the full ingredient list,
  - the **dressing chips** (savoury salads only, 12 options plus "No dressing"),
  - a quantity stepper,
  - an "Add to order" button.
- The order sheet lists items with qty, dressing and line price, and a **total**. "Send on WhatsApp" opens `wa.me/919895556180`, prefilled with the items, dressings, total, name and note.

### About
1. A static statement in Tanker: "A new kitchen in Mannarkkad making healthy food you actually crave."
2. **How it works:** 3 numbered rows (Pick, Dress, Send on WhatsApp).
3. **Good for:** immunity · digestion · heart health · weight management · energy, with Hugeicons, from the Instagram posters.
4. **From our feed:** a horizontal strip of the posters, ending with a link to @eat0xy.

## 8. Menu (15 items; prices and names from the posters)
| Product | Price | Category | Dressing | Image |
|---|---|---|---|---|
| Protein Crave | ₹149 | Salads | yes | ai/8 |
| Crazy Mix | ₹149 | Salads | yes | ai/2 |
| Bombered Chicken Coast | ₹139 | Salads | yes | ai/6 |
| Chenna Bowl | ₹129 | Salads | yes | ai/9 |
| Fyto Egg Salad | ₹119 | Salads | yes | ai/4 |
| Classic Veg Salad | ₹99 | Salads | yes | ai/7 |
| Pineapple Chaat | ₹99 | Chaat & Fruit | no | ai/1 |
| Musi Fruit Coast | ₹119 | Chaat & Fruit | no | ai/5 |
| Classic Oats | ₹59 | Breakfast | no | ai/3 (row crop) |
| Chocolate Oats | ₹79 | Breakfast | no | ai/3 (row crop) |
| Chia Bowl | ₹59 | Breakfast | no | ai/13 |
| French Toast | ₹59 | Breakfast | no | ai/12 |
| Peanut Butter Sandwich | ₹49 | Breakfast | no | ai/3 (row crop) |
| Classy Pasta | ₹169 | Pasta | no | ai/10 |
| Chicken Pasta | ₹199 | Pasta | no | ai/11 |

Ingredient lists stay as transcribed from the notebook. There are two gaps:
- **French Toast** and **both pastas** have no notebook ingredients.
- For **Chicken Pasta**, the poster says "tender chicken, creamy sauce, fresh veggies".

## 9. Decisions I need from you
1. **Font:** A, B or C (see `design/fonts.html`).
2. **Bowl cut-outs:** may I send the poster images to a background-removal service? If not, the bowls stay as rounded photo tiles.
3. **Names:** use the poster spellings ("Bombered Chicken Coast", "Fyto Egg Salad", "Musi Fruit Coast", "Chenna Bowl")?
4. **Ingredients:** French Toast, Classy Pasta and Chicken Pasta.
5. **Prices:** are the poster prices final?
