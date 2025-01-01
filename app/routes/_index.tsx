import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import LoginModal from "~/components/global/LoginModal";
import LoginSheet from "~/components/global/LoginSheet";
import ResponsiveLoginButton from "~/components/global/ResponsiveLoginButton";
import { Button } from "~/components/ui/button";

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
		<>
			<div className="flex justify-center items-center pt-20 pb-10">
				<img
					src="/icon.webp"
					alt="logo"
					width={200}
					height={200}
					className="animate-fade"
				/>
			</div>
			<p className="text-center text-sm">煩雑な英単語学習、もっと手軽に</p>
			<h1 className="text-center text-5xl">InstantCard</h1>
			<div className="mt-2 flex flex-col items-center">
				<ResponsiveLoginButton />
				<p className="mt-4 text-gray-400 pb-10 hover:cursor-pointer hover:underline hover:text-gray-500">
					サービスをもっと詳しく→
				</p>
			</div>
			<div className="my-8 sm:my-32 flex flex-col items-center animate-bounce">
				<div className="w-0.5 h-20 bg-black" />
				<div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-black" />
			</div>
			<h2 className="text-3xl text-center">サービスの目的</h2>
			<div className="flex justify-center items-center">
				<img src="/reading.webp" alt="reading" width={200} height={200} />
			</div>
			<div className="flex justify-center">
				<p className="max-w-lg">
					InstantCardは、効率的に英単語カードを作成、学習するために生まれたサービスです。
					日々の英語学習の中で知らない英単語をカードにして、覚えて英語力を鍛えましょう。
				</p>
			</div>
			<div className="py-5 flex justify-center">
				<div className="hidden sm:block">
					<LoginModal
						trigger={
							<Button size="giant" aria-label="ログインモーダルを開く">
								カードを作る
							</Button>
						}
					/>
				</div>
				<div className="block sm:hidden">
					<LoginSheet
						trigger={
							<Button size="giant" aria-label="ログインモーダルを開く">
								カードを作る
							</Button>
						}
					/>
				</div>
			</div>
			<HelloWorldButton />
		</>
	);
}

const HelloWorldButton = () => {
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchHelloWorld = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/hello");
			if (!response.ok) {
				throw new Error("Failed to fetch");
			}
			const text = await response.text();
			setMessage(text);
		} catch (error) {
			console.error("Error fetching Hello World:", error);
			setMessage("エラーが発生しました");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Button
				onClick={fetchHelloWorld}
				disabled={loading}
				size="giant"
				variant={loading ? "outline" : "default"}
			>
				{loading ? "読み込み中..." : "Hello World を取得"}
			</Button>
			{message && <p className="mt-4 text-gray-500">{message}</p>}
		</div>
	);
};
