import { GitCompare } from "lucide-react";
import Speech from "~/components/global/Speech";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "~/components/ui/dialog";

const AntonymsModal = ({ word }: { word: string }) => {
	const collocations = [
		{ text: "example 1" },
		{ text: "example 2" },
		{ text: "example 3" },
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon" type="button">
					<GitCompare />
				</Button>
			</DialogTrigger>
			<DialogContent aria-labelledby="collocation-modal-title">
				<h1 id="collocation-modal-title" className="text-xl text-center">
					{word} の対義語
				</h1>
				<div>
					{collocations.map((collocation) => (
						<div
							key={collocation.text}
							className="flex justify-center items-center"
						>
							<p>{collocation.text}</p>
							<Speech word={collocation.text} size={20} />
						</div>
					))}
				</div>
				<DialogClose>
					<Button
						size="giant"
						variant="secondary"
						aria-label="キャンセル"
						className="w-full"
					>
						キャンセル
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default AntonymsModal;
