import { ArrowRight, Pencil } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Sheet,
	SheetClose,
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
	return (
		<Sheet>
			<SheetTrigger asChild>{triggerElement}</SheetTrigger>
			<SheetContent className="flex flex-col h-full" aria-label="単語の詳細">
				<SheetHeader>
					<div className="flex justify-between">
						<Button variant="ghost" size="sm">
							<Pencil className="-mr-2" />
							カードを編集する
						</Button>
						<SheetClose className="hidden sm:block">
							<Button variant="ghost" size="sm">
								閉じる
								<ArrowRight className="h-7 w-7" />
							</Button>
						</SheetClose>
					</div>
					<div className="ml-3 flex">
						<SheetTitle>{word}</SheetTitle>
						<Speech word={word} size={24} aria-label="クリックして発音を聞く" />
					</div>
				</SheetHeader>
				<WordAccordions />
			</SheetContent>
		</Sheet>
	);
};

export default WordDetails;
