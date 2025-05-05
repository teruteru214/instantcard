import { Bot, CheckSquare, Square } from "lucide-react";
import {} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { aiOptions } from "../config/aiOptions";

interface AiSettingsProps {
	value: string[];
	onChange: (value: string[]) => void;
	triggerElement?: React.ReactNode;
}

const AiSettings = ({ value, onChange, triggerElement }: AiSettingsProps) => {
	const isAllSelected = value.length === aiOptions.length;

	const toggleAllOptions = () => {
		onChange(isAllSelected ? [] : [...aiOptions]);
	};

	const toggleAiOption = (optionLabel: string, checked: boolean) => {
		if (checked) {
			onChange([...value, optionLabel]);
		} else {
			onChange(value.filter((opt) => opt !== optionLabel));
		}
	};

	const buttonLabel = isAllSelected ? "全て解除" : "全て選択";
	const buttonVariant = isAllSelected ? "outline" : "black";
	const buttonIcon = isAllSelected ? (
		<Square className="mr-2" />
	) : (
		<CheckSquare className="mr-2" />
	);

	const defaultTrigger = (
		<button
			type="button"
			className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-gray-500 gap-1 rounded-full hover:bg-gray-100"
		>
			<Bot className="w-4 h-4" />
			<span className="hidden sm:block">AIで出力</span>
		</button>
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{triggerElement || defaultTrigger}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2">
				<DropdownMenuLabel>AIで生成する項目</DropdownMenuLabel>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
					{aiOptions.map((option) => (
						<LabeledCheckbox
							key={option}
							label={option}
							checked={value.includes(option)}
							onCheckedChange={(checked: boolean) =>
								toggleAiOption(option, checked)
							}
						/>
					))}
				</div>
				<p className="text-xs text-gray-500 my-4">
					AIの生成速度は、選択した項目が少ないほど速く、多いほど時間がかかります。
				</p>
				<div className="flex justify-between">
					<Button
						variant={buttonVariant}
						onClick={toggleAllOptions}
						aria-label={`AIの出力設定を${buttonLabel}する`}
						type="button"
					>
						{buttonIcon}
						{buttonLabel}
					</Button>
					<Button variant="black" aria-label="AIを出力する" type="button">
						出力する
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AiSettings;
