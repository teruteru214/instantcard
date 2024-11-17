import { NavLink } from "@remix-run/react";
import { GraduationCap, Layers, Search, TvMinimal } from "lucide-react";

const Menu = () => {
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`flex flex-col items-center space-y-1 w-full py-2 transition ${
			isActive
				? "bg-gray-200 text-black"
				: "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
		}`;

	return (
		<div className="sticky border-t bottom-0 left-0 right-0 bg-white z-50">
			<nav className="mx-auto" aria-label="メインナビゲーション">
				<ul className="flex">
					<li className="flex-1">
						<NavLink to="/search" className={linkClass} aria-label="検索">
							<Search className="w-8 h-8" />
							<p className="text-xs">検索/作成</p>
						</NavLink>
					</li>
					<li className="flex-1">
						<NavLink to="/cards" className={linkClass} aria-label="単語カード">
							<Layers className="w-8 h-8" />
							<p className="text-xs">単語カード</p>
						</NavLink>
					</li>
					<li className="flex-1">
						<NavLink to="/quiz" className={linkClass} aria-label="クイズ">
							<GraduationCap className="w-8 h-8" />
							<p className="text-xs">クイズ</p>
						</NavLink>
					</li>
					<li className="flex-1">
						<NavLink to="/slide" className={linkClass} aria-label="スライド">
							<TvMinimal className="w-8 h-8" />
							<p className="text-xs">スライド</p>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Menu;
