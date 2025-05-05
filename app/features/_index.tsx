import type { MetaFunction } from "@remix-run/cloudflare";
import ResponsiveLoginButton from "~/components/global/ResponsiveLoginButton";

export const meta: MetaFunction = () => {
	return [
		{ title: "Enlex | 英単語学習を革新する" },
		{ property: "og:title", content: "Enlex | 英単語学習を革新する" },
		{
			property: "og:description",
			content:
				"Enlexは、AIを活用して英単語カードを瞬時に作成・管理できる革新的な学習サービスです。",
		},
		{ property: "og:image", content: "/og.webp" },
		{
			name: "description",
			content:
				"Enlexは、AIを活用して英単語カードを瞬時に作成・管理できる革新的な学習サービスです。効率的な暗記と復習で、あなたの英語学習を加速させましょう。",
		},
		{ property: "twitter:card", content: "summary_large_image" },
		{
			property: "twitter:title",
			content: "Enlex | 英単語学習を革新する",
		},
		{
			property: "twitter:description",
			content:
				"Enlexは、AIを活用して英単語カードを瞬時に作成・管理できる革新的な学習サービスです。",
		},
		{ property: "twitter:image", content: "/og.webp" },
	];
};

export default function Index() {
	return (
		<div>
			<header className="container mx-auto px-4 py-20 text-center">
				<h1 className="text-5xl">Enlex</h1>
				<p className="mb-3">瞬時に英単語の情報をキャッチする</p>
				<div className="flex justify-center">
					<ResponsiveLoginButton />
				</div>
			</header>

			{/* アプリのスクリーンショット */}
			<section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center gap-8">
				<img
					src="/home.webp"
					alt="Enlex アプリのスクリーンショット"
					className="rounded-lg shadow-xl"
				/>
			</section>

			{/* 機能セクション */}
			<section className="container mx-auto px-4 py-16">
				<h2 className="text-4xl font-bold text-center mb-3">主な機能</h2>
				<p className="text-center text-gray-600 mb-16">
					あなたの英語学習を加速させる3つの強み
				</p>

				{/* 機能1 */}
				<div className="mb-32">
					<div className="flex items-center mb-8">
						<div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
							01
						</div>
						<h3 className="text-2xl font-bold ml-4">
							AIによる瞬時の英単語カード生成
						</h3>
					</div>

					<div className="flex flex-col md:flex-row gap-8 mb-8">
						<img
							src="/create.webp"
							alt="英単語カード作成機能のスクリーンショット"
							className="rounded-lg shadow-lg"
						/>
					</div>

					<p className="text-lg leading-relaxed">
						<span className="font-semibold">
							たった一語の入力で、完璧な学習カードが完成。
						</span>
						<br />
						AIが単語を分析し、意味・例文・発音のポイント・関連語句など、効率的な学習に必要な情報をすべて自動生成。
						辞書を引く手間や、ノートにまとめる時間を大幅に削減できます。
					</p>
				</div>

				{/* 機能2 */}
				<div className="mb-32">
					<div className="flex items-center mb-8">
						<div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
							02
						</div>
						<h3 className="text-2xl font-bold ml-4">
							直感的な単語カード管理システム
						</h3>
					</div>

					<div className="flex flex-col md:flex-row gap-8 mb-8">
						<img
							src="/cards.webp"
							alt="カード管理機能のスクリーンショット"
							className="rounded-lg shadow-lg"
						/>
					</div>

					<p className="text-lg leading-relaxed">
						<span className="font-semibold">
							自分だけの単語コレクションを自由にカスタマイズ。
						</span>
						<br />
						タグ付け、分類、並び替えなど、柔軟な管理機能で学習効率を最大化。
						辞書機能との連携で、単語の理解を深めながら、効率的な語彙力アップをサポートします。
					</p>
				</div>

				{/* 機能3 */}
				<div className="mb-24">
					<div className="flex items-center mb-8">
						<div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
							03
						</div>
						<h3 className="text-2xl font-bold ml-4">
							多彩な学習モードで記憶を定着
						</h3>
					</div>

					{/* 学習モード比較 */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						{/* スライドモード */}
						<div className="flex flex-col items-center">
							<div
								className="w-full bg-gray-50 rounded-lg overflow-hidden shadow-lg"
								style={{ aspectRatio: "4/3" }}
							>
								<div className="h-full w-full flex items-center justify-center">
									<img
										src="/slide.webp"
										alt="スライド機能のスクリーンショット"
										className="object-contain w-full h-full"
									/>
								</div>
							</div>
							<div className="mt-6 text-center w-full">
								<h4 className="text-xl font-bold">スライドモード</h4>
								<p className="text-gray-600 mt-1">自動再生で効率的に復習</p>
							</div>
						</div>

						{/* クイズモード */}
						<div className="flex flex-col items-center">
							<div
								className="w-full bg-gray-50 rounded-lg overflow-hidden shadow-lg"
								style={{ aspectRatio: "4/3" }}
							>
								<div className="h-full w-full flex items-center justify-center">
									<img
										src="/quiz.webp"
										alt="クイズ機能のスクリーンショット"
										className="object-contain w-full h-full"
									/>
								</div>
							</div>
							<div className="mt-6 text-center w-full">
								<h4 className="text-xl font-bold">クイズモード</h4>
								<p className="text-gray-600 mt-1">記憶の定着度をチェック</p>
							</div>
						</div>
					</div>

					<p className="text-lg leading-relaxed">
						<span className="font-semibold">
							スライドとクイズで「知っている」から「使える」へ。
						</span>
						<br />
						自分のペースで反復学習できるスライドモードと、理解度を確認できるクイズモードで、
						確実な記憶定着をサポート。スキマ時間を活用した継続的な学習で、着実に語彙力を強化できます。
					</p>
					<div className="flex justify-center">
						<ResponsiveLoginButton />
					</div>
				</div>
			</section>
		</div>
	);
}
