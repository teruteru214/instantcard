import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "InstantCard | 英単語学習、もっと手軽に" },
		{ property: "og:title", content: "InstantCard | 英単語学習、もっと手軽に" },
		{
			property: "og:description",
			content:
				"InstantCardは、効率的に英単語カードを作成、学習するためのサービスです。",
		},
		{ property: "og:image", content: "/og.webp" },
		{
			name: "description",
			content:
				"InstantCardは、効率的に英単語カードを作成、学習するためのサービスです。日々の英語学習の中で知らない英単語をカードにして、覚えて英語力を鍛えましょう。",
		},
		{ property: "twitter:card", content: "summary_large_image" },
		{
			property: "twitter:title",
			content: "InstantCard | 英単語学習、もっと手軽に",
		},
		{
			property: "twitter:description",
			content:
				"InstantCardは、効率的に英単語カードを作成、学習するためのサービスです。",
		},
		{ property: "twitter:image", content: "/og.webp" },
	];
};

export default function Index() {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col items-center gap-16">
				<header className="flex flex-col items-center gap-9">
					<h1 className="dark:text-gray-100 font-bold leading text-2xl text-gray-800">
						Welcome to <span className="sr-only">Remix</span>
					</h1>
				</header>
				<nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
					<p className="leading-6 text-gray-700 dark:text-gray-200">
						What&apos;s next?
					</p>
				</nav>
			</div>
		</div>
	);
}
