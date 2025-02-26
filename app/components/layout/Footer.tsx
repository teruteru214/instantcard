import { Link } from "@remix-run/react";
import LogoutModal from "./LogoutModal";

const Footer = () => {
	return (
		<footer className="bg-gray-100">
			<div className="mx-auto max-w-screen-lg px-5 py-10 sm:px-10 md:flex md:flex-col md:items-start lg:flex-row lg:items-center lg:justify-between">
				{/* 1列目: ユーザー情報とログアウトボタン */}
				<div className="flex items-center space-x-3">
					<img
						src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="avatar"
						className="w-7 h-7 rounded-full"
					/>
					<p>@teru214</p>
					<p>-</p>
					<LogoutModal
						trigger={
							<p className="hover:underline cursor-pointer">ログアウト</p>
						}
					/>
				</div>

				{/* 2列目: ナビゲーションメニュー */}
				<nav
					className="mt-5 md:mt-3 lg:mt-0 text-gray-600"
					aria-label="footer navigation"
				>
					<ul className="space-y-2 md:space-y-1 lg:flex lg:space-y-0 lg:space-x-5">
						<li>
							<Link to="/">
								<span className="hover:underline hover:text-gray-700">
									Home
								</span>
							</Link>
						</li>
						<li>
							<Link to="/#" aria-label="使い方">
								<span className="hover:underline hover:text-gray-700">
									使い方
								</span>
							</Link>
						</li>
						<li>
							<Link to="/#" aria-label="利用規約">
								<span className="hover:underline hover:text-gray-700">
									利用規約
								</span>
							</Link>
						</li>
						<li>
							<Link to="/#" aria-label="プライバシーポリシー">
								<span className="hover:underline hover:text-gray-700">
									プライバシーポリシー
								</span>
							</Link>
						</li>
						<li>
							{/* 外部リンクのため、<a>タグを使用 */}
							<a
								href="https://example.com/contact"
								aria-label="お問い合わせ"
								className="hover:underline hover:text-gray-700"
								target="_blank"
								rel="noopener noreferrer"
							>
								お問い合わせ
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
