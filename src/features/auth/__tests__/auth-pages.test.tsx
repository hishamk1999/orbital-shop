import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ForgotPasswordPage, LoginPage, RegisterPage } from "../index";

describe("authentication pages", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("creates an account and shows the signed-in confirmation", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText("Full name"), "Avery Stone");
    await user.type(screen.getByLabelText("Email address"), "avery@example.com");
    await user.type(screen.getByLabelText("Password"), "Orbit123");
    await user.type(screen.getByLabelText("Confirm password"), "Orbit123");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByRole("heading", { name: "Account created." })).toBeInTheDocument();
  });

  it("validates login fields before checking the local account", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Enter your password.")).toBeInTheDocument();
  });

  it("starts password recovery only for a registered account", async () => {
    const user = userEvent.setup();
    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText("Account email"), "missing@example.com");
    await user.click(screen.getByRole("button", { name: "Get recovery code" }));

    expect(await screen.findByText("No Orbital account was found for this email.")).toBeInTheDocument();
  });
});
