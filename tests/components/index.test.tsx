import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "~/features/_index";

describe("Index page", () => {
	it("renders the page title", () => {
		render(<Index />);
		const title = screen.getByRole("heading", { name: /Enlex/i });
		expect(title).toBeVisible();
	});

	it("renders the app screenshot", () => {
		render(<Index />);
		const appScreenshot = screen.getByAltText(
			"Enlex アプリのスクリーンショット",
		);
		expect(appScreenshot).toHaveAttribute("src", "/home.webp");
		expect(appScreenshot).toBeVisible();
	});

	it("renders the feature section titles", () => {
		render(<Index />);
		const featureTitle = screen.getByText("主な機能");
		expect(featureTitle).toBeVisible();

		const feature1 = screen.getByText("AIによる瞬時の英単語カード生成");
		expect(feature1).toBeVisible();

		const feature2 = screen.getByText("直感的な単語カード管理システム");
		expect(feature2).toBeVisible();

		const feature3 = screen.getByText("多彩な学習モードで記憶を定着");
		expect(feature3).toBeVisible();
	});

	it("renders the learning modes", () => {
		render(<Index />);
		const slideMode = screen.getByText("スライドモード");
		expect(slideMode).toBeVisible();

		const quizMode = screen.getByText("クイズモード");
		expect(quizMode).toBeVisible();
	});

	it("renders the login buttons", () => {
		render(<Index />);
		// ヘッダーとフッターに配置されたボタンが2つあるはず
		const loginButtons = screen.getAllByRole("button", {
			name: "ログインモーダルを開く",
		});
		expect(loginButtons.length).toBeGreaterThanOrEqual(1);
		expect(loginButtons[0]).toBeVisible();
	});
});
