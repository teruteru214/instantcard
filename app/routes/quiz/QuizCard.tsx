import Speech from "~/components/global/Speech";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import CollocationModal from "./CollocationModal";
import ImageModal from "./ImageModal";

interface QuizProps {
	quiz: {
		id: number;
		word: string;
		translation: string;
	};
	options: string[];
	index: number;
	scrollToNext: () => void;
}

const QuizCard = ({ quiz, options, index, scrollToNext }: QuizProps) => {
	return (
		<Card id={`quiz-card-${index}`} className="p-5">
			<div className="flex flex-col space-y-4">
				<h1 className="text-2xl font-bold">{quiz.word}</h1>
				<div className="flex justify-between items-center">
					<p>正しい答えを選んでください</p>
					<Speech word={quiz.word} size={20} />
				</div>
				<FormField
					name={`answers.${index}`}
					render={({ field }) => (
						<FormItem>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								{options.map((option) => (
									<FormControl key={option}>
										<Button
											type="button"
											variant={field.value === option ? "black" : "white"}
											size="giant"
											onClick={() => field.onChange(option)}
											aria-label={`選択肢: ${option}`}
											aria-pressed={field.value === option}
										>
											{option}
										</Button>
									</FormControl>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between items-center">
					<div className="space-x-2 flex items-center">
						<p className="text-xs sm:text-base">頻度:</p>
						<Badge variant="destructive">🥇目から鱗</Badge>
					</div>
					<div>
						<ImageModal />
						<CollocationModal />
					</div>
					<span
						className="text-xs sm:text-base text-gray-400 hover:text-gray-500 hover:underline cursor-pointer"
						onClick={scrollToNext}
						onKeyUp={(e) => {
							if (e.key === "Enter" || e.key === "Space") {
								e.preventDefault();
								scrollToNext();
							}
						}}
					>
						スキップする？
					</span>
				</div>
			</div>
		</Card>
	);
};

export default QuizCard;
