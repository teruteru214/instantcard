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
import { type User, userAtom } from "~/store/userAtom";

import { LANGUAGE_IDS, languages } from "~/config/languageOption";
import { registerSchema } from "../schema/register";

type FormValues = z.infer<typeof registerSchema>;

interface NameCheckResponse {
	exists: boolean;
	message: string;
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
			// 名前の重複チェック
			const checkNameResponse = await fetch("/workers/user/find-same-name", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: data.name }),
			});

			if (checkNameResponse.ok) {
				const checkResult =
					(await checkNameResponse.json()) as NameCheckResponse;
				if (checkResult.exists) {
					form.setError("name", {
						type: "manual",
						message: "このユーザー名は既に登録されています",
					});
					return;
				}
			}

			// ユーザー登録APIを呼び出し
			const registerUserResponse = await fetch("/workers/auth/create-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: data.name,
					language: data.language,
					purpose: data.purpose,
				}),
				credentials: "include",
			});

			if (!registerUserResponse.ok) {
				const errorData = await registerUserResponse.text();
				console.error("Registration failed:", errorData);
				throw new Error("登録に失敗しました");
			}

			// 登録成功時はレスポンスからユーザー情報を取得
			const userData = await registerUserResponse.json();
			setUser(userData as User);

			// 登録成功後はカード一覧ページへ
			navigate("/cards");
		} catch (error) {
			console.error("登録中にエラーが発生しました", error);
			alert("登録中にエラーが発生しました。もう一度お試しください。");
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
							<p className="text-xs text-gray-500">
								翻訳言語と英語学習の目的は、単語カードのAI生成に反映されます。
							</p>
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
						アカウントを作成する
					</div>
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
