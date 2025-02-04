import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { scrollToResult } from "../utils";

interface QuizHeaderProps {
	isSaveEnabled: boolean;
	currentAnswerCount: number;
	totalQuizCount: number;
	isFinished: boolean;
}

const QuizHeader = ({
	isSaveEnabled,
	currentAnswerCount,
	totalQuizCount,
	isFinished,
}: QuizHeaderProps) => {
	return (
		<header className="sticky top-0 left-0 right-0 z-50 bg-white py-3 flex items-center justify-between">
			<output
				aria-label={`全${totalQuizCount}問中${currentAnswerCount}問回答済み`}
			>
				{currentAnswerCount}/{totalQuizCount}
			</output>
			<Button
				type="submit"
				variant="black"
				size="default"
				disabled={!isSaveEnabled || isFinished}
				onClick={() => {
					scrollToResult();
				}}
				aria-label={
					isFinished
						? "クイズは既に完了しています"
						: "クイズを終了して結果を確認する"
				}
			>
				{isFinished ? (
					<>
						<Check className="text-white" />
						解答済み
					</>
				) : (
					"クイズを終了する"
				)}
			</Button>
		</header>
	);
};

export default QuizHeader;
