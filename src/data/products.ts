export type Category = "Salads" | "Chaat & Fruit" | "Breakfast" | "Pasta";

export interface Product {
  id: string;
  /** Poster spelling (media/ai). */
  name: string;
  category: Category;
  /** Rupees, from the posters. */
  price: number;
  /** From the handwritten notebook (media/products). Empty = not shown. */
  ingredients: string[];
  /** Offer the dressing picker (savoury salads only). */
  dressing: boolean;
  /** 1:1 photo path under /public. Unset = placeholder tile. */
  image?: string;
}

export const categories: Category[] = ["Salads", "Chaat & Fruit", "Breakfast", "Pasta"];

export const products: Product[] = [
  { id: "protein-crave", name: "Protein Crave", category: "Salads", price: 149, dressing: true,
    ingredients: ["chicken", "egg", "soya", "sweet corn", "groundnut", "white chenna", "black chenna", "cucumber", "carrot", "cabbage", "sprouted green gram"] },
  { id: "crazy-mix", name: "Crazy Mix", category: "Salads", price: 149, dressing: true, image: "/products/crazy-mix.jpg",
    ingredients: ["chicken", "egg", "lettuce", "soya", "carrot", "cucumber", "chenna", "sweet corn", "capsicum", "cabbage"] },
  { id: "bombered-chicken-coast", name: "Bombered Chicken Coast", category: "Salads", price: 139, dressing: true,
    ingredients: ["chicken breast", "chenna", "sweet corn", "carrot", "red & green cabbage", "beetroot", "tomato", "cucumber"] },
  { id: "chenna-bowl", name: "Chenna Bowl", category: "Salads", price: 129, dressing: true,
    ingredients: ["black chenna", "white chenna", "groundnut", "onion", "tomato", "cabbage", "cucumber", "sweet corn"] },
  { id: "fyto-egg-salad", name: "Fyto Egg Salad", category: "Salads", price: 119, dressing: true,
    ingredients: ["egg", "green peas", "carrot", "cucumber", "lettuce", "groundnut", "coriander", "capsicum", "chinese cabbage"] },
  { id: "classic-veg-salad", name: "Classic Veg Salad", category: "Salads", price: 99, dressing: true,
    ingredients: ["soya beans", "lettuce", "sweet corn", "green peas", "cucumber", "carrot", "cabbage", "onion", "tomato", "groundnut"] },
  { id: "pineapple-chaat", name: "Pineapple Chaat", category: "Chaat & Fruit", price: 99, dressing: false, image: "/products/pineapple-chaat.jpg",
    ingredients: ["pineapple", "pomegranate", "coriander", "chilli", "onion", "tomato", "white chenna"] },
  { id: "musi-fruit-coast", name: "Musi Fruit Coast", category: "Chaat & Fruit", price: 119, dressing: false,
    ingredients: ["apple", "pineapple", "grape", "guava", "anar", "banana", "dates", "honey"] },
  { id: "classic-oats", name: "Classic Oats", category: "Breakfast", price: 59, dressing: false,
    ingredients: ["creamy oats", "apple", "banana", "cashew", "pumpkin seed", "sunflower seed", "dried grape", "raisins", "honey"] },
  { id: "chocolate-oats", name: "Chocolate Oats", category: "Breakfast", price: 79, dressing: false,
    ingredients: ["rich chocolate oats", "apple", "banana", "seasonal fruits", "nuts", "seeds", "honey"] },
  { id: "chia-bowl", name: "Chia Bowl", category: "Breakfast", price: 59, dressing: false,
    ingredients: ["chia seed", "milk", "banana", "pumpkin seed", "sunflower seed", "dates", "seasonal fruits", "dried grape", "honey", "cashew"] },
  { id: "french-toast", name: "French Toast", category: "Breakfast", price: 59, dressing: false, ingredients: [] },
  { id: "peanut-butter-sandwich", name: "Peanut Butter Sandwich", category: "Breakfast", price: 49, dressing: false,
    ingredients: ["whole wheat bread", "creamy peanut butter", "honey", "banana", "apple", "cashew"] },
  { id: "classy-pasta", name: "Classy Pasta", category: "Pasta", price: 169, dressing: false, ingredients: [] },
  { id: "chicken-pasta", name: "Chicken Pasta", category: "Pasta", price: 199, dressing: false, ingredients: [] },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export const rupees = (n: number) => `₹${n}`;
