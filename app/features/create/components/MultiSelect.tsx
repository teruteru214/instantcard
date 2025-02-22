import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@remix-run/react";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";

interface Option {
	label: string;
}

interface MultiSelectProps {
	options: Option[];
	setOptions: (options: Option[]) => void;
	selectedOptions: string[];
	setSelectedOptions: (values: string[]) => void;
	placeholder?: string;
}

// ✅ タグのバリデーションスキーマ（最大15文字）
const tagsSchema = z.object({
	newTag: z
		.string()
		.max(15, { message: "タグは15文字以内で入力してください" })
		.default(""),
});

type TagsFormData = z.infer<typeof tagsSchema>;

const MultiSelect = ({
	options,
	setOptions,
	selectedOptions,
	setSelectedOptions,
	placeholder = "選択してください",
}: MultiSelectProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		watch,
		formState: { errors },
	} = useForm<TagsFormData>({
		resolver: zodResolver(tagsSchema),
		defaultValues: {
			newTag: "",
		},
	});

	const newTag = watch("newTag");

	// ✅ タグの追加処理
	const handleAddTag = () => {
		const formattedNewTag = newTag.trim();
		if (!formattedNewTag || formattedNewTag.length > 15) return;

		if (
			options.some(
				(tag) => tag.label.toLowerCase() === formattedNewTag.toLowerCase(),
			)
		) {
			setError("newTag", { message: "このタグはすでに存在します" });
			setTimeout(() => clearErrors("newTag"), 3000);
			return;
		}

		const newTagObject: Option = { label: formattedNewTag };

		setOptions([...options, newTagObject]);

		setSelectedOptions([...selectedOptions, formattedNewTag]);

		setValue("newTag", "");
		clearErrors("newTag");
	};

	return (
		<div>
			<div>
				<label htmlFor="multi-select" className="text-xl font-bold mb-1 block">
					タグの付与
				</label>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="relative cursor-pointer">
							<Input
								id="multi-select"
								readOnly
								className="h-11 w-full overflow-x-auto pointer-events-none"
								placeholder={selectedOptions.length > 0 ? "" : placeholder}
							/>
							<div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-wrap gap-2">
								{selectedOptions.map((selectedLabel) => (
									<Badge key={selectedLabel} variant="outline" size="sm">
										{selectedLabel}
									</Badge>
								))}
							</div>
							<ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 shrink-0 opacity-50" />
						</div>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-80 p-3">
						<div className="my-2 space-y-2">
							{options.map((option) => (
								<LabeledCheckbox
									key={option.label}
									label={option.label}
									checked={selectedOptions.includes(option.label)}
									onCheckedChange={(checked) => {
										setSelectedOptions(
											checked
												? [...selectedOptions, option.label]
												: selectedOptions.filter(
														(label) => label !== option.label,
													),
										);
									}}
								/>
							))}
						</div>
						<form
							onSubmit={handleSubmit(handleAddTag)}
							className="flex gap-2 items-center"
						>
							<Input
								{...register("newTag")}
								placeholder="タグを追加 (15文字以内)"
								className="w-52"
							/>
							{errors.newTag && (
								<p className="text-red-500 text-xs">{errors.newTag.message}</p>
							)}
							<Button type="submit">追加</Button>
						</form>
						<DropdownMenuSeparator className="my-2" />
						<Link
							to="/settings/tags"
							className="text-sm text-gray-500 hover:underline cursor-pointer"
						>
							タグを編集する →
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>

				{selectedOptions.length === 0 && (
					<p className="text-red-500 text-xs mt-1">
						少なくとも1つのタグを選択してください
					</p>
				)}
			</div>
		</div>
	);
};

export default MultiSelect;
