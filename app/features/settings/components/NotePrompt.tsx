import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { NotePromptSchema } from "../schema/note_prompt";

interface NotePromptProps {
	note_prompt: string;
}

const NotePrompt = ({ note_prompt: initialPrompt }: NotePromptProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [displayPrompt, setDisplayPrompt] = useState(initialPrompt);
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<{ note_prompt: string }>({
		resolver: zodResolver(NotePromptSchema),
		defaultValues: { note_prompt: displayPrompt },
	});

	const onSubmit = (data: { note_prompt: string }) => {
		console.log("保存するデータ:", data);
		setDisplayPrompt(data.note_prompt);
		setIsEditing(false);
	};

	const startEditing = () => {
		setIsEditing(true);
	};

	const { ref, ...registerRest } = register("note_prompt");

	return (
		<div className="rounded-lg border border-gray-200 p-6">
			<div className="space-y-4">
				<h2 className="text-base font-medium">ノートのカスタマイズ</h2>
				{isEditing ? (
					<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
						<div className="w-full">
							<Textarea
								placeholder="ノートに出力する内容を設定する"
								{...registerRest}
								ref={(element) => {
									ref(element);
									if (element) {
										inputRef.current = element;
									}
								}}
								className="border rounded-lg py-2.5 px-3 w-full"
							/>
							{errors.note_prompt && (
								<p className="text-red-500 text-sm mt-1">
									{errors.note_prompt.message?.toString()}
								</p>
							)}
						</div>
						<div className="mt-6 flex justify-end gap-2">
							<Button
								variant="ghost"
								type="button"
								onClick={() => {
									setIsEditing(false);
									setValue("note_prompt", displayPrompt);
								}}
								className="text-gray-400 hover:text-gray-500"
								aria-label="プロンプトの編集をキャンセル"
							>
								キャンセル
							</Button>
							<Button
								variant="default"
								type="submit"
								aria-label="変更したプロンプトを保存"
							>
								保存する
							</Button>
						</div>
					</form>
				) : (
					<>
						<p className="text-gray-500 mt-2">
							英単語作成時に、AIが生成する学習ノート内の表示形式をあなた自身がカスタマイズできます。例文や語源情報など、AIに作成させたい情報を自由に設定できます。
						</p>
						<Button variant="outline" onClick={startEditing} className="mt-4">
							変更する
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default NotePrompt;
