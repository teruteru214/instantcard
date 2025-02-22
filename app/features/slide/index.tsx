import { useState } from "react";
import TagHeader from "~/components/layout/TagHeader";
import WordsSlide from "./components/WordsSlide";
import type { SlideWord } from "./types";

const mockData: SlideWord[] = [
	{ id: "1-question", word: "apple" },
	{
		id: "1-answer",
		translation: "りんご",
		img: "https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?q=80&w=987&auto=format&fit=crop",
	},
	{ id: "2-question", word: "banana" },
	{
		id: "2-answer",
		translation: "バナナ",
		img: "https://images.unsplash.com/photo-1623227774108-7ab4478f50cf?q=80&w=987&auto=format&fit=crop",
	},
	{ id: "3-question", word: "cat" },
	{ id: "3-answer", translation: "猫" },
	{ id: "4-question", word: "dog" },
	{
		id: "4-answer",
		translation: "犬",
		img: "https://images.unsplash.com/photo-1601758063541-d2f50b4aafb2?q=80&w=1105&auto=format&fit=crop",
	},
	{ id: "5-question", word: "elephant" },
	{
		id: "5-answer",
		translation: "象",
		img: "https://images.unsplash.com/photo-1509587837663-52b8687980c5?q=80&w=1102&auto=format&fit=crop",
	},
];

const SlidePage = () => {
	const [isSizing, setIsSizing] = useState(false);

	return (
		<div className="min-h-[95vh]">
			{/* 拡大中はヘッダーを非表示にする */}
			<TagHeader isHidden={isSizing} totalCount={mockData.length} />

			{/* WordsSlide に isSizing の状態を渡す */}
			<WordsSlide
				data={mockData}
				isSizing={isSizing}
				setIsSizing={setIsSizing}
			/>
		</div>
	);
};

export default SlidePage;
