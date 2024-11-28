import WordsSlide from "./WordsSlide";

const SlidePage = () => {
	return (
		<div className="py-4">
			<WordsSlide />
			<p className="mt-4 text-center text-gray-400 hover:cursor-pointer hover:underline hover:text-gray-500">
				スライド機能の使い方→
			</p>
		</div>
	);
};

export default SlidePage;
