import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@remix-run/react";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import type { TagOption } from "../types";

interface MultiSelectProps {
	options: TagOption[];
	setOptions: (options: TagOption[]) => void;
	selectedOptions: TagOption[];
	setSelectedOptions: (values: TagOption[]) => void;
	placeholder?: string;
}

const tagsSchema = z.object({
	newTag: z
		.string()
		.min(1, { message: "タグを入力してください" })
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
	const [isOpen, setIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		watch,
		formState: { errors, isValid },
	} = useForm<TagsFormData>({
		resolver: zodResolver(tagsSchema),
		mode: "onChange",
		defaultValues: {
			newTag: "",
		},
	});

	const newTag = watch("newTag");

	const handleAddTag = () => {
		const formattedNewTag = newTag.trim();
		if (!formattedNewTag) {
			setError("newTag", { message: "タグを入力してください" });
			setTimeout(() => clearErrors("newTag"), 3000);
			return;
		}

		if (
			options.some(
				(tag) => tag.label.toLowerCase() === formattedNewTag.toLowerCase(),
			)
		) {
			setError("newTag", { message: "このタグはすでに存在します" });
			setTimeout(() => clearErrors("newTag"), 3000);
			return;
		}

		const newTagObject: TagOption = { label: formattedNewTag };

		setOptions([...options, newTagObject]);
		setSelectedOptions([...selectedOptions, newTagObject]);

		setValue("newTag", "");
		clearErrors("newTag");
	};

	return (
		<div>
			<div>
				<Label indispensable>タグの付与</Label>
				<DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
					<DropdownMenuTrigger asChild>
						<div className="relative cursor-pointer">
							<Input
								id="multi-select"
								readOnly
								data-testid="multi-select-input"
								className={cn(
									"h-11 w-full overflow-x-auto pointer-events-none",
									"hover:border-gray-500 transition-colors duration-200",
									isOpen && "border-gray-500",
								)}
								placeholder={selectedOptions.length > 0 ? "" : placeholder}
							/>
							<div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-wrap gap-2">
								{selectedOptions.map((selectedTag) => (
									<Badge key={selectedTag.label} variant="outline" size="sm">
										{selectedTag.label}
									</Badge>
								))}
							</div>
							<ChevronsUpDown
								className={cn(
									"absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 shrink-0",
									"transition-opacity duration-200",
									isOpen ? "opacity-100" : "opacity-50",
								)}
							/>
						</div>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-80 p-2">
						<div className="space-y-2">
							{options.map((option) => (
								<LabeledCheckbox
									key={option.label}
									label={option.label}
									checked={selectedOptions.some(
										(tag) => tag.label === option.label,
									)}
									onCheckedChange={(checked) => {
										setSelectedOptions(
											checked
												? [...selectedOptions, option]
												: selectedOptions.filter(
														(tag) => tag.label !== option.label,
													),
										);
									}}
								/>
							))}
						</div>
						<form className="my-2 flex gap-2 items-center">
							<Input
								{...register("newTag")}
								placeholder="タグを追加 (15文字以内)"
								className="w-52"
							/>
							<Button
								type="button"
								onClick={() => handleSubmit(handleAddTag)()}
								disabled={
									!isValid ||
									options.some(
										(tag) => tag.label.toLowerCase() === newTag.toLowerCase(),
									)
								}
							>
								追加
							</Button>
						</form>
						{errors.newTag && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.newTag.message}
							</p>
						)}

						{(options.length > 1 ||
							(options.length === 1 &&
								options[0].label.toLowerCase() !== "global")) && (
							<Link
								to="/settings/tags"
								className="text-sm text-gray-500 hover:underline"
							>
								タグを編集する →
							</Link>
						)}
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
