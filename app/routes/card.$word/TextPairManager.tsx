import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface TextPair {
	id: string;
	text: string;
	meaning: string;
}

interface TextPairManagerProps {
	addButtonLabel: string;
	value: TextPair[];
	onChange: (newValue: TextPair[]) => void;
	maxItems?: number;
	textPlaceholder?: string;
	meaningPlaceholder?: string;
}

const TextPairManager = ({
	addButtonLabel,
	value,
	onChange,
	maxItems = 5,
	textPlaceholder = "英文",
	meaningPlaceholder = "意味",
}: TextPairManagerProps) => {
	const handleAdd = () => {
		if (value.length < maxItems) {
			const newItems = [
				...value,
				{ id: Math.random().toString(36).substr(2, 9), text: "", meaning: "" },
			];
			onChange(newItems);
		}
	};

	const handleRemove = (id: string) => {
		const newItems = value.filter((item) => item.id !== id);
		onChange(newItems);
	};

	const handleUpdate = (
		id: string,
		field: "text" | "meaning",
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
										value={item.meaning}
										onChange={(e) =>
											handleUpdate(item.id, "meaning", e.target.value)
										}
										placeholder={meaningPlaceholder}
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
