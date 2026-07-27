import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CareersPage } from "../index";

describe("careers page", () => {
  it("renders realistic roles and filters them by team", async () => {
    const user = userEvent.setup();
    render(<CareersPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Do work that makes tech feel more human.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("5 roles found")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Filter by team"), "Engineering");

    expect(screen.getByText("1 role found")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Frontend Engineer, Commerce" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Content Producer" })).not.toBeInTheDocument();
  });

  it("shows role details and validates the application", async () => {
    const user = userEvent.setup();
    render(<CareersPage />);

    await user.click(screen.getAllByRole("button", { name: "View role" })[0]);
    expect(screen.getByRole("heading", { name: "What you will do" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Apply for this role/ }));
    await user.click(screen.getByRole("button", { name: "Send application" }));

    expect(screen.getByText("Enter your first name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Add your résumé as a PDF, DOC, or DOCX file.")).toBeInTheDocument();
  });

  it("accepts a complete dummy application", async () => {
    const user = userEvent.setup();
    render(<CareersPage />);

    await user.click(screen.getAllByRole("button", { name: "View role" })[0]);
    await user.click(screen.getByRole("button", { name: /Apply for this role/ }));
    await user.type(screen.getByLabelText(/First name/), "Maya");
    await user.type(screen.getByLabelText(/Last name/), "Chen");
    await user.type(screen.getByLabelText(/Email address/), "maya@example.com");
    fireEvent.change(screen.getByLabelText(/Résumé/), {
      target: { files: [new File(["resume"], "maya-chen.pdf", { type: "application/pdf" })] },
    });
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Send application" }));

    expect(await screen.findByRole("heading", { name: "Application received." })).toBeInTheDocument();
    expect(screen.getByText(/Thanks, Maya/)).toBeInTheDocument();
  });
});
