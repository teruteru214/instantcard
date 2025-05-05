import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm, useWatch } from "react-hook-form";
import ImageSetting from "~/components/global/ImageSetting";
import MultiSelect from "~/components/global/parts/MultiSelect";
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
import { typeOptions } from "~/config/typeOption";

import type { Tag } from "~/types/word";
import { type WordFormData, formSchema } from "../schema/wordFormSchema";
import CreateHeader from "./CreateHeader";
import SuggestInput from "./SuggestInput";
import TextPairManager from "./TextPairManager";

const WordForm = ({ initialTags }: { initialTags: Tag[] }) => {
	const form = useForm<WordFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			word: "",
			translation: "",
			meaning: "",
			pronunciation: "",
			examples: [],
			collocations: [],
			derivations: [],
			phrasal_verbs: [],
			synonyms: [],
			antonyms: [],
			types: [],
			etymology: "",
			note: "",
		},
		mode: "onSubmit",
		reValidateMode: "onSubmit",
	});

	const word = useWatch({
		control: form.control,
		name: "word",
	});

	const translation = useWatch({
		control: form.control,
		name: "translation",
	});

	const isFormValid = !!word && !!translation;

	const handleError = (errors: FieldErrors<WordFormData>) => {
		console.error("バリデーションエラー:", errors);
	};

	const handleFormSubmit = (headerData: { selectedTags: Tag[] }) => {
		form.trigger().then((isValid) => {
			if (isValid) {
				const formData = form.getValues();
				// フォームデータとタグを合わせる
				const submitData = {
					...formData,
					tags: headerData.selectedTags,
				};
				console.log("完全な送信データ:", submitData);
				// 実際の送信処理はここで行う
			} else {
				// エラーメッセージを強制的に表示するためにフォーム全体を検証
				for (const field of Object.keys(form.formState.errors)) {
					console.log(`エラーがあるフィールド: ${field}`);
				}
				// TextPair関連のフィールドも明示的に検証
				form.trigger("examples");
				form.trigger("collocations");
				form.trigger("derivations");
				form.trigger("phrasal_verbs");
				form.trigger("synonyms");
				form.trigger("antonyms");
				handleError(form.formState.errors);
			}
		});
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={(e) => e.preventDefault()}>
					<CreateHeader
						tags={initialTags}
						word={word || ""}
						isDisabled={!isFormValid}
						onSubmit={handleFormSubmit}
					/>
					<div className="mt-3 space-y-4">
						<FormField
							name="word"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Label indispensable>英単語</Label>
									<FormControl>
										<SuggestInput field={field} />
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
				<ImageSetting word={form.getValues("word") || ""} />
			</div>
		</>
	);
};

export default WordForm;
