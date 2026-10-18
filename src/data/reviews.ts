export interface Review { quote: string; name: string; }

// Real customer reviews only. Paste them here (source: the "reviews" highlight on @eat0xy).
export const reviews: Review[] = [];

// Dev-only layout samples; never bundled into production output.
export const sampleReviews: Review[] = import.meta.env.DEV
  ? [
      { quote: "SAMPLE: replace with a real review.", name: "Sample customer" },
      { quote: "SAMPLE: a second line to preview the slider.", name: "Sample customer" },
    ]
  : [];
