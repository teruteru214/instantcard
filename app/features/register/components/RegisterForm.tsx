import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useSetAtom } from "jotai";
import { useState } from "react";
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
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { userAtom } from "~/store/userAtom";

import { UserSchema } from "schema/user";
import { LANGUAGE_IDS, languages } from "~/config/languageOption";
import { authCookie } from "~/utils/auth";
import { registerSchema } from "../schema/register";

type FormValues = z.infer<typeof registerSchema>;

interface RegisterResponse {
	token: string;
}

const RegisterForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const setUser = useSetAtom(userAtom);

	const form = useForm<FormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			language: "ja",
			purpose: "",
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
					body: JSON.stringify({
						name: data.name,
						language: data.language,
						purpose: data.purpose,
					}),
				},
			);

			if (!registerUserResponse.ok) {
				const errorData = await registerUserResponse.text();
				console.error("Registration failed:", errorData);
				throw new Error("登録に失敗しました");
			}

			const { token: jwtToken } =
				(await registerUserResponse.json()) as RegisterResponse;
			await authCookie.serialize(jwtToken);

			const userResponse = await fetch("/workers/auth/find-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token: jwtToken }),
			});

			if (userResponse.ok) {
				const json = await userResponse.json();
				const result = UserSchema.safeParse(json);

				if (!result.success) {
					console.error("Invalid user data:", result.error);
					throw new Error("Invalid user data received from server");
				}

				const userData = {
					...result.data,
					img: result.data.img ?? undefined,
					speaker: result.data.speaker ?? undefined,
					language: result.data.language ?? undefined,
				};
				setUser(userData);
			}

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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<Label indispensable>ユーザー名</Label>
							<FormControl>
								<Input
									placeholder="表示名を入力（20文字以内）"
									{...field}
									className="h-12"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem>
							<Label indispensable>翻訳言語</Label>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12">
										<SelectValue placeholder="英語を翻訳する言語を選択してください" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{LANGUAGE_IDS.map((languageId) => (
										<SelectItem key={languageId} value={languageId}>
											{languages[languageId]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="purpose"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<Label>英語学習の目的</Label>
							<FormControl>
								<Input
									type="text"
									{...field}
									placeholder="TOEICで800点以上を取る"
									className="h-12"
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
	);
};

export default RegisterForm;
