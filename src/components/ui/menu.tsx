"use client";

import { GalleryThumbnails, GraduationCap, Layers, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
	const pathname = usePathname();

	const linkClass = (path: string) =>
		`flex flex-col items-center space-y-1 group ${
			pathname === path ? "text-black" : "text-gray-400 hover:text-gray-500"
		}`;

	return (
		<div className="animate-fade border fixed bottom-0 left-0 right-0 bg-white z-50">
			<nav
				className="mx-auto max-w-screen-lg px-5 py-2 sm:px-10"
				aria-label="メインナビゲーション"
			>
				<ul className="flex justify-between">
					<li>
						<Link
							href="/search"
							className={linkClass("/search")}
							aria-label="検索"
						>
							<Search className="w-8 h-8" />
							<p className="text-xs">検索</p>
						</Link>
					</li>
					<li>
						<Link
							href="/cards"
							className={linkClass("/cards")}
							aria-label="単語カード"
						>
							<Layers className="w-8 h-8" />
							<p className="text-xs">単語カード</p>
						</Link>
					</li>
					<li>
						<Link
							href="/quiz"
							className={linkClass("/quiz")}
							aria-label="クイズ"
						>
							<GraduationCap className="w-8 h-8" />
							<p className="text-xs">クイズ</p>
						</Link>
					</li>
					<li>
						<Link
							href="/slide"
							className={linkClass("/slide")}
							aria-label="スライド"
						>
							<GalleryThumbnails className="w-8 h-8" />
							<p className="text-xs">スライド</p>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Menu;
