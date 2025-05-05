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
import type { WordData } from "~/types/word";
import Speech from "./Speech";
import WordAccordions from "./WordAccordions";

interface WordDetailsProps {
	triggerElement: React.ReactNode;
	word: string;
}

const mockWordData: WordData = {
	translation: "リンゴ",
	meaning:
		"「apple」は単に「りんご」を意味する語にとどまらず、さまざまな文化的・象徴的な意味を持つ単語です。例えば、「the apple of one's eye」は「目に入れても痛くないほど大切な存在」を指し、家族や恋人など特別な人を表現する際によく使われます。また、聖書に登場する「禁断の果実」も一般的にリンゴとして描かれ、そこから「apple」は誘惑やタブーの象徴ともなりました。さらに、「The Big Apple」はニューヨーク市の愛称であり、夢や成功、都会の魅力を象徴しています。ことわざ「An apple a day keeps the doctor away」は、りんごが健康の象徴であることを示しています。このように、appleという単語には、単なる果物以上の奥深い意味と物語が込められているのです。",
	pronunciation: "ˈæp.l̩ （アプル：「ア」と「プ」をはっきり発音）",
	examples: [
		{ text: "She ate a red apple.", translation: "彼女は赤いリンゴを食べた。" },
		{
			text: "An apple a day keeps the doctor away.",
			translation: "1日1個のリンゴは医者いらず。",
		},
		{
			text: "I bought a basket of apples.",
			translation: "私はリンゴを一かご買った。",
		},
		{
			text: "The apple fell from the tree.",
			translation: "リンゴが木から落ちた。",
		},
		{
			text: "She made an apple pie.",
			translation: "彼女はアップルパイを作った。",
		},
	],
	collocations: [
		{ text: "apple pie", translation: "アップルパイ" },
		{ text: "apple juice", translation: "リンゴジュース" },
		{ text: "apple tree", translation: "リンゴの木" },
		{ text: "apple orchard", translation: "リンゴ園" },
		{ text: "apple sauce", translation: "アップルソース" },
	],
	frequency: 8,
	derivations: [
		{ text: "applewood", translation: "リンゴの木材" },
		{ text: "apple-like", translation: "リンゴのような" },
		{ text: "applecart", translation: "リンゴを運ぶカート" },
	],
	phrasalVerbs: [
		{
			text: "compare apples and oranges",
			translation: "本質的に異なるものを比較する",
		},
		{
			text: "upset the applecart",
			translation: "計画を台無しにする",
		},
	],
	synonyms: [{ text: "fruit", translation: "果物" }],
	antonyms: [{ text: "vegetable", translation: "野菜" }],
	types: [{ name: "noun" }],
	etymology: "古英語 'æppel' から派生し、ゲルマン語派の言葉に由来する。",
	note: "Apple は IT 企業 'Apple Inc.' のブランド名としても広く知られている。",
};

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
								<span className="ml-2 hidden sm:inline text-sm">
									カードを編集する
								</span>
							</Link>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => scrollToSection("image-section")}
						>
							<Image className="sm:-mr-1.5" />
							<span className="hidden sm:inline text-sm">画像を編集する</span>
						</Button>
					</div>
					<div className="ml-3 flex">
						<SheetTitle>{word}</SheetTitle>
						<Speech word={word} aria-label="クリックして発音を聞く" />
					</div>
				</SheetHeader>
				<WordAccordions word={word} data={mockWordData} />
			</SheetContent>
		</Sheet>
	);
};

export default WordDetails;
