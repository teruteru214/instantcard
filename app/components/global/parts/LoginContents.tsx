import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DialogDescription, DialogHeader } from "~/components/ui/dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "~/components/ui/input-otp";

interface ViewState {
	state: "default" | "email" | "otp";
}

const LoginContents = () => {
	const [view, setView] = useState<ViewState>({ state: "default" });

	return (
		<>
			<DialogHeader>
				{view.state === "default" && (
					<div
						className="flex justify-center py-10"
						role="banner"
						aria-label="InstantCardログイン"
					>
						<img
							src="/icon.webp"
							alt="InstantCardのロゴ"
							width={40}
							height={40}
						/>
						<h1 className="text-4xl" aria-label="InstantCard">
							InstantCard
						</h1>
					</div>
				)}
			</DialogHeader>
			<DialogDescription className="transition-all duration-300">
				{view.state === "email"
					? "入力されたメールアドレスにログイン用リンクが送られます。"
					: view.state === "otp"
						? "メールに送信されたワンタイムパスワードを入力してください。"
						: "InstantCardは、効率的に英単語カードを作成、学習するために生まれたサービスです。"}
			</DialogDescription>
			<div className="mt-5 space-y-5">
				{view.state === "default" ? (
					<>
						<Button size="giant" className="w-full">
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
								setView({ state: "otp" });
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
				) : view.state === "otp" ? (
					<>
						<form>
							<div className="flex justify-center">
								<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</div>
							<Button size="giant" className="w-full mt-6">
								確定する
							</Button>
						</form>
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
