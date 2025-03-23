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
import { type CardFormData, cardFormSchema } from "../schema/cardFormSchema";
import AiSettings from "./AiSettings";
import MultiSelect from "./MultiSelect";
import SuggestInput from "./SuggestInput";

interface CardFormProps {
	initialTags: { name: string; isChecked: boolean }[];
}

const CardForm = ({ initialTags }: CardFormProps) => {
	const form = useForm<CardFormData>({
		resolver: zodResolver(cardFormSchema),
		defaultValues: {
			word: "",
			tags: initialTags,
			aiOutputs: defaultAiOptions,
		},
	});

	const { handleSubmit, formState, watch, setValue } = form;

	const selectedAiOptions = watch("aiOutputs");

	const isValid = formState.isValid && selectedAiOptions.length > 0;

	const handleTagsChange = (tags: { name: string; isChecked: boolean }[]) => {
		setValue("tags", tags);
	};

	const onSubmit = (data: CardFormData) => {
		const checkedTags = data.tags.filter((tag) => tag.isChecked);

		const submissionData = {
			...data,
			tags: checkedTags,
		};

		console.log("送信データ:", submissionData);
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
							<Label>タグの付与</Label>
							<FormControl>
								<MultiSelect
									availableTags={initialTags}
									value={field.value}
									onChange={handleTagsChange}
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
