import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/shared/layouts";
import { FaqsPage, OurStoryPage, ShippingReturnsPage } from "../index";

describe("information pages", () => {
  it("renders shipping details and the ordered return process", () => {
    render(<ShippingReturnsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "From our shelf to yours, without the guesswork.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("3–5 business days")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Start the return" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pack it safely" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Send it back" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Receive your refund" })).toBeInTheDocument();
  });

  it("renders grouped FAQ answers with native disclosure controls", () => {
    render(<FaqsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Useful answers, without the support maze.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Can I change or cancel an order?").closest("details")).toBeTruthy();
    expect(screen.getByText("Where is my account stored?").closest("details")).toBeTruthy();
  });

  it("renders the Orbital story and selection principles", () => {
    render(<OurStoryPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Less tech noise. More things worth keeping.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Useful before impressive" })).toBeInTheDocument();
    expect(screen.getByText("Notice the friction")).toBeInTheDocument();
  });

  it("links the requested footer labels to their real pages", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Shipping & returns" })).toHaveAttribute(
      "href",
      "/shipping-returns",
    );
    expect(screen.getByRole("link", { name: "FAQs" })).toHaveAttribute("href", "/faqs");
    expect(screen.getByRole("link", { name: "Our story" })).toHaveAttribute(
      "href",
      "/our-story",
    );
  });
});
