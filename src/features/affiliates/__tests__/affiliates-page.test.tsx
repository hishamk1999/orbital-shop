import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { AffiliatesPage } from "../index";

describe("affiliates page", () => {
  it("renders the program details and application", () => {
    render(<AffiliatesPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Good tech is better when it's shared well.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Up to 12% commission")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send application" })).toBeInTheDocument();
  });

  it("shows clear errors for an incomplete application", async () => {
    const user = userEvent.setup();
    render(<AffiliatesPage />);

    await user.click(screen.getByRole("button", { name: "Send application" }));

    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Choose your primary channel.")).toBeInTheDocument();
    expect(screen.getByText("Confirm that your application is accurate.")).toBeInTheDocument();
  });

  it("accepts a complete application", async () => {
    const user = userEvent.setup();
    render(<AffiliatesPage />);

    await user.type(screen.getByLabelText("Full name"), "Maya Chen");
    await user.type(screen.getByLabelText("Email address"), "maya@example.com");
    await user.selectOptions(screen.getByLabelText("Primary channel"), "YouTube");
    await user.type(screen.getByLabelText("Website or profile URL"), "https://example.com/maya");
    await user.selectOptions(screen.getByLabelText("Audience size"), "5,000–25,000");
    await user.selectOptions(screen.getByLabelText("Content focus"), "Consumer technology");
    await user.type(
      screen.getByLabelText("Why is Orbital a fit for your audience?"),
      "I make practical reviews that help people choose useful everyday technology.",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Send application" }));

    expect(
      await screen.findByRole("heading", { name: "Your application is in orbit." }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Thanks, Maya/)).toBeInTheDocument();
  });
});
