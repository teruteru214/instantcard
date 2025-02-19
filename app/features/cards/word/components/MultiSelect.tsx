import { ChevronsUpDown } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";

interface Option {
	value: number;
	label: string;
}

interface MultiSelectProps {
	options: Option[];
	selectedOptions: number[];
	setSelectedOptions: (values: number[]) => void;
	placeholder?: string;
}

const MultiSelect = ({
	options,
	selectedOptions,
	setSelectedOptions,
	placeholder = "選択してください",
}: MultiSelectProps) => {
	const toggleOption = (optionValue: number, checked: boolean) => {
		setSelectedOptions(
			checked
				? [...selectedOptions, optionValue]
				: selectedOptions.filter((item) => item !== optionValue),
		);
	};

	// 表示制限
	const maxDisplayCountSm = 3; // スマホの最大表示数
	const maxDisplayCountMd = 7; // タブレット・PCの最大表示数

	// `Badge` の表示数を制限
	const visibleOptionsSm = selectedOptions.slice(0, maxDisplayCountSm);
	const visibleOptionsMd = selectedOptions.slice(0, maxDisplayCountMd);
	const hiddenCountSm = selectedOptions.length - maxDisplayCountSm;
	const hiddenCountMd = selectedOptions.length - maxDisplayCountMd;

	return (
		<div className="space-y-2">
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
							{/* スマホ用の表示 (3個まで) */}
							{visibleOptionsSm.map((selectedId) => {
								const option = options.find((o) => o.value === selectedId);
								return (
									option && (
										<Badge
											key={option.value}
											variant="outline"
											size="sm"
											className="flex items-center text-xs px-2 py-1 sm:hidden"
										>
											{option.label}
										</Badge>
									)
								);
							})}
							{/* スマホ用の `(+n)` は `md:hidden` で制御し、タブレット以上では消す */}
							{hiddenCountSm > 0 && (
								<Badge
									variant="outline"
									size="sm"
									className="px-2 py-1 sm:block md:hidden"
								>
									.. (+{hiddenCountSm})
								</Badge>
							)}

							{/* タブレット・PC用の表示 (7個まで) */}
							{visibleOptionsMd.map((selectedId, index) => {
								const option = options.find((o) => o.value === selectedId);
								// スマホではすでに表示されているため `sm:hidden` を適用
								return (
									option && (
										<Badge
											key={option.value}
											variant="outline"
											size="sm"
											className={`flex items-center text-xs px-2 py-1 hidden sm:flex ${
												index >= maxDisplayCountMd ? "md:hidden" : ""
											}`}
										>
											{option.label}
										</Badge>
									)
								);
							})}
							{/* タブレット・PC用の `(+n)` は `md:block` で制御し、スマホでは消す */}
							{hiddenCountMd > 0 && (
								<Badge
									variant="outline"
									size="sm"
									className="px-2 py-1 hidden md:block"
								>
									.. (+{hiddenCountMd})
								</Badge>
							)}
						</div>
						<ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 shrink-0 opacity-50" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-full">
					{options.map((option) => (
						<div
							key={option.value}
							className="flex items-center cursor-pointer px-2 py-1.5"
						>
							<LabeledCheckbox
								label={option.label}
								checked={selectedOptions.includes(option.value)}
								onCheckedChange={(checked) => {
									if (typeof checked === "boolean") {
										toggleOption(option.value, checked);
									}
								}}
							/>
						</div>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default MultiSelect;
