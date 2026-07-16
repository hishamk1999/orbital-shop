import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { catalog } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";
import { ProductFilters } from "../components/ProductFilters";
import { ShopEmptyState, ShopErrorState, ShopLoading } from "../components/ShopStates";
import type { CategoryCount, ProductQuery } from "../types/product.types";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams("q=audio&sort=rating&page=2"),
}));

const filterQuery: ProductQuery = {
  q: "audio",
  categories: [],
  sort: "rating",
  page: 2,
  pageSize: 12,
};
const categoryCounts: CategoryCount[] = [
  { category: "audio", count: 5 },
  { category: "workspace", count: 5 },
];

describe("shop interface states", () => {
  it("shows the loading grid and accessible status", () => {
    render(<ShopLoading />);
    expect(screen.getByRole("main", { name: "Loading products" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByRole("status")).toHaveTextContent("Loading products");
  });

  it("offers a full reset from the empty state", () => {
    render(<ShopEmptyState />);
    expect(
      screen.getByRole("heading", { name: "No products match these choices" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Clear filters" })).toHaveAttribute("href", "/shop");
  });

  it("retries from the API error state", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    render(<ShopErrorState reset={reset} />);
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledOnce();
  });

  it("provides wishlist and cart feedback on product cards", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={catalog[0]} />);
    const favorite = screen.getByRole("button", { name: /Add Aura.*to favorites/i });
    await user.click(favorite);
    expect(screen.getByRole("button", { name: /Remove Aura.*from favorites/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByRole("button", { name: /Add Aura.*to cart/i }));
    expect(screen.getByRole("status")).toHaveTextContent("added to cart");
  });

  it("opens and dismisses the mobile drawer with Escape and returns focus", async () => {
    const user = userEvent.setup();
    render(<ProductFilters query={filterQuery} categoryCounts={categoryCounts} />);
    const trigger = screen.getByRole("button", { name: "Filters" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Filter products" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("applies drawer filters while preserving search and sort and resetting the page", async () => {
    const user = userEvent.setup();
    pushMock.mockClear();
    render(<ProductFilters query={filterQuery} categoryCounts={categoryCounts} />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    const dialog = screen.getByRole("dialog", { name: "Filter products" });
    await user.click(within(dialog).getByRole("checkbox", { name: /Audio/ }));
    await user.type(within(dialog).getByLabelText("Minimum"), "100");
    await user.click(within(dialog).getByRole("button", { name: "Apply filters" }));

    expect(pushMock).toHaveBeenCalledWith("/shop?q=audio&sort=rating&category=audio&minPrice=100");
  });
});
