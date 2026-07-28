import type { Product, ProductDetails, ProductTone } from "../types/product.types";

const galleryTones: ProductTone[] = ["mint", "sky", "peach", "violet", "sand"];

const auraReviews: ProductDetails["reviews"] = [
  {
    id: 1,
    author: "Mina R.",
    initials: "MR",
    rating: 5,
    title: "Quiet without feeling closed in",
    comment:
      "The noise control is gentle but effective, and the ear cushions stayed comfortable through a full workday. Switching between my laptop and phone is genuinely seamless.",
    date: "July 18, 2026",
    verified: true,
  },
  {
    id: 2,
    author: "Tariq A.",
    initials: "TA",
    rating: 5,
    title: "The details feel considered",
    comment:
      "Controls are easy to find by touch and the case is slimmer than I expected. Calls sound clear, even from a busy room.",
    date: "July 11, 2026",
    verified: true,
  },
  {
    id: 3,
    author: "Nora S.",
    initials: "NS",
    rating: 4,
    title: "Excellent everyday headphones",
    comment:
      "Warm, balanced sound and very good battery life. I would love one more step between transparency levels, but everything else has been excellent.",
    date: "June 29, 2026",
    verified: true,
  },
];

export function createProductDetails(product: Product): ProductDetails {
  const isAura = product.slug === "aura-headphones";

  return {
    product,
    gallery: [
      "Front view",
      "Soft-touch ear cushions",
      "Folded travel view",
      "Side controls",
      "Protective case",
    ].map((label, index) => ({
      id: `${product.slug}-${index + 1}`,
      label,
      tone: galleryTones[index],
    })),
    colors: [
      { name: "Midnight", value: "#111827" },
      { name: "Cloud", value: "#e5e7eb" },
      { name: "Sage", value: "#86a789" },
    ],
    highlights: isAura
      ? [
          "Adaptive noise control",
          "Up to 38 hours of listening",
          "Memory-foam comfort",
          "Two-device connection",
        ]
      : [
          "Designed for everyday use",
          "Reliable all-day performance",
          "Simple, intuitive controls",
          "Two-year Orbital warranty",
        ],
    story: {
      eyebrow: isAura ? "Made for your quieter hours" : "Thoughtfully made",
      title: isAura ? "Focus sounds better when comfort comes first." : product.name,
      description: isAura
        ? "Aura balances full, detailed sound with a lighter fit. Its adaptive microphones soften background noise without creating that boxed-in feeling, while breathable memory foam keeps long listening sessions easy."
        : `${product.description} Every detail is selected to make setup simple, use intuitive, and ownership pleasantly uneventful.`,
    },
    specifications: isAura
      ? [
          { label: "Battery", value: "38 hours (ANC on)" },
          { label: "Charging", value: "USB-C, 10 min for 5 hours" },
          { label: "Connectivity", value: "Bluetooth 5.4, two devices" },
          { label: "Weight", value: "254 g" },
          { label: "Microphones", value: "6 beamforming microphones" },
          { label: "Warranty", value: "2 years" },
        ]
      : [
          { label: "Connectivity", value: "Bluetooth 5.4" },
          { label: "Charging", value: "USB-C" },
          { label: "Warranty", value: "2 years" },
          { label: "Support", value: "Lifetime setup help" },
        ],
    boxContents: isAura
      ? ["Aura headphones", "Slim travel case", "USB-C charging cable", "Quick-start guide"]
      : [product.name, "USB-C charging cable", "Quick-start guide"],
    reviews: isAura ? auraReviews : auraReviews.slice(0, 2),
  };
}
