import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import SuggestInput from "./SuggestInput";

interface WordFormProps {
	selectedTags: string[];
	selectedAiOutputs: string[];
	children: React.ReactNode;
}

const formSchema = z.object({
	word: z
		.string()
		.min(1, { message: "英単語を入力してください" })
		.max(50, { message: "50文字以内で入力してください" })
		.regex(/^[a-zA-Z\s-]+$/, { message: "英単語は半角英字のみ使用可能です" })
		.trim(),
});

type FormData = z.infer<typeof formSchema>;

const WordForm = ({
	selectedTags,
	selectedAiOutputs,
	children,
}: WordFormProps) => {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			word: "",
		},
	});

	const { handleSubmit, formState } = form;
	const isValid = formState.isValid && selectedTags.length > 0; // 🔥 タグが1つ以上ないと送信できない

	const onSubmit = (data: FormData) => {
		console.log("送信データ:", data); // ✅ react-hook-form のデータ
		console.log("選択したタグ:", selectedTags); // ✅ useState のデータ
		console.log("選択したAI設定:", selectedAiOutputs); // ✅ useState のデータ
	};

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 max-w-2xl mx-auto"
			>
				<FormField
					control={form.control}
					name="word"
					render={({ field }) => (
						<FormItem>
							<FormLabel>英単語</FormLabel>
							<FormControl>
								<SuggestInput field={field} maxLength={50} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{children}

				<div className="flex justify-end">
					<Button variant="black" type="submit" disabled={!isValid}>
						カードを作成
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default WordForm;
