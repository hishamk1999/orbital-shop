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

    expect(screen.getByText("Aura Noise Canceling Headphones")).toBeInTheDocument();
    expect(screen.getByText("Nexus Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getByText("Arc Smartwatch 44mm")).toBeInTheDocument();
    expect(screen.getByText("Halo 4K Pocket Camera")).toBeInTheDocument();
  });

  it("toggles a product favorite state accessibly", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const addFavorite = screen.getByRole("button", {
      name: "Add Aura Noise Canceling Headphones to favorites",
    });
    expect(addFavorite).toHaveAttribute("aria-pressed", "false");

    await user.click(addFavorite);

    expect(
      screen.getByRole("button", {
        name: "Remove Aura Noise Canceling Headphones from favorites",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("announces the cart count after repeated additions", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const addToCart = screen.getByRole("button", {
      name: "Add Aura Noise Canceling Headphones to cart",
    });

    await user.click(addToCart);
    expect(screen.getByRole("status")).toHaveTextContent("Cart contains 1 item.");

    await user.click(addToCart);
    expect(screen.getByRole("status")).toHaveTextContent("Cart contains 2 items.");
  });
});
