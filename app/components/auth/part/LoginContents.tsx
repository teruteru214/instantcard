import { useNavigate } from "@remix-run/react";
import { useSetAtom } from "jotai";
import { useState } from "react";
import ButtonLoadingSpinner from "~/components/global/ButtonLoadingSpinner";

import { Button } from "~/components/ui/button";
import { DialogDescription, DialogHeader } from "~/components/ui/dialog";
import { auth } from "~/config/initFirebase";
import { type User, userAtom } from "~/store/userAtom";
import { authCookie, signInWithGoogle } from "~/utils/auth";

interface ViewState {
	state: "default" | "email" | "magiclink";
}

const LoginContents = () => {
	const [view, setView] = useState<ViewState>({ state: "default" });
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const setUser = useSetAtom(userAtom);

	const handleGoogleLogin = async () => {
		try {
			setIsLoading(true);
			await signInWithGoogle(auth);

			const token = await authCookie.parse(document.cookie);

			if (!token) {
				throw new Error("認証トークンが見つかりません");
			}

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000);

			const existingUserResponse = await fetch("/workers/auth/find-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token }),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			if (existingUserResponse.ok) {
				const userData = (await existingUserResponse.json()) as User;
				setUser(userData);
				navigate("/cards");
			} else {
				if (existingUserResponse.status === 404) {
					navigate("/register");
				} else {
					throw new Error(
						`サーバーエラーが発生しました (${existingUserResponse.status})`,
					);
				}
			}
		} catch (error) {
			console.error("Googleログインエラー:", error);
			alert("ログイン処理中にエラーが発生しました。もう一度お試しください。");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DialogHeader>
				{view.state === "default" && (
					<div
						className="flex justify-center py-10"
						role="banner"
						aria-label="Enlexログイン"
					>
						<img src="/icon.webp" alt="Enlexのロゴ" width={40} height={40} />
						<h1 className="text-4xl" aria-label="Enlex">
							Enlex
						</h1>
					</div>
				)}
			</DialogHeader>
			<DialogDescription className="transition-all duration-300">
				{view.state === "email"
					? "入力されたメールアドレスにログイン用リンクが送られます。"
					: view.state === "magiclink"
						? "ログイン用のリンクを記載したメールをお送りしました。メールをご確認ください。"
						: "Enlexは、効率的に英単語カードを作成、学習するために生まれたサービスです。"}
			</DialogDescription>
			<div className="mt-5 space-y-5">
				{view.state === "default" ? (
					<>
						<Button
							size="giant"
							className="w-full relative"
							onClick={handleGoogleLogin}
							disabled={isLoading}
							aria-busy={isLoading}
						>
							<div className="flex items-center justify-center">
								{isLoading && <ButtonLoadingSpinner />}
								<svg
									className="w-5 h-5 mr-2.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Googleロゴ</title>
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="#4285F4"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="#34A853"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										fill="#FBBC05"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="#EA4335"
									/>
								</svg>
								Googleでログイン
							</div>
						</Button>
						<Button
							size="giant"
							className="w-full"
							onClick={() => setView({ state: "email" })}
						>
							Emailでログイン
						</Button>
					</>
				) : view.state === "email" ? (
					<>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								setView({ state: "magiclink" });
							}}
						>
							<input
								type="email"
								placeholder="email@example.com"
								className="w-full p-2 border rounded"
							/>
							<Button type="submit" size="giant" className="w-full mt-6">
								メールを送信
							</Button>
						</form>
						<Button
							variant="secondary"
							size="giant"
							className="w-full"
							onClick={() => setView({ state: "default" })}
						>
							戻る
						</Button>
					</>
				) : view.state === "magiclink" ? (
					<>
						<p className="text-sm text-gray-400 text-center">
							届かない場合は迷惑フォルダをご確認ください
						</p>
					</>
				) : null}
			</div>
		</>
	);
};

export default LoginContents;
