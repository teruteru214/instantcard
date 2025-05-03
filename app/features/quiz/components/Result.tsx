import { useNavigate } from "@remix-run/react";
import { Book, Circle, X } from "lucide-react";
import { useEffect, useState } from "react";
import WordDetails from "~/components/global/WordDetails";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { getBadgeVariant } from "../utils";

interface ResultProps {
	result: {
		word: string;
		correctAnswer: string;
		isCorrect: boolean;
	}[];
}

const Result = ({ result }: ResultProps) => {
	const navigate = useNavigate();
	const correctCount = result.filter((item) => item.isCorrect).length;
	const percentage = Math.round((correctCount / result.length) * 100);
	const [isDiscardMode, setIsDiscardMode] = useState(false);

	const [animatedValue, setAnimatedValue] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAnimatedValue(percentage);
		}, 50);

		return () => clearTimeout(timeout);
	}, [percentage]);

	const { variant, emoji } = getBadgeVariant(correctCount, result.length);

	const handleInputToggle = () => {
		setIsDiscardMode(!isDiscardMode);
	};

	return (
		<div className="my-7 space-y-4">
			<h2 id="result" className="text-2xl text-center">
				スコア
			</h2>
			<Progress value={animatedValue} />

			<div className="flex items-center gap-2">
				<p className="text-lg font-semibold">正答率</p>
				<Badge variant={variant} size="sm">
					{emoji} {percentage} %
				</Badge>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-3/12 sm:w-1/12">正否</TableHead>
						<TableHead>英単語・フレーズ</TableHead>
						<TableHead>正解</TableHead>
						<TableHead className="w-3/12 sm:w-1/12 text-center">辞書</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{result.map((item) => (
						<WordDetails
							key={item.word}
							word={item.word}
							triggerElement={
								<TableRow className="cursor-pointer hover:bg-gray-100">
									<TableCell className="text-center">
										{item.isCorrect ? (
											<Circle className="text-green-400" />
										) : (
											<X className="text-red-400" />
										)}
									</TableCell>
									<TableCell className="cursor-pointer truncate">
										<span
											className="block overflow-hidden text-ellipsis whitespace-nowrap"
											title={item.word}
										>
											{item.word}
										</span>
									</TableCell>
									<TableCell>{item.correctAnswer}</TableCell>
									<TableCell className="text-center p-0 w-12">
										<div className="flex justify-center items-center h-full">
											<Book className="w-4 h-4 text-gray-400 hover:text-gray-500" />
										</div>
									</TableCell>
								</TableRow>
							}
						/>
					))}
				</TableBody>
			</Table>

			<div className="flex flex-col items-center space-y-4 mt-4">
				<Button className="w-64" size="giant" onClick={() => navigate(0)}>
					再チャレンジ
				</Button>
				<Button
					className="w-64"
					size="giant"
					variant={isDiscardMode ? "destructive" : "default"}
					onClick={handleInputToggle}
				>
					{isDiscardMode ? "破棄モードを解除" : "正解したカードを捨てる"}
				</Button>
			</div>
		</div>
	);
};

export default Result;
