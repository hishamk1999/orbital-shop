import type { CareerRole } from "../types/career.types";

export const careerRoles: CareerRole[] = [
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    department: "Product & Design",
    location: "London, UK",
    workplace: "Hybrid",
    employmentType: "Full-time",
    summary:
      "Shape clear, useful shopping journeys from first browse through post-purchase support.",
    responsibilities: [
      "Own end-to-end design for high-impact customer journeys across web and mobile.",
      "Turn customer insight and commercial goals into thoughtful product direction.",
      "Partner closely with product, engineering, research, and brand.",
      "Raise the quality bar through critique, prototyping, and design-system contributions.",
    ],
    qualifications: [
      "5+ years designing polished consumer digital products.",
      "A portfolio that shows strong interaction, visual, and systems thinking.",
      "Confidence working from ambiguous problems through shipped outcomes.",
      "Clear communication and a generous approach to feedback.",
    ],
  },
  {
    id: "frontend-engineer-commerce",
    title: "Frontend Engineer, Commerce",
    department: "Engineering",
    location: "London, UK",
    workplace: "Hybrid",
    employmentType: "Full-time",
    summary:
      "Build fast, accessible storefront experiences that make choosing technology feel simple.",
    responsibilities: [
      "Develop and maintain customer-facing experiences with React, Next.js, and TypeScript.",
      "Collaborate with design on accessible, responsive interaction patterns.",
      "Improve performance, observability, testing, and frontend architecture.",
      "Help the team turn experiments into reliable production features.",
    ],
    qualifications: [
      "4+ years building production web applications.",
      "Strong TypeScript, React, semantic HTML, and modern CSS skills.",
      "A practical understanding of performance and accessibility.",
      "Experience with commerce platforms or design systems is helpful, not required.",
    ],
  },
  {
    id: "category-buyer-smart-home",
    title: "Category Buyer, Smart Home",
    department: "Merchandising",
    location: "Manchester, UK",
    workplace: "Hybrid",
    employmentType: "Full-time",
    summary:
      "Find genuinely useful smart-home products and build a category customers can trust.",
    responsibilities: [
      "Own assortment strategy, pricing, margin, and trading for smart-home products.",
      "Build durable supplier relationships and negotiate commercial terms.",
      "Use customer, market, and sales insight to guide range decisions.",
      "Work with content and product teams to explain each item clearly.",
    ],
    qualifications: [
      "3+ years in buying, merchandising, or category management.",
      "Strong commercial judgement and confidence working with data.",
      "Curiosity about connected-home technology and everyday customer needs.",
      "Excellent supplier management and negotiation skills.",
    ],
  },
  {
    id: "customer-care-specialist",
    title: "Customer Care Specialist",
    department: "Customer Experience",
    location: "Remote, UK",
    workplace: "Remote",
    employmentType: "Full-time",
    summary:
      "Give customers calm, practical help across orders, products, returns, and everything between.",
    responsibilities: [
      "Support customers by email and live chat with warmth and accuracy.",
      "Resolve order, delivery, return, and product questions end to end.",
      "Spot recurring friction and share useful patterns with the wider team.",
      "Keep internal guidance clear, current, and easy for teammates to use.",
    ],
    qualifications: [
      "2+ years in customer support, retail, or hospitality.",
      "Excellent written communication and careful attention to detail.",
      "Comfort learning new products and explaining them simply.",
      "A steady, ownership-minded approach to solving problems.",
    ],
  },
  {
    id: "content-producer",
    title: "Content Producer",
    department: "Brand & Creative",
    location: "London, UK",
    workplace: "Hybrid",
    employmentType: "Contract",
    summary:
      "Create product stories, guides, and campaigns that make technical details feel human.",
    responsibilities: [
      "Produce product, editorial, email, and social content from brief to delivery.",
      "Translate technical features into plain, useful customer language.",
      "Coordinate freelance specialists and lightweight studio production.",
      "Maintain a consistent voice across fast-moving commercial moments.",
    ],
    qualifications: [
      "A strong portfolio of commerce, technology, or editorial work.",
      "Excellent writing, editing, and content-production skills.",
      "Confidence managing several deadlines without losing the details.",
      "Experience with basic art direction or motion is a welcome bonus.",
    ],
  },
];

export const careerDepartments = [
  "All teams",
  ...Array.from(new Set(careerRoles.map((role) => role.department))),
];

export const careerLocations = [
  "All locations",
  ...Array.from(new Set(careerRoles.map((role) => role.location))),
];
