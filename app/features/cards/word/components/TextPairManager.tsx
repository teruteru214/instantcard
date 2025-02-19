import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type TextPairFormData = {
	items: {
		id: number;
		text: string;
		translation: string;
	}[];
};

interface TextPairManagerProps {
	type:
		| "synonyms"
		| "antonyms"
		| "collocations"
		| "examples"
		| "derivations"
		| "phrasal_verbs";
	initialData: { id: number; text: string; translation: string }[];
	maxTextLength: number;
	maxTranslationLength: number;
}

const TYPE_LABELS = {
	synonyms: "類義語",
	antonyms: "対義語",
	collocations: "コロケーション",
	examples: "例文",
	derivations: "派生語",
	phrasal_verbs: "句動詞",
};

const TextPairManager = ({
	type,
	initialData,
	maxTextLength,
	maxTranslationLength,
}: TextPairManagerProps) => {
	const textPairSchema = z.object({
		items: z
			.array(
				z.object({
					id: z.number(),
					text: z
						.string()
						.nonempty({ message: "英文を入力してください" })
						.max(maxTextLength, {
							message: `英文は${maxTextLength}文字以内で入力してください`,
						}),
					translation: z
						.string()
						.nonempty({ message: "翻訳を入力してください" })
						.max(maxTranslationLength, {
							message: `翻訳は${maxTranslationLength}文字以内で入力してください`,
						}),
				}),
			)
			.max(5, { message: "最大5件まで入力できます" }),
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm<TextPairFormData>({
		resolver: zodResolver(textPairSchema),
		defaultValues: { items: initialData },
		mode: "onChange",
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const handleAdd = () => {
		if (fields.length < 5) {
			append({ id: Date.now(), text: "", translation: "" });
		}
	};

	const onSubmit = (data: TextPairFormData) => {
		console.log(`${TYPE_LABELS[type]} を保存:`, data.items);
	};

	return (
		<div className="bg-gray-100 p-3 rounded-md space-y-4">
			<div className="flex justify-between">
				<Button
					type="button"
					onClick={handleAdd}
					disabled={fields.length >= 5}
					variant="highlight"
				>
					+ 追加
				</Button>
				<Button
					type="button"
					onClick={handleSubmit(onSubmit)}
					variant="black"
					disabled={!isValid || !isDirty}
				>
					更新する
				</Button>
			</div>

			{fields.map((item, index) => {
				const errorCount = [
					errors.items?.[index]?.text,
					errors.items?.[index]?.translation,
				].filter(Boolean).length;

				const minHeightClass =
					errorCount === 0
						? "min-h-[88px]"
						: errorCount === 1
							? "min-h-[112px]"
							: "min-h-[136px]";

				return (
					<div key={item.id}>
						<div className="flex items-stretch gap-2 w-full">
							<div className="flex-1 space-y-2">
								<div className="flex items-center gap-1">
									<span className="text-sm font-bold whitespace-nowrap">
										英文:
									</span>
									<div className="w-full">
										<Input
											{...control.register(`items.${index}.text`)}
											placeholder="英文を入力してください"
										/>
									</div>
								</div>
								{errors.items?.[index]?.text && (
									<p className="text-red-500 text-xs">
										{errors.items[index]?.text?.message}
									</p>
								)}

								<div className="flex items-center gap-1">
									<span className="text-sm font-bold whitespace-nowrap">
										翻訳:
									</span>
									<div className="w-full">
										<Input
											{...control.register(`items.${index}.translation`)}
											placeholder="翻訳を入力してください"
										/>
									</div>
								</div>
								{errors.items?.[index]?.translation && (
									<p className="text-red-500 text-xs">
										{errors.items[index]?.translation?.message}
									</p>
								)}
							</div>

							<Button
								type="button"
								variant="destructive"
								size="sm"
								className={clsx(minHeightClass)}
								onClick={() => remove(index)}
							>
								<Trash2 />
							</Button>
						</div>

						{index < fields.length - 1 && (
							<hr className="my-3 border-gray-300" />
						)}
					</div>
				);
			})}
		</div>
	);
};

export default TextPairManager;
