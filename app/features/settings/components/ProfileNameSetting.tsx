import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const nameSchema = z.object({
	name: z
		.string()
		.min(1, "表示名を入力してください")
		.max(20, "20文字以内で入力してください"),
});

const ProfileNameSetting = ({ name: initialName }: { name: string }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [displayName, setDisplayName] = useState(initialName);
	// 型を明示的に指定して、nullableにする
	const inputRef = useRef<HTMLInputElement | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(nameSchema),
		defaultValues: { name: displayName },
	});

	const onSubmit = (data: { name: string }) => {
		console.log("保存するデータ:", data);
		setDisplayName(data.name);
		setIsEditing(false);
	};

	const startEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	// registerの結果とrefを合成
	const { ref, ...registerRest } = register("name");

	// インラインでrefを処理する方法
	return (
		<div className="rounded-lg border border-gray-200 p-6">
			<div className="space-y-4">
				<h2 className="text-base font-medium">表示名</h2>
				{isEditing ? (
					<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
						<div className="w-full">
							<Input
								placeholder="表示名を入力"
								type="text"
								{...registerRest}
								ref={(element) => {
									// react-hook-form の ref に渡す
									ref(element);
									// 自分の ref に代入
									if (element) {
										inputRef.current = element;
									}
								}}
								className="border rounded-lg py-2.5 px-3 w-full"
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name.message?.toString()}
								</p>
							)}
						</div>
						<div className="mt-6 flex justify-end gap-5">
							<Button
								variant="ghost"
								type="button"
								onClick={() => {
									setIsEditing(false);
									setValue("name", displayName);
								}}
								className="text-gray-400 hover:text-gray-500"
							>
								キャンセル
							</Button>
							<Button variant="default" type="submit">
								保存する
							</Button>
						</div>
					</form>
				) : (
					<>
						<p className="text-gray-500">{displayName}</p>
						<Button variant="outline" onClick={startEditing}>
							変更する
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfileNameSetting;
