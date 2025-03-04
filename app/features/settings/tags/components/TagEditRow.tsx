import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { TableCell, TableRow } from "~/components/ui/table";
import type { Tag } from "../types/tag";
import DeleteModal from "./DeleteModal";

interface TagEditRowProps {
	tag: Tag;
}

const tagSchema = z.object({
	name: z
		.string()
		.min(1, "1文字以上入力してください")
		.max(15, "15文字以内で入力してください"),
});

const TagEditRow = ({ tag: initialTag }: TagEditRowProps) => {
	const [tag, setTag] = useState<Tag>(initialTag);
	const [isEditing, setIsEditing] = useState(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<{ name: string }>({
		resolver: zodResolver(tagSchema),
		defaultValues: { name: tag.name },
		mode: "onChange",
	});

	const handleSave = (data: { name: string }) => {
		const updatedTag = { ...tag, name: data.name };
		setTag(updatedTag);

		console.log("保存されたタグ:", updatedTag);

		setIsEditing(false);
	};

	const handleCancel = () => {
		reset();
		setIsEditing(false);
	};

	const startEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	const { ref, ...registerRest } = register("name");

	const setRefs = (element: HTMLInputElement | null) => {
		ref(element);
		inputRef.current = element;
	};

	return (
		<TableRow key={tag.id}>
			<TableCell>
				<div className="flex items-center gap-2 w-full">
					{isEditing ? (
						<div className="flex-grow min-w-0">
							<Input
								type="text"
								{...registerRest}
								ref={setRefs}
								className="border rounded px-2 py-1 w-full"
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name.message}
								</p>
							)}
						</div>
					) : (
						<div className="flex flex-col flex-grow min-w-0">
							<span className="font-medium">{tag.name}</span>
							<span className="text-sm text-gray-500">
								{tag.count}枚のカード
							</span>
						</div>
					)}

					<div className="flex items-center gap-2 flex-shrink-0">
						{isEditing ? (
							<>
								<Button
									size="sm"
									variant="black"
									onClick={handleSubmit(handleSave)}
									disabled={!isValid || !isDirty}
								>
									<span className="hidden sm:inline">保存する</span>
									<span className="sm:hidden">保存</span>
								</Button>
								<button
									type="button"
									onClick={handleCancel}
									className="text-gray-500 hover:text-gray-800 border-b border-dashed border-gray-400 hover:border-gray-800 focus:outline-none px-1 w-fit flex-shrink-0 whitespace-nowrap"
								>
									キャンセル
								</button>
							</>
						) : (
							<>
								<Button size="sm" variant="outline" onClick={startEditing}>
									<span className="hidden sm:inline">編集する</span>
									<span className="sm:hidden">編集</span>
								</Button>
								<DeleteModal
									tag_name={tag.name}
									tag_count={tag.count}
									triggerElement={
										<Button size="sm" variant="secondary">
											<span className="hidden sm:inline">削除する</span>
											<span className="sm:hidden">削除</span>
										</Button>
									}
								/>
							</>
						)}
					</div>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default TagEditRow;
