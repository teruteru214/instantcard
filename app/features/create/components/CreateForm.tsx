import { useState } from "react";
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
	const [options, setOptions] = useState<TagOption[]>(
		tags.map((tag) => ({ label: tag })),
	);

	const [selectedTags, setSelectedTags] = useState<TagOption[]>(
		tags.includes("Global") ? [{ label: "Global" }] : [],
	);

	const [selectedAiOutputs, setSelectedAiOutputs] =
		useState<AiOption[]>(aiOptions);

	return (
		<WordForm
			selectedTags={selectedTags.map((tag) => tag.label)}
			selectedAiOutputs={selectedAiOutputs
				.filter((opt) => opt.checked)
				.map((opt) => opt.label)}
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
