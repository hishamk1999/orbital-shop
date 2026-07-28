import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HomePage } from "../pages/HomePage";

vi.mock("@/shared/layouts", () => ({
  Header: () => null,
  Footer: () => null,
}));

vi.mock("../components/Hero", () => ({
  Hero: () => null,
}));

vi.mock("../components/CommerceSections", () => ({
  CommerceSections: () => null,
}));

describe("home page product interactions", () => {
  it("renders every featured product without a search value", () => {
    render(<HomePage />);

    expect(screen.getByText("Aura noise-canceling headphones")).toBeInTheDocument();
    expect(screen.getByText("Nexus mechanical keyboard")).toBeInTheDocument();
    expect(screen.getByText("Arc smartwatch 44mm")).toBeInTheDocument();
    expect(screen.getByText("Halo 4K pocket camera")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View Aura noise-canceling headphones" }),
    ).toHaveAttribute("href", "/shop/aura-headphones");
  });

  it("toggles a product favorite state accessibly", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const addFavorite = screen.getByRole("button", {
      name: "Add Aura noise-canceling headphones to favorites",
    });
    expect(addFavorite).toHaveAttribute("aria-pressed", "false");

    await user.click(addFavorite);

    expect(
      screen.getByRole("button", {
        name: "Remove Aura noise-canceling headphones from favorites",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("announces the cart count after repeated additions", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const addToCart = screen.getByRole("button", {
      name: "Add Aura noise-canceling headphones to cart",
    });

    await user.click(addToCart);
    expect(screen.getByText("Cart contains 1 item.")).toBeInTheDocument();

    await user.click(addToCart);
    expect(screen.getByText("Cart contains 2 items.")).toBeInTheDocument();
  });
});
