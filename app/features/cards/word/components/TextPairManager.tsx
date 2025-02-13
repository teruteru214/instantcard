import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface TextPair {
	id: number;
	text: string;
	translation: string;
}

interface TextPairManagerProps {
	addButtonLabel: string;
	value: TextPair[];
	onChange: (newValue: TextPair[]) => void;
	maxItems?: number;
	textPlaceholder?: string;
	translationPlaceholder?: string;
}

const TextPairManager = ({
	addButtonLabel,
	value,
	onChange,
	maxItems = 5,
	textPlaceholder = "英文",
	translationPlaceholder = "直訳",
}: TextPairManagerProps) => {
	const handleAdd = () => {
		if (value.length < maxItems) {
			const newItems = [
				...value,
				{
					id: Date.now(), //idについては保存する際に渡さないようにする
					text: "",
					translation: "",
				},
			];
			onChange(newItems);
		}
	};

	const handleRemove = (id: number) => {
		const newItems = value.filter((item) => item.id !== id);
		onChange(newItems);
	};

	const handleUpdate = (
		id: number,
		field: "text" | "translation",
		newValue: string,
	) => {
		const newItems = value.map((item) =>
			item.id === id ? { ...item, [field]: newValue } : item,
		);
		onChange(newItems);
	};

	return (
		<div className="bg-gray-100 p-3 rounded-md space-y-2">
			{value.map((item, index) => (
				<div key={item.id}>
					<div className="flex items-start gap-2 w-full">
						<div className="flex-1 space-y-2">
							<div className="flex items-center gap-1">
								<span className="text-sm font-medium whitespace-nowrap">
									英文:
								</span>
								<div className="w-full">
									<Input
										value={item.text}
										onChange={(e) =>
											handleUpdate(item.id, "text", e.target.value)
										}
										placeholder={textPlaceholder}
									/>
								</div>
							</div>

							<div className="flex items-center gap-1">
								<span className="text-sm font-medium whitespace-nowrap">
									意味:
								</span>
								<div className="w-full">
									<Input
										value={item.translation}
										onChange={(e) =>
											handleUpdate(item.id, "translation", e.target.value)
										}
										placeholder={translationPlaceholder}
									/>
								</div>
							</div>
						</div>

						<Button
							type="button"
							variant="destructive"
							size="icon"
							className="h-[88px]"
							onClick={() => handleRemove(item.id)}
						>
							<Trash2 />
						</Button>
					</div>

					{index < value.length - 1 && <hr className="my-3 border-gray-300" />}
				</div>
			))}

			<div className="flex justify-center">
				<Button
					type="button"
					variant="highlight"
					onClick={handleAdd}
					disabled={value.length >= maxItems}
					className="w-64"
				>
					{addButtonLabel}
				</Button>
			</div>
		</div>
	);
};

export default TextPairManager;
