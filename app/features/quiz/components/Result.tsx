import { useNavigate } from "@remix-run/react";
import { Circle, X } from "lucide-react";
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
		userAnswer: string;
		isCorrect: boolean;
	}[];
}

const Result = ({ result }: ResultProps) => {
	const navigate = useNavigate();
	const correctCount = result.filter((item) => item.isCorrect).length;
	const percentage = Math.round((correctCount / result.length) * 100);

	const [animatedValue, setAnimatedValue] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAnimatedValue(percentage);
		}, 50);

		return () => clearTimeout(timeout);
	}, [percentage]);

	const { variant, emoji } = getBadgeVariant(correctCount, result.length);
	return (
		<div className="mt-20 mb-7 space-y-4">
			<h2 id="result" className="text-2xl text-center">
				結果発表
			</h2>
			<Progress value={animatedValue} />

			<div className="flex items-center gap-2">
				<p className="text-lg font-semibold">正答率:</p>
				<Badge variant={variant} size="sm">
					{emoji} {percentage} %
				</Badge>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>英単語</TableHead>
						<TableHead>正解</TableHead>
						<TableHead>あなたの答え</TableHead>
						<TableHead>正否</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{result.map((item) => (
						<TableRow key={item.word}>
							<WordDetails
								triggerElement={
									<TableCell className="hover:underline cursor-pointer">
										{item.word}
									</TableCell>
								}
								word={item.word}
							/>
							<TableCell>{item.correctAnswer}</TableCell>
							<TableCell className={!item.isCorrect ? "text-red-500" : ""}>
								{item.userAnswer}
							</TableCell>

							<TableCell>
								{item.isCorrect ? (
									<Circle className="text-green-400" />
								) : (
									<X className="text-red-400" />
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="flex flex-col items-center space-y-4 mt-4">
				<Button className="w-64" size="giant" onClick={() => navigate(0)}>
					再チャレンジ
				</Button>
				<Button className="w-64" size="giant">
					正解したカードを捨てる
				</Button>
			</div>
		</div>
	);
};

export default Result;
