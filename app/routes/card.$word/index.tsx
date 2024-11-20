import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageSetting from "~/components/global/ImageSetting";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import EditHeader from "./EditHeader";
import TextPairManager from "./TextPairManager";

const formSchema = z.object({
	word: z.string().nonempty("英単語は必須項目です").max(45, {
		message: "英単語は45文字以内で入力してください",
	}),
	translation: z.string().nonempty("翻訳は必須項目です").max(50, {
		message: "翻訳は50文字以内で入力してください",
	}),
	explanation: z
		.string()
		.max(300, {
			message: "解説は300文字以内で入力してください",
		})
		.optional(),
	pronunciation: z
		.string()
		.max(200, {
			message: "発音は200文字以内で入力してください",
		})
		.optional(),
	etymology: z
		.string()
		.max(200, {
			message: "語源は200文字以内で入力してください",
		})
		.optional(),
	collocations: z
		.array(
			z.object({
				id: z.string(),
				text: z.string().max(100, {
					message: "英文は100文字以内で入力してください",
				}),
				meaning: z.string().max(200, {
					message: "翻訳は200文字以内で入力してください",
				}),
			}),
		)
		.max(5, { message: "コロケーションは最大5件まで入力できます" })
		.optional(),
	examples: z
		.array(
			z.object({
				id: z.string(),
				text: z.string().max(200, {
					message: "英文は200文字以内で入力してください",
				}),
				meaning: z.string().max(300, {
					message: "翻訳は300文字以内で入力してください",
				}),
			}),
		)
		.max(5, { message: "例文は最大5件まで入力できます" })
		.optional(),
	other: z
		.string()
		.max(500, {
			message: "その他の情報は500文字以内で入力してください",
		})
		.optional(),
});

interface FormData extends z.infer<typeof formSchema> {}

const CardEditPage = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			word: "",
			translation: "",
			explanation: "",
			pronunciation: "",
			etymology: "",
			collocations: [
				{ id: "1", text: "make an apple pie", meaning: "アップルパイを作る" },
			],
			examples: [
				{
					id: "2",
					text: "She ate an apple.",
					meaning: "彼女はリンゴを食べた。",
				},
			],
			other: "",
		},
	});

	const onSubmit = (data: FormData) => {
		console.log("フォーム送信データ:", data);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<EditHeader isSaveEnabled={form.formState.isDirty} />
					<div className="space-y-3">
						<FormField
							name="word"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label indispensable>英単語</Label>
									<FormControl>
										<Input
											type="text"
											{...field}
											className="border rounded p-2 w-full"
											placeholder="英単語を入力してください"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="translation"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label indispensable>翻訳</Label>
									<FormControl>
										<Input
											type="text"
											{...field}
											className="border rounded p-2 w-full"
											placeholder="英単語の翻訳を入力してください"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="pronunciation"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>発音</Label>
									<FormControl>
										<Textarea
											{...field}
											className="border rounded p-2 w-full"
											placeholder="例: æpl (æ は「ア」に近い短い音で、p と l を続けて『アプル』と発音します。)"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="collocations"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>コロケーション</Label>
									<FormControl>
										<TextPairManager
											addButtonLabel="コロケーションを追加"
											value={field.value}
											onChange={field.onChange}
											maxItems={5}
											textPlaceholder="例: make an apple pie"
											meaningPlaceholder="例: アップルパイを作る"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="examples"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>例文</Label>
									<FormControl>
										<TextPairManager
											addButtonLabel="例文を追加"
											value={field.value}
											onChange={field.onChange}
											maxItems={5}
											textPlaceholder="例: She ate an apple pie for dessert after dinner."
											meaningPlaceholder="例: 彼女は夕食後のデザートにアップルパイを食べた。"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="other"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>その他(重要事項)</Label>
									<FormControl>
										<Textarea
											{...field}
											className="border rounded p-2 w-full"
											placeholder="例: その他の関連情報を入力してください。"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
			<div className="my-3">
				<Label>イメージ</Label>
				<ImageSetting />
			</div>
		</>
	);
};

export default CardEditPage;
