import clsx from "clsx";
import { Trash2 } from "lucide-react";
import {
	type Control,
	Controller,
	type FieldErrors,
	type UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { FormData } from "../schema/wordFormSchema";
import type { TextPair } from "../types";

type TextPairFieldName = keyof Pick<
	FormData,
	| "synonyms"
	| "antonyms"
	| "collocations"
	| "examples"
	| "derivations"
	| "phrasal_verbs"
>;

interface TextPairManagerProps {
	initialData: TextPair[];
	name: TextPairFieldName;
	control: Control<FormData>;
	setValue: UseFormSetValue<FormData>;
	errors: FieldErrors<FormData>;
}

const TextPairManager = ({
	initialData,
	name,
	control,
	setValue,
	errors,
}: TextPairManagerProps) => {
	const labelMap: Record<TextPairFieldName, string> = {
		synonyms: "類義語を追加",
		antonyms: "対義語を追加",
		collocations: "コロケーションを追加",
		examples: "例文を追加",
		derivations: "派生語を追加",
		phrasal_verbs: "句動詞を追加",
	};

	const items: TextPair[] = useWatch({ control, name }) ?? initialData;

	const handleAdd = () => {
		if (items.length < 5) {
			setValue(
				name,
				[...items, { id: Date.now(), text: "", translation: "" }],
				{
					shouldValidate: true,
				},
			);
		}
	};

	const handleRemove = (index: number) => {
		setValue(
			name,
			items.filter((_, i) => i !== index),
			{ shouldValidate: true },
		);
	};

	return (
		<div className="bg-gray-100 p-3 rounded-md space-y-4">
			{items.map((item, index) => {
				const fieldErrors = errors[name]?.[index] || {};

				return (
					<div key={item.id || index}>
						<div className="flex items-stretch gap-2 w-full">
							<div className="flex-1 space-y-2">
								<Controller
									name={`${name}.${index}.text` as const}
									control={control}
									defaultValue={item.text}
									render={({ field }) => (
										<Input {...field} placeholder="英文を入力してください" />
									)}
								/>
								{fieldErrors.text?.message && (
									<p className="text-red-500 text-xs">
										{fieldErrors.text.message}
									</p>
								)}

								<Controller
									name={`${name}.${index}.translation` as const}
									control={control}
									defaultValue={item.translation}
									render={({ field }) => (
										<Input {...field} placeholder="翻訳を入力してください" />
									)}
								/>
								{fieldErrors.translation?.message && (
									<p className="text-red-500 text-xs">
										{fieldErrors.translation.message}
									</p>
								)}
							</div>

							<Button
								type="button"
								variant="destructive"
								size="sm"
								onClick={() => handleRemove(index)}
								className={clsx("flex items-center justify-center", {
									"h-[88px]":
										!fieldErrors.text?.message &&
										!fieldErrors.translation?.message,
									"h-[112px]":
										fieldErrors.text?.message ||
										fieldErrors.translation?.message,
								})}
							>
								<Trash2 />
							</Button>
						</div>
					</div>
				);
			})}
			<div className="flex justify-center">
				<Button
					type="button"
					onClick={handleAdd}
					disabled={items.length >= 5}
					variant="highlight"
				>
					+ {labelMap[name]}
				</Button>
			</div>
		</div>
	);
};

export default TextPairManager;
