import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@remix-run/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import ButtonLoadingSpinner from "~/components/global/ButtonLoadingSpinner";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { auth } from "~/config/initFirebase";
import { authCookie } from "~/utils/auth";
import { nameSchema } from "./schema/name";

type FormValues = z.infer<typeof nameSchema>;

interface RegisterResponse {
	token: string;
}

const RegisterPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				// 未認証の場合はログインページへ
				navigate("/");
				return;
			}

			// 既存ユーザーの場合はカード一覧へ
			if (!user.metadata.creationTime) {
				navigate("/cards");
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	const form = useForm<FormValues>({
		resolver: zodResolver(nameSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		setIsSubmitting(true);
		try {
			// 既存のJWTトークンを取得
			const existingToken = await authCookie.parse(document.cookie);
			if (!existingToken) {
				throw new Error("認証が必要です");
			}

			// ユーザー登録APIを呼び出し
			const registerUserResponse = await fetch(
				"/workers/auth/create-google-user",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${existingToken}`,
					},
					body: JSON.stringify({ name: data.name }),
				},
			);

			if (!registerUserResponse.ok) {
				throw new Error("登録に失敗しました");
			}

			const { token: jwtToken } =
				(await registerUserResponse.json()) as RegisterResponse;
			await authCookie.serialize(jwtToken);

			// 登録成功後はカード一覧ページへ
			navigate("/cards");
		} catch (error) {
			console.error("登録中にエラーが発生しました", error);
			// TODO: エラー通知の実装
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="my-20 flex items-center justify-center min-h-[60vh]">
			<div className="w-full max-w-md mx-auto p-8 rounded-xl bg-white shadow-sm border border-gray-100">
				<div className="space-y-6 text-center mb-8">
					<div className="flex items-center justify-center gap-2">
						<img
							src="/icon.webp"
							alt="Enlexのロゴ"
							width={40}
							height={40}
							className="rounded-md"
						/>
						<h1 className="text-3xl font-bold">Enlex</h1>
					</div>
					<p className="text-gray-600">アカウント名を作成して始めましょう</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="表示名を入力（20文字以内）"
											{...field}
											className="h-12 text-lg"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full h-12 text-lg font-medium relative"
							disabled={isSubmitting}
							aria-busy={isSubmitting}
						>
							<div className="flex items-center justify-center">
								{isSubmitting && <ButtonLoadingSpinner />}
								アカウントを作成
							</div>
						</Button>
					</form>
				</Form>

				<div className="mt-6 text-center text-sm text-gray-500">
					すでにアカウントをお持ちですか？{" "}
					<Link to="/" className="font-medium text-blue-600 hover:underline">
						ログイン
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
