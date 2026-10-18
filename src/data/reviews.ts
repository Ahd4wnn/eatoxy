export interface Review { quote: string; name: string; role?: string; rating: string }

// Real customer reviews, as sent by Eatoxy.
export const reviews: Review[] = [
  {
    quote: "Tried Eatoxy's fruits, and they were so fresh and refreshing. Loved their quality and taste. Definitely a 10/10 experience, and it would be recommended to give them a try.",
    name: "M. Fayiz",
    role: "Founder, f13s",
    rating: "10/10",
  },
  { quote: "Super healthy and tastes amazing!", name: "Faizal", rating: "5/5" },
  { quote: "Super and really good!", name: "Nihala", rating: "5/5" },
  { quote: "Good product. Keep moving forward with confidence.", name: "Customer", rating: "5/5" },
];
