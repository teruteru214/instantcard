import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils"; // ✅ `cn` を使用してクラスの条件分岐をシンプルに

interface MultiSelectProps {
	availableTags: string[];
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
}

const MultiSelect = ({
	availableTags,
	value,
	onChange,
	placeholder = "選択してください",
}: MultiSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleTagSelection = (tag: string, isSelected: boolean) => {
		if (isSelected) {
			onChange([...value, tag]);
		} else {
			onChange(value.filter((t) => t !== tag));
		}
	};

	return (
		<div>
			<DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
				<DropdownMenuTrigger asChild>
					<div className="relative cursor-pointer">
						<Input
							id="multi-select"
							readOnly
							data-testid="multi-select-input"
							className={cn(
								"h-10 w-full pointer-events-none border transition-colors",
								isOpen ? "border-gray-500" : "border-gray-300",
							)}
							placeholder={value.length > 0 ? "" : placeholder}
						/>
						<div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-wrap gap-2">
							{value.map((selectedTag) => (
								<Badge key={selectedTag} variant="outline" size="sm">
									{selectedTag}
								</Badge>
							))}
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-80 p-3">
					<div className="space-y-2">
						{availableTags.map((tag) => (
							<LabeledCheckbox
								key={tag}
								label={tag}
								checked={value.includes(tag)}
								onCheckedChange={(checked: boolean) =>
									toggleTagSelection(tag, checked)
								}
							/>
						))}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default MultiSelect;
