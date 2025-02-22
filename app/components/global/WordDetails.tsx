import { Link } from "@remix-run/react";
import { Image, Pencil } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet";
import Speech from "./Speech";
import WordAccordions from "./WordAccordions";

interface WordDetailsProps {
	triggerElement: React.ReactNode;
	word: string;
}

const WordDetails = ({ triggerElement, word }: WordDetailsProps) => {
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{triggerElement}</SheetTrigger>
			<SheetContent className="flex flex-col h-full" aria-label="単語の詳細">
				<SheetHeader>
					<div className="flex justify-between">
						<Button variant="ghost" size="sm">
							<Link to={`/cards/${word}`} className="flex items-center">
								<Pencil className="sm:-mr-1" />
								<span className="ml-1 hidden sm:inline">カードを編集する</span>
							</Link>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => scrollToSection("image-section")}
						>
							<Image className="sm:-mr-1.5" />
							<span className="hidden sm:inline">画像を編集する</span>
						</Button>
					</div>
					<div className="ml-3 flex">
						<SheetTitle>{word}</SheetTitle>
						<Speech word={word} size={20} aria-label="クリックして発音を聞く" />
					</div>
				</SheetHeader>
				<WordAccordions />
			</SheetContent>
		</Sheet>
	);
};

export default WordDetails;
