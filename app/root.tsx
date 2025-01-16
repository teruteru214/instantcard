import type { LinksFunction } from "@remix-run/cloudflare";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";

import Footer from "./components/global/footer";
import Menu from "./components/global/menu";
import "./tailwind.css";

export const links: LinksFunction = () => [
	{ rel: "icon", href: "/icon.webp", type: "image/x-icon" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	return (
		<html lang="ja">
			<head>
				<title>エラーが発生しました</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<h1>エラーが発生しました</h1>
				<p>
					{isRouteErrorResponse(error)
						? `${error.status} ${error.statusText}`
						: error instanceof Error
							? error.message
							: "不明なエラーが発生しました"}
				</p>
				<p>
					<a href="/">ホームに戻る</a>
				</p>
				<Scripts />
				<ScrollRestoration />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<>
			<div className="mx-auto max-w-screen-lg px-5 sm:px-10">
				<Outlet />
			</div>
			<Footer />
			<Menu />
		</>
	);
}
