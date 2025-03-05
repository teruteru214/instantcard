import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const user = {
	name: "tarou",
};

const schema = z.object({
	confirmation: z.literal(user.name, {
		errorMap: () => ({ message: `"${user.name}" と入力してください` }),
	}),
});

type FormValues = z.infer<typeof schema>;

const DeletionForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { confirmation: "" },
	});

	const { control, handleSubmit, watch } = form;

	const confirmationValue = watch("confirmation");

	const onSubmit = (data: FormValues) => {
		console.log("アカウント削除", data);
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<p className="text-gray-500">
					確認のため、以下の入力欄に {user.name}
					と入力したうえで「アカウントを削除」ボタンを押してください
				</p>

				<FormField
					control={control}
					name="confirmation"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder={user.name} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					variant="destructive"
					type="submit"
					disabled={confirmationValue !== user.name}
				>
					アカウントを削除
				</Button>
			</form>
		</Form>
	);
};

export default DeletionForm;
