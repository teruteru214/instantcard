import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";

import { defaultAiOptions } from "../config/aiOptions";
import { type FormData, formSchema } from "../schema/cardFormSchema";
import AiSettings from "./AiSettings";
import MultiSelect from "./MultiSelect";
import SuggestInput from "./SuggestInput";

interface CardFormProps {
	availableTags: string[];
}

const CardForm = ({ availableTags }: CardFormProps) => {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			word: "",
			tags: ["Global"],
			aiOutputs: defaultAiOptions,
		},
	});

	const { handleSubmit, formState, watch } = form;

	const selectedTags = watch("tags");
	const selectedAiOptions = watch("aiOutputs");
	const isValid =
		formState.isValid &&
		selectedTags.length > 0 &&
		selectedAiOptions.length > 0;

	const onSubmit = (data: FormData) => {
		console.log("送信データ:", data);
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
							<Label indispensable>英単語</Label>
							<FormControl>
								<SuggestInput field={field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<Label indispensable>タグの付与</Label>
							<FormControl>
								<MultiSelect
									availableTags={availableTags}
									value={field.value}
									onChange={field.onChange}
									placeholder="タグを選択してください"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="aiOutputs"
					render={({ field }) => (
						<FormItem>
							<AiSettings value={field.value} onChange={field.onChange} />
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end">
					<Button variant="black" size="lg" type="submit" disabled={!isValid}>
						カードを作成
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default CardForm;
