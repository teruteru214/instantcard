import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "~/features/_index";

describe("Index page", () => {
	it("renders the page title", () => {
		render(<Index />);
		const title = screen.getByRole("heading", { name: /instantcard/i });
		expect(title).toBeVisible();
	});

	it("renders the logo image", () => {
		render(<Index />);
		const logo = screen.getAllByAltText("logo")[0];
		expect(logo).toHaveAttribute("src", "/icon.webp");
	});

	it("renders the call-to-action button", () => {
		render(<Index />);
		const buttons = screen.getAllByRole("button", {
			name: "ログインモーダルを開く",
		});
		expect(buttons[0]).toBeVisible();
	});
});
