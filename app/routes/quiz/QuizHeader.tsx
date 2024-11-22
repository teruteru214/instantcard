import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { scrollToResult } from "~/utils/quiz";

interface QuizHeaderProps {
	isSaveEnabled: boolean;
	currentAnswerCount: number;
	totalQuizCount: number;
	isFinished: boolean; // 終了状態を受け取る
}

const QuizHeader = ({
	isSaveEnabled,
	currentAnswerCount,
	totalQuizCount,
	isFinished,
}: QuizHeaderProps) => {
	return (
		<div className="sticky top-0 left-0 right-0 z-50 bg-white py-3 flex items-center justify-between">
			<p>
				{currentAnswerCount}/{totalQuizCount}
			</p>
			<Button
				type="submit"
				variant="black"
				size="default"
				disabled={!isSaveEnabled || isFinished}
				onClick={() => {
					scrollToResult();
				}}
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
		</div>
	);
};

export default QuizHeader;
