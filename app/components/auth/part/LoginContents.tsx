import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DialogDescription, DialogHeader } from "~/components/ui/dialog";
import { auth } from "~/config/initFirebase";
import { signInWithGoogle } from "~/utils/auth";

interface ViewState {
	state: "default" | "email" | "magiclink";
}

const LoginContents = () => {
	const [view, setView] = useState<ViewState>({ state: "default" });
	const navigate = useNavigate();

	const handleGoogleLogin = async () => {
		try {
			const { isNewUser } = await signInWithGoogle(auth);
			// 新規ユーザーの場合は/registerへ、既存ユーザーは/dashboardへ
			if (isNewUser) {
				navigate("/register");
			} else {
				navigate("/cards");
			}
		} catch (error) {
			console.error("Googleログインエラー:", error);
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
						<Button size="giant" className="w-full" onClick={handleGoogleLogin}>
							Googleでログイン
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
