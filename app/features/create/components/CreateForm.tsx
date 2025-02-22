import { useState } from "react";
import AiSettings from "./AiSettings";
import MultiSelect from "./MultiSelect";
import WordForm from "./WordForm";

interface CreateFormProps {
	tags: string[];
}

// ✅ booleanを持たせた aiOptions
const aiOptions = [
	{ label: "意味", checked: true },
	{ label: "発音のコツ", checked: true },
	{ label: "例文", checked: true },
	{ label: "コロケーション", checked: true },
	{ label: "TOEICでの使用頻度", checked: true },
	{ label: "TOEICでの出題傾向", checked: true },
	{ label: "派生語", checked: true },
	{ label: "類義語", checked: true },
	{ label: "句動詞", checked: true },
	{ label: "関連語", checked: true },
	{ label: "対義語", checked: true },
	{ label: "文法の種類", checked: true },
	{ label: "語源", checked: false },
	{ label: "その他(重要事項)", checked: false },
];

const CreateForm = ({ tags }: CreateFormProps) => {
	// ✅ `Global` タグを追加して初期オプションを作成
	const initialOptions = [
		{ label: "Global" },
		...tags.map((tag) => ({ label: tag })),
	];

	// ✅ タグのリストを管理
	const [options, setOptions] = useState(initialOptions);

	// ✅ `Global` タグを最初から選択状態にする
	const [selectedTags, setSelectedTags] = useState<string[]>(["Global"]);

	// ✅ AI出力設定の管理
	const [selectedAiOutputs, setSelectedAiOutputs] = useState(aiOptions);

	return (
		<WordForm
			selectedTags={selectedTags}
			selectedAiOutputs={
				selectedAiOutputs
					.filter((opt) => opt.checked) // ✅ チェックされているものだけ取得
					.map((opt) => opt.label) // ✅ ラベルだけを取得
			}
		>
			{/* ✅ MultiSelect タグ選択 */}
			<MultiSelect
				options={options}
				setOptions={setOptions} // 🔥 追加したタグを CreateForm に反映
				selectedOptions={selectedTags}
				setSelectedOptions={setSelectedTags}
				placeholder="タグを選択してください"
			/>

			{/* ✅ AI出力設定 */}
			<AiSettings
				selectedAiOutputs={selectedAiOutputs}
				setSelectedAiOutputs={setSelectedAiOutputs}
			/>
		</WordForm>
	);
};

export default CreateForm;
