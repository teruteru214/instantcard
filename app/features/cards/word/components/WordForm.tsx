import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageSetting from "~/components/global/ImageSetting";
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
import { Textarea } from "~/components/ui/textarea";
import type { WordDetail } from "../types";
import EditHeader from "./EditHeader";
import TextPairManager from "./TextPairManager";

const formSchema = z.object({
	word: z.string().nonempty("英単語は必須項目です").max(50, {
		message: "英単語は50文字以内で入力してください",
	}),
	translation: z.string().nonempty("翻訳は必須項目です").max(100, {
		message: "翻訳は100文字以内で入力してください",
	}),
	pronunciation: z
		.string()
		.max(200, {
			message: "発音のコツは200文字以内で入力してください",
		})
		.optional(),
	meaning: z
		.string()
		.max(300, {
			message: "意味は300文字以内で入力してください",
		})
		.optional(),
	synonyms: z
		.array(
			z.object({
				id: z.number(),
				text: z.string().max(50, {
					message: "英文は50文字以内で入力してください",
				}),
				translation: z.string().max(200, {
					message: "翻訳は200文字以内で入力してください",
				}),
			}),
		)
		.max(5, { message: "類義語は最大5件まで入力できます" })
		.optional(),
	antonyms: z
		.array(
			z.object({
				id: z.number(),
				text: z.string().max(50, {
					message: "英文は50文字以内で入力してください",
				}),
				translation: z.string().max(100, {
					message: "翻訳は100文字以内で入力してください",
				}),
			}),
		)
		.max(5, { message: "対義語は最大5件まで入力できます" })
		.optional(),
	collocations: z
		.array(
			z.object({
				id: z.number(),
				text: z.string().max(100, {
					message: "英文は100文字以内で入力してください",
				}),
				translation: z.string().max(200, {
					message: "翻訳は200文字以内で入力してください",
				}),
			}),
		)
		.max(5, { message: "コロケーションは最大5件まで入力できます" })
		.optional(),
	examples: z
		.array(
			z.object({
				id: z.number(),
				text: z.string().max(200, {
					message: "英文は200文字以内で入力してください",
				}),
				translation: z.string().max(300, {
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

const WordForm = ({ wordDetail }: { wordDetail: WordDetail }) => {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			word: wordDetail.word || "",
			translation: wordDetail.translation || "",
			pronunciation: wordDetail.pronunciation || "",
			meaning: wordDetail.meaning || "",
			synonyms: wordDetail.synonyms || [],
			antonyms: wordDetail.antonyms || [],
			collocations: wordDetail.collocations || [],
			examples: wordDetail.examples || [],
			other: wordDetail.other || "",
		},
	});

	const onSubmit = (data: FormData) => {
		console.log("フォーム送信データ:", data);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<EditHeader tags={wordDetail.tags || []} word={wordDetail.word} />
					<div className="mt-3 space-y-3">
						<FormField
							name="word"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label indispensable>英単語</Label>
									<FormControl>
										<Input type="text" {...field} placeholder="英単語を入力" />
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
										<Input type="text" {...field} placeholder="翻訳を入力" />
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
									<Label>発音のコツ</Label>
									<FormControl>
										<Textarea {...field} placeholder="発音のコツを入力" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="meaning"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>意味</Label>
									<FormControl>
										<Textarea {...field} placeholder="意味を入力" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Label className="mb-2">類義語</Label>
							<TextPairManager
								type="synonyms"
								initialData={wordDetail.synonyms || []}
							/>
						</div>
						<div>
							<Label className="mb-2">対義語</Label>
							<TextPairManager
								type="antonyms"
								initialData={wordDetail.antonyms || []}
							/>
						</div>
						<div>
							<Label className="mb-2">コロケーション</Label>
							<TextPairManager
								type="collocations"
								initialData={wordDetail.collocations || []}
							/>
						</div>

						<div>
							<Label className="mb-2">例文</Label>
							<TextPairManager
								type="examples"
								initialData={wordDetail.examples || []}
							/>
						</div>

						<FormField
							name="other"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>その他</Label>
									<FormControl>
										<Textarea {...field} placeholder="その他の情報を入力" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
			<div className="mt-3">
				<Label>イメージ</Label>
				<ImageSetting />
			</div>
			<Button
				variant="black"
				type="submit"
				onClick={form.handleSubmit(onSubmit)}
				disabled={!form.formState.isValid}
				className="mb-3 ml-auto block"
			>
				更新する
			</Button>
		</>
	);
};

export default WordForm;
