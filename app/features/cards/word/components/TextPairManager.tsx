import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

// 🔥 バリデーションスキーマ
const textPairSchema = z.object({
	items: z
		.array(
			z.object({
				id: z.number(),
				text: z
					.string()
					.nonempty({ message: "英文を入力してください" })
					.max(200, { message: "英文は200文字以内で入力してください" }),
				translation: z
					.string()
					.nonempty({ message: "翻訳を入力してください" })
					.max(300, { message: "翻訳は300文字以内で入力してください" }),
			}),
		)
		.max(5, { message: "最大5件まで入力できます" }),
});

type TextPairFormData = z.infer<typeof textPairSchema>;

interface TextPairManagerProps {
	type: "synonyms" | "antonyms" | "collocations" | "examples";
	initialData: { id: number; text: string; translation: string }[];
}

const TYPE_LABELS = {
	synonyms: "類義語",
	antonyms: "対義語",
	collocations: "コロケーション",
	examples: "例文",
};

const TextPairManager = ({ type, initialData }: TextPairManagerProps) => {
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

	// 🔥 データ追加
	const handleAdd = () => {
		if (fields.length < 5) {
			append({ id: Date.now(), text: "", translation: "" });
		}
	};

	// 🔥 送信（仮）
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
					{TYPE_LABELS[type]}を更新
				</Button>
			</div>

			{fields.map((item, index) => (
				<div key={item.id}>
					<div className="flex items-start gap-2 w-full">
						<div className="flex-1 space-y-2">
							<div className="flex items-center gap-1">
								<span className="text-sm font-medium whitespace-nowrap">
									英文:
								</span>
								<div className="w-full">
									<Input
										{...control.register(`items.${index}.text`)}
										placeholder="英文"
									/>
								</div>
							</div>
							{errors.items?.[index]?.text && (
								<p className="text-red-500 text-xs">
									{errors.items[index]?.text?.message}
								</p>
							)}

							<div className="flex items-center gap-1">
								<span className="text-sm font-medium whitespace-nowrap">
									意味:
								</span>
								<div className="w-full">
									<Input
										{...control.register(`items.${index}.translation`)}
										placeholder="意味"
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
							size="icon"
							className="h-[88px]"
							onClick={() => remove(index)}
						>
							<Trash2 />
						</Button>
					</div>

					{index < fields.length - 1 && <hr className="my-3 border-gray-300" />}
				</div>
			))}
		</div>
	);
};

export default TextPairManager;
