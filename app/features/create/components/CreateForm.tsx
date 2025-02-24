import { useMemo, useState } from "react";
import { aiOptions } from "../config/ai-options";
import type { TagOption } from "../types";
import AiSettings from "./AiSettings";
import MultiSelect from "./MultiSelect";
import WordForm from "./WordForm";

interface CreateFormProps {
	tags: string[];
}

interface AiOption {
	label: string;
	checked: boolean;
}

const CreateForm = ({ tags }: CreateFormProps) => {
	const [options, setOptions] = useState<TagOption[]>([
		{ label: "Global" },
		...tags.map((tag) => ({ label: tag })),
	]);

	const [selectedTags, setSelectedTags] = useState<TagOption[]>([
		{ label: "Global" },
	]);

	const [selectedAiOutputs, setSelectedAiOutputs] =
		useState<AiOption[]>(aiOptions);

	const filteredAiOutputs = useMemo(
		() =>
			selectedAiOutputs.filter((opt) => opt.checked).map((opt) => opt.label),
		[selectedAiOutputs],
	);

	return (
		<WordForm
			selectedTags={selectedTags.map((tag) => tag.label)} // `string[]` に変換
			selectedAiOutputs={filteredAiOutputs}
		>
			<MultiSelect
				options={options}
				setOptions={setOptions}
				selectedOptions={selectedTags}
				setSelectedOptions={setSelectedTags}
				placeholder="タグを選択してください"
			/>

			<AiSettings
				selectedAiOutputs={selectedAiOutputs}
				setSelectedAiOutputs={setSelectedAiOutputs}
			/>
		</WordForm>
	);
};

export default CreateForm;
