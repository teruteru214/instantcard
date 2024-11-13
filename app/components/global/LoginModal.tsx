import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

type ViewState = "default" | "email" | "otp";

const LoginModal = ({ label }: { label: string }) => {
	const [view, setView] = useState<ViewState>("default");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="giant" aria-label="ログインモーダルを開く">
					{label}
				</Button>
			</DialogTrigger>
			<DialogContent aria-labelledby="login-modal-title">
				<DialogHeader>
					<DialogTitle aria-labelledby="login-modal-title">
						{view === "email"
							? "Emailでログイン"
							: view === "otp"
								? "確認コードを送りました"
								: "ログイン"}
					</DialogTitle>
					{view === "default" && (
						<div className="flex justify-center py-10">
							<img
								src="/icon.webp"
								alt="InstantCardのロゴ"
								width={40}
								height={40}
							/>
							<h1 className="text-4xl">InstantCard</h1>
						</div>
					)}
				</DialogHeader>
				<DialogDescription>
					{view === "email"
						? "入力されたメールアドレスにログイン用リンクが送られます。"
						: view === "otp"
							? "メールに送信されたワンタイムパスワードを入力してください。"
							: "InstantCardは、効率的に英単語カードを作成、学習するために生まれたサービスです。"}
				</DialogDescription>
				<div className="mt-5 space-y-5">
					{view === "default" ? (
						<>
							<Button size="giant" className="w-full">
								Googleでログイン
							</Button>
							<Button
								size="giant"
								className="w-full"
								onClick={() => setView("email")}
							>
								Emailでログイン
							</Button>
						</>
					) : view === "email" ? (
						<>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									setView("otp");
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
								onClick={() => setView("default")}
							>
								戻る
							</Button>
						</>
					) : (
						<>
							<form>
								<div className="flex justify-center">
									<InputOTP
										maxLength={6}
										pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
									>
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
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LoginModal;
