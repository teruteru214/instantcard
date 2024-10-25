import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<div className="flex justify-center items-center pt-20 pb-10">
				<Image
					src="/logo.webp"
					alt="logo"
					width={200}
					height={200}
					className="animate-fade"
				/>
			</div>
			<p className="text-center text-sm">英単語学習をもっと手軽に</p>
			<h1 className="text-center text-6xl">InstantCard</h1>
			<div className="mt-2 flex justify-center">
				<Button size="giant">カードを作る</Button>
			</div>
			<div className="my-36 flex flex-col items-center animate-bounce">
				<div className="w-0.5 h-32 bg-black" />
				<div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-black" />
			</div>
			<h2 className="pb-12 text-3xl text-center">利用手順</h2>
			<div className="space-y-12">
				<div className="flex justify-between">
					<div className="max-w-lg">
						<h3 className="text-2xl">英単語を検索/作成</h3>
						<p className="text-xl">
							英単語のサジェスト機能を使って簡単に単語を検索。AIが英単語の詳細情報を自動生成し、カードを楽々作成できます。
						</p>
					</div>
					<Image
						src="/robot.webp"
						alt="robot"
						width={300}
						height={300}
						className="animate-fade-right"
					/>
				</div>
				<div className="flex justify-between">
					<Image
						src="/tablet.webp"
						alt="tablet"
						width={300}
						height={300}
						className="animate-fade-left"
					/>
					<div className="max-w-lg">
						<h3 className="text-2xl">英単語を覚える</h3>
						<p className="text-xl">
							AIが生成した単語の情報を見ながら覚えたり、単語クイズやスライドを利用して楽しく単語を覚えましょう。
						</p>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="max-w-lg">
						<h3 className="text-2xl">英単語カードを捨てる</h3>
						<p className="text-xl">
							覚えた英単語はカードから削除して整理しましょう。
						</p>
					</div>
					<Image
						src="/trash.webp"
						alt="trash"
						width={300}
						height={300}
						className="animate-fade-right"
					/>
				</div>
			</div>
			<div className="mt-10 flex justify-center">
				<Button size="giant">カードを作る</Button>
			</div>
			<p className="mt-4 text-center text-gray-400 pb-10 hover:cursor-pointer hover:underline hover:text-gray-500">
				サービスをもっと詳しく→
			</p>
		</>
	);
}
