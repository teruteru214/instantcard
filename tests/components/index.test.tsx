import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "~/features/_index";

describe("Index page", () => {
	it("renders main title", () => {
		render(<Index />);
		const titleElements = screen.getAllByText("Enlex");
		expect(titleElements.length).toBeGreaterThan(0);
	});

	it("renders subtitle text", () => {
		render(<Index />);
		const subtitleElements = screen.getAllByText(
			"瞬時に英単語の情報をキャッチする",
		);
		expect(subtitleElements.length).toBeGreaterThan(0);
	});

	it("renders feature headings", () => {
		render(<Index />);
		// 見出しが存在するかチェック
		const headings = screen.getAllByRole("heading");

		// 少なくとも4つの見出しが存在する（メインタイトル + 3つの機能見出し）
		expect(headings.length).toBeGreaterThanOrEqual(4);

		// 機能セクションのテキストが含まれているか確認
		const featureTexts = [
			"主な機能",
			"AIによる瞬時の英単語カード生成",
			"直感的な単語カード管理システム",
			"多彩な学習モードで記憶を定着",
		];

		for (const text of featureTexts) {
			const elements = screen.getAllByText(text);
			expect(elements.length).toBeGreaterThan(0);
		}
	});

	it("renders learning mode names", () => {
		render(<Index />);
		expect(screen.getAllByText("スライドモード")[0]).toBeDefined();
		expect(screen.getAllByText("クイズモード")[0]).toBeDefined();
	});

	it("renders app screenshots", () => {
		render(<Index />);
		const images = screen.getAllByRole("img");
		expect(images.length).toBeGreaterThan(0);

		// 画像にpathが設定されているか確認
		const homeImageExists = images.some(
			(img) => img.getAttribute("src") === "/home.webp",
		);
		expect(homeImageExists).toBe(true);
	});
});
