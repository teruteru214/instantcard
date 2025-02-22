import { Link } from "@remix-run/react";
import LogoutModal from "./LogoutModal";

const Footer = () => {
	return (
		<footer className="bg-gray-100">
			<div className="mx-auto max-w-screen-lg px-5 py-10 sm:px-10 sm:flex sm:items-center sm:justify-between">
				<div className="space-y-5">
					<div className="py-5 flex space-x-1">
						<p>@teru214</p>
						<p>-</p>
						<LogoutModal
							trigger={
								<p className="hover:underline cursor-pointer">ログアウト</p>
							}
						/>
					</div>
					<Link to="/" className="flex items-center">
						<img
							src="/icon.webp"
							alt="InstantCardのロゴ"
							width={40}
							height={40}
						/>
						<h1 className="text-4xl">InstantCard</h1>
					</Link>
				</div>
				<nav
					className="mt-5 sm:mt-0 text-gray-600"
					aria-label="footer navigation"
				>
					<ul className="space-y-2">
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
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
