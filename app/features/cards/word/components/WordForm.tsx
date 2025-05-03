import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
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
import { typeOptions } from "../config/typeOption";
import { type WordFormData, formSchema } from "../schema/wordFormSchema";
import type { WordDetail } from "../types";
import EditHeader from "./EditHeader";
import MultiSelect from "./MultiSelect";
import TextPairManager from "./TextPairManager";

const WordForm = ({ wordDetail }: { wordDetail: WordDetail }) => {
	const form = useForm<WordFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			word: wordDetail.word || "",
			translation: wordDetail.translation || "",
			meaning: wordDetail.meaning || "",
			pronunciation: wordDetail.pronunciation || "",
			examples: wordDetail.examples || [],
			collocations: wordDetail.collocations || [],
			derivations: wordDetail.derivations || [],
			phrasal_verbs: wordDetail.phrasal_verbs || [],
			synonyms: wordDetail.synonyms || [],
			antonyms: wordDetail.antonyms || [],
			types: wordDetail.types || [],
			etymology: wordDetail.etymology || "",
			note: wordDetail.other || "",
		},
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<WordFormData> = (data) => {
		const changedData = Object.fromEntries(
			(Object.keys(data) as Array<keyof WordFormData>)
				.filter((key) => form.getValues(key) !== data[key])
				.map((key) => [key, data[key]]),
		);
		console.log("Changed Data:", changedData);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<EditHeader
						tags={wordDetail.tags || []}
						word={wordDetail.word}
						isDisabled={!form.formState.isValid || !form.formState.isDirty}
						onSubmit={() => onSubmit(form.getValues())}
					/>
					<div className="mt-3 space-y-4">
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
							name="meaning"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>意味</Label>
									<FormControl>
										<Textarea {...field} placeholder="単語の詳細な意味を入力" />
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
										<Textarea {...field} placeholder="発音のポイントを入力" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div>
							<FormField
								name="examples"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label className="mb-2">例文</Label>
										<FormControl>
											<TextPairManager
												initialData={field.value || []}
												name="examples"
												control={form.control}
												setValue={form.setValue}
												errors={form.formState.errors}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="border-t border-gray-200 pt-4">
							<FormField
								name="collocations"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label className="mb-2">コロケーション</Label>
										<FormControl>
											<TextPairManager
												initialData={field.value || []}
												name="collocations"
												control={form.control}
												setValue={form.setValue}
												errors={form.formState.errors}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="border-t border-gray-200 pt-4">
							<FormField
								name="derivations"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label className="mb-2">派生語</Label>
										<FormControl>
											<TextPairManager
												initialData={field.value || []}
												name="derivations"
												control={form.control}
												setValue={form.setValue}
												errors={form.formState.errors}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="border-t border-gray-200 pt-4">
							<FormField
								name="phrasal_verbs"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label className="mb-2">句動詞</Label>
										<FormControl>
											<TextPairManager
												initialData={field.value || []}
												name="phrasal_verbs"
												control={form.control}
												setValue={form.setValue}
												errors={form.formState.errors}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="border-t border-gray-200 pt-4">
							<FormField
								name="synonyms"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label className="mb-2">類義語</Label>
										<FormControl>
											<TextPairManager
												initialData={field.value || []}
												name="synonyms"
												control={form.control}
												setValue={form.setValue}
												errors={form.formState.errors}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="border-t border-gray-200 pt-4">
							<FormField
								name="antonyms"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label className="mb-2">対義語</Label>
										<FormControl>
											<TextPairManager
												initialData={field.value || []}
												name="antonyms"
												control={form.control}
												setValue={form.setValue}
												errors={form.formState.errors}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="border-t border-gray-200 pt-4">
							<FormField
								name="types"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label>文法の種類</Label>
										<FormControl>
											<MultiSelect
												options={typeOptions.map((t) => ({
													value: t.id,
													label: t.label,
												}))}
												selectedOptions={field.value || []}
												setSelectedOptions={(values) => {
													field.onChange(values);
													form.setValue("types", values, {
														shouldValidate: true,
													});
												}}
												placeholder="品詞を選択してください"
												name="types"
												error={form.formState.errors.types?.message}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							name="etymology"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>語源</Label>
									<FormControl>
										<Textarea {...field} placeholder="語源を入力" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="note"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label>ノート</Label>
									<FormControl>
										<Textarea {...field} placeholder="補足情報やメモを入力" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>

			<div className="mt-4">
				<Label>イメージ</Label>
				<ImageSetting word={wordDetail.word} />
			</div>
		</>
	);
};

export default WordForm;
