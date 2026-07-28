import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ProductPurchasePanel } from "../components/ProductPurchasePanel";
import { catalog } from "../data/catalog";
import { createProductDetails } from "../data/product-details";

const details = createProductDetails(catalog[0]);

describe("product details purchase controls", () => {
  it("updates quantity and announces an add-to-bag action", async () => {
    const user = userEvent.setup();
    render(<ProductPurchasePanel details={details} />);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Add 2 to bag" }));

    expect(screen.getByRole("button", { name: "Added to bag" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "2 Aura noise-canceling headphones added to your bag in Midnight.",
    );
  });

  it("selects a finish and toggles the favorite state", async () => {
    const user = userEvent.setup();
    render(<ProductPurchasePanel details={details} />);

    await user.click(screen.getByRole("radio", { name: "Sage" }));
    expect(screen.getByRole("radio", { name: "Sage" })).toBeChecked();

    const favorite = screen.getByRole("button", { name: "Add to favorites" });
    await user.click(favorite);

    expect(screen.getByRole("button", { name: "Remove from favorites" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
