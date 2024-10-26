import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gray-100">
			<div className="mx-auto max-w-screen-lg px-5 pt-10 pb-28 sm:px-10 sm:flex sm:items-center sm:justify-between">
				<div className="space-y-5">
					<span className="cursor-pointer hover:underline">ログアウト</span>
					<Link href="/" className="flex items-center">
						<Image src="/logo.webp" alt="title" width={40} height={40} />
						<h1 className="text-4xl">InstantCard</h1>
					</Link>
				</div>
				<nav className="mt-5 sm:mt-0">
					<ul className="space-y-2">
						<li>
							<Link href="/#">
								<span className="hover:underline">使い方</span>
							</Link>
						</li>
						<li>
							<Link href="/#">
								<span className="hover:underline">利用規約</span>
							</Link>
						</li>
						<li>
							<Link href="/#">
								<span className="hover:underline">プライバシーポリシー</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
