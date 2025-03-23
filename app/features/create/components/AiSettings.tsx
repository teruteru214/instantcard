import { CheckSquare, Square } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import { aiOptions } from "../config/aiOptions";

interface AiSettingsProps {
	value: string[];
	onChange: (value: string[]) => void;
}

const AiSettings = ({ value, onChange }: AiSettingsProps) => {
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

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="ai-settings">
				<AccordionTrigger type="button" className="text-sm font-[roboto]">
					AIの出力設定
				</AccordionTrigger>
				<AccordionContent>
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
					<Button
						variant={buttonVariant}
						onClick={toggleAllOptions}
						aria-label={`AIの出力設定を${buttonLabel}する`}
						type="button"
					>
						{buttonIcon}
						{buttonLabel}
					</Button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default AiSettings;
