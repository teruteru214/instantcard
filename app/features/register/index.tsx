import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { nameSchema } from "./schema/name";

type FormValues = z.infer<typeof nameSchema>;

const RegisterPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(nameSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		setIsSubmitting(true);
		try {
			// ここでAPIリクエストなどの処理を行う
			console.log("名前を登録しました:", data.name);
			// 成功した場合はリダイレクトや成功メッセージを表示
		} catch (error) {
			console.error("登録中にエラーが発生しました", error);
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
							className="w-full h-12 text-lg font-medium"
							disabled={isSubmitting}
						>
							{isSubmitting ? "登録中..." : "アカウントを作成"}
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
