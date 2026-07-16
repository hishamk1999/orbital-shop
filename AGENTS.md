# Project Guidelines

## Project Overview

This project is a modern, premium eCommerce website for electronics, gadgets, and smart-home products.

The homepage is already implemented and defines the visual language for the rest of the application. All new pages and features must feel like part of the same product.

Before implementing a page or feature:

1. Inspect the existing homepage and shared components.
2. Reuse the current design tokens and UI patterns.
3. Preserve the existing architecture and conventions.
4. Do not rewrite working components unless necessary.
5. Keep all pages responsive, accessible, and production-ready.
6. Avoid unrelated refactoring.

---

## Design Direction

The interface should feel:

- Modern
- Minimal
- Premium
- Clean
- Friendly
- Spacious
- Consistent
- Easy to scan

Use the existing homepage as the main visual reference.

The design may take inspiration from Apple Store, Stripe, Linear, Vercel, and Framer, but it must maintain its own identity.

Do not copy external websites directly.

---

## Visual Rules

### Layout

- Use the same centered container and maximum width as the homepage.
- Follow the existing spacing system.
- Prefer generous whitespace between sections.
- Keep content aligned to a consistent grid.
- Maintain a clear visual hierarchy.
- Avoid dense or cluttered layouts.
- Support desktop, tablet, and mobile layouts.

### Cards

- Use rounded cards consistent with the homepage.
- Prefer border radii between `16px` and `24px`.
- Use subtle borders and soft shadows.
- Avoid dark or heavy shadows.
- Include clear hover, focus, active, and selected states.

### Typography

- Reuse the existing font family and typography scale.
- Use semantic heading levels.
- Keep body text concise and readable.
- Avoid unnecessary uppercase text.
- Maintain accessible color contrast.

### Colors

Always reuse existing design tokens before introducing new colors.

General palette direction:

- Green for primary actions and commerce
- Purple for promotional accents
- Soft blue for informational sections
- Warm peach for promotional cards
- Light mint for positive and delivery-related states
- White and off-white backgrounds
- Dark navy or charcoal text
- Muted gray secondary text

Suggested fallback values:

```css
--color-primary: #22c55e;
--color-primary-dark: #16a34a;

--color-secondary: #7c3aed;
--color-secondary-light: #a855f7;

--color-sky-soft: #bfdbfe;
--color-peach-soft: #fed7aa;
--color-mint-soft: #d1fae5;

--color-background: #fafafa;
--color-surface: #ffffff;

--color-text: #111827;
--color-text-muted: #6b7280;
```

Do not hardcode repeated color values inside components. Use centralized tokens.

---

## Media Rules

Do not use images containing:

- Men
- Women
- Boys
- Girls
- Human models
- Lifestyle photography with people

Allowed media:

- Product photography without people
- Product renders
- 3D illustrations
- Device mockups
- Abstract shapes
- Icons
- Decorative gradients
- Packaging
- Category illustrations

All meaningful images must include descriptive alternative text.

Decorative images should use empty alternative text.

---

# Architecture

This project uses a feature-based frontend architecture.

The goal is to keep each domain self-contained while maintaining a small and understandable folder structure.

```text
src/
├── app/
├── features/
├── shared/
└── assets/
```

---

## Root Structure

```text
src/
├── app/                         # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── ...
│
├── features/                    # Business domains
│   ├── products/
│   ├── categories/
│   ├── cart/
│   ├── checkout/
│   ├── auth/
│   ├── wishlist/
│   └── account/
│
├── shared/                      # Reusable application-wide code
│   ├── components/
│   ├── layouts/
│   ├── hooks/
│   ├── api/
│   ├── lib/
│   ├── types/
│   ├── constants/
│   ├── config/
│   └── styles/
│
└── assets/                      # Static assets imported by code
```

Do not create empty folders preemptively.

Add a folder only when the feature actually requires it.

---

# Feature Structure

Each feature should own its UI, data access, types, validation, and domain-specific logic.

Recommended structure:

```text
features/
└── products/
    ├── api/
    ├── components/
    ├── hooks/
    ├── schemas/
    ├── types/
    ├── utils/
    ├── constants/
    ├── pages/
    ├── __tests__/
    └── index.ts
```

Not every feature must contain every folder.

For a small feature, this is enough:

```text
features/
└── wishlist/
    ├── components/
    ├── hooks/
    ├── types.ts
    └── index.ts
```

Avoid creating folders such as `services`, `adapters`, `mappers`, `store`, or `actions` unless the feature genuinely needs them.

---

## Feature Ownership

A feature should own everything specific to its domain.

Examples:

```text
features/products/
├── api/get-products.ts
├── api/get-product.ts
├── components/ProductCard.tsx
├── components/ProductFilters.tsx
├── hooks/useProducts.ts
├── schemas/product.schema.ts
├── types/product.types.ts
└── pages/ProductsPage.tsx
```

Do not place product-specific code inside `shared`.

A feature should be removable with minimal impact on unrelated parts of the application.

---

# App Router Rules

The `app/` directory is responsible for routing and Next.js-specific files.

It may contain:

- `page.tsx`
- `layout.tsx`
- `template.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- route handlers
- metadata
- route groups
- server component composition

Keep route files thin.

Route files should mainly import and render feature-level pages.

Example:

```tsx
import { ProductsPage } from "@/features/products";

export default function Page() {
  return <ProductsPage />;
}
```

Do not place complex business logic directly inside `app/page.tsx`.

Do not move all server logic out of `app` blindly. Next.js-specific server concerns may remain in route files when appropriate, but reusable domain logic should live inside the related feature.

---

# Shared Folder Rules

Use `shared/` only for code reused across multiple features.

Examples:

```text
shared/
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Pagination.tsx
│   └── EmptyState.tsx
│
├── layouts/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Container.tsx
│
├── hooks/
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
│
├── api/
│   ├── api-client.ts
│   └── api-error.ts
│
├── lib/
│   ├── cn.ts
│   └── format-price.ts
│
├── types/
├── constants/
├── config/
└── styles/
```

Do not move a component into `shared` just because it might be reusable one day.

Only promote code to `shared` after it is reused or clearly application-wide.

---

# Component Rules

Keep components focused and reasonably small.

Prefer composition:

```text
ProductCard
├── ProductImage
├── ProductBadge
├── ProductPrice
├── ProductRating
└── ProductActions
```

Avoid large page components that contain all rendering, state, data fetching, and validation in one file.

Extract logic when it improves readability or reuse.

Do not split simple components into unnecessary files.

---

# Data Layer

Each feature owns its domain-specific API functions.

Example:

```text
features/products/api/
├── get-products.ts
├── get-product.ts
└── search-products.ts
```

Shared API infrastructure belongs in:

```text
shared/api/
├── api-client.ts
├── api-error.ts
└── request.ts
```

Feature API functions may use the shared API client.

Do not create one large application-wide file containing all endpoints.

---

# State Management

Prefer the smallest suitable state scope.

Use:

- Local component state for temporary UI state
- URL search parameters for filters, sorting, search, and pagination
- Server state tooling for fetched data
- Global state only for genuinely application-wide client state

Possible global state:

- Cart
- Wishlist
- Authentication client state
- Theme
- Locale

Do not put all feature state into a global store.

Do not duplicate server data in global client state without a clear reason.

---

# Dependency Rules

Allowed dependency direction:

```text
app
↓
features
↓
shared
```

Allowed:

```tsx
import { ProductsPage } from "@/features/products";
import { Button } from "@/shared/components";
```

Avoid importing internal files from another feature.

Bad:

```tsx
import { ProductCard } from "@/features/products/components/ProductCard";
```

Preferred:

```tsx
import { ProductCard } from "@/features/products";
```

Cross-feature imports should use the target feature's public API.

Avoid circular dependencies between features.

---

# Public Feature API

Each feature should export only what other parts of the application need through `index.ts`.

Example:

```ts
export { ProductsPage } from "./pages/ProductsPage";
export { ProductCard } from "./components/ProductCard";
export type { Product } from "./types/product.types";
```

Do not export every internal hook, utility, schema, or implementation detail automatically.

Keep private feature files private.

---

# Imports

Use configured path aliases.

Preferred:

```tsx
import { ProductCard } from "@/features/products";
import { Button } from "@/shared/components";
import { formatPrice } from "@/shared/lib/format-price";
```

Avoid:

```tsx
import { ProductCard } from "../../../../features/products";
```

Follow the project's existing alias configuration.

---

# Naming Conventions

Use descriptive names.

Examples:

```text
ProductCard.tsx
ProductFilters.tsx
ProductsPage.tsx
useProducts.ts
useCart.ts
getProducts.ts
createOrder.ts
product.schema.ts
product.types.ts
formatPrice.ts
```

Avoid vague names:

```text
helper.ts
common.ts
service.ts
data.ts
component.tsx
utils.ts
```

A focused utility file such as `format-price.ts` is better than one large generic `utils.ts`.

---

# Responsive Design

Test layouts at approximately:

- `1440px`
- `1024px`
- `768px`
- `390px`
- `320px`

Requirements:

- Product grids should reduce columns naturally.
- Navigation should collapse when needed.
- Category rows may become horizontally scrollable.
- Filters should use a mobile drawer when appropriate.
- Buttons and inputs should remain touch-friendly.
- Avoid horizontal page overflow.
- Modals and drawers must fit small screens.
- Tables should scroll or transform safely on mobile.

---

# Accessibility

- Use semantic HTML.
- Use buttons for actions and links for navigation.
- Associate labels with form fields.
- Keep keyboard focus visible.
- Ensure controls are keyboard-accessible.
- Maintain sufficient color contrast.
- Do not use color as the only state indicator.
- Use `aria-label` only when visible text is unavailable.
- Respect reduced-motion preferences.
- Provide useful image alternative text.

---

# Forms

Forms must include:

- Visible labels
- Clear validation messages
- Correct input types
- Loading submission states
- Disabled submission states
- Success and error feedback
- Keyboard accessibility
- Preserved input after recoverable failures

Do not use placeholders as the only labels.

Keep feature-specific schemas inside the related feature.

---

# Performance

- Prefer server components unless client interactivity is required.
- Add `"use client"` only where necessary.
- Lazy-load heavy client-only components when appropriate.
- Optimize images using the project's existing image strategy.
- Provide explicit image dimensions.
- Avoid unnecessary re-renders.
- Avoid unnecessarily large client bundles.
- Do not preload every product image.
- Prevent layout shifts.
- Use loading skeletons that resemble the final layout.

---

# SEO

For public pages:

- Use a unique title and meta description.
- Use one clear `h1`.
- Preserve logical heading hierarchy.
- Use meaningful internal links.
- Add canonical metadata where appropriate.
- Add product structured data where appropriate.
- Keep important content available as text.
- Use descriptive product image alternative text.

---

# Testing

Keep tests close to the feature they verify.

Example:

```text
features/products/
├── components/
├── hooks/
├── __tests__/
└── index.ts
```

When implementing an important page or feature:

- Test the main user flow.
- Test loading states.
- Test empty states.
- Test API errors.
- Test important validation.
- Test interactive controls.
- Avoid tests based only on CSS class names.

Use the existing testing setup. Do not introduce a new testing framework without a clear reason.

---

# Code Quality

- Follow the existing project conventions.
- Use TypeScript.
- Avoid `any`.
- Reuse existing types where appropriate.
- Keep functions focused.
- Remove unused imports and dead code.
- Do not suppress lint or TypeScript errors without justification.
- Do not add dependencies when existing tools can solve the problem.
- Do not change unrelated files.
- Avoid broad refactors during focused tasks.
- Keep client and server boundaries clear.

---

# Completion Checklist

Before marking work complete:

- [ ] The result matches the homepage visual language.
- [ ] Existing components were reused where appropriate.
- [ ] Feature-specific code lives inside its feature.
- [ ] Shared code is genuinely reusable.
- [ ] Route files remain thin.
- [ ] Desktop, tablet, and mobile layouts work.
- [ ] There is no horizontal overflow.
- [ ] Loading, empty, error, and success states are handled.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Images have correct alternative text.
- [ ] No media containing people was added.
- [ ] TypeScript passes.
- [ ] Linting passes.
- [ ] Tests pass.
- [ ] No duplicate components were introduced.
- [ ] No unrelated files were changed.

---

# Instructions for Codex

For every task:

1. Read this file before making changes.
2. Inspect the existing project structure and related files.
3. Identify existing components and patterns that can be reused.
4. Briefly define the implementation plan.
5. Implement the smallest maintainable solution.
6. Preserve the homepage design language.
7. Keep route files thin and feature code self-contained.
8. Do not create unnecessary abstraction layers or empty folders.
9. Run the available lint, type-check, build, and test commands.
10. Report:
    - Files created
    - Files changed
    - Components reused
    - Validation commands run
    - Remaining limitations

Do not rewrite the project architecture unless explicitly requested.
