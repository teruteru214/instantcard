import { CheckSquare, Square } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";

interface AiOption {
	label: string;
	checked: boolean;
}

interface AiSettingsProps {
	selectedAiOutputs: AiOption[];
	setSelectedAiOutputs: React.Dispatch<React.SetStateAction<AiOption[]>>;
}

const AiSettings = ({
	selectedAiOutputs,
	setSelectedAiOutputs,
}: AiSettingsProps) => {
	const toggleAllOptions = () => {
		const allChecked = selectedAiOutputs.every((opt) => opt.checked); // すべて true か？
		setSelectedAiOutputs(
			selectedAiOutputs.map((opt) => ({ ...opt, checked: !allChecked })),
		);
	};

	const toggleAiOption = (optionLabel: string, checked: boolean) => {
		setSelectedAiOutputs((prev) =>
			prev.map((opt) =>
				opt.label === optionLabel ? { ...opt, checked } : opt,
			),
		);
	};

	const isAllSelected = selectedAiOutputs.every((opt) => opt.checked);
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
				<AccordionTrigger>AIの出力設定</AccordionTrigger>
				<AccordionContent>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
						{selectedAiOutputs.map((option) => (
							<LabeledCheckbox
								key={option.label}
								label={option.label}
								checked={option.checked}
								onCheckedChange={(checked: boolean) =>
									toggleAiOption(option.label, checked)
								}
							/>
						))}
					</div>
					<p className="text-xs text-gray-500 my-4">
						AIの生成速度は、選択した項目が少ないほど速く、多いほど時間がかかります。
					</p>
					<Button variant={buttonVariant} onClick={toggleAllOptions}>
						{buttonIcon}
						{buttonLabel}
					</Button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default AiSettings;
