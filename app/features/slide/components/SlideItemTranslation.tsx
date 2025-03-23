interface SlideItemTranslationProps {
	translation: string;
	img?: string;
	showImages: boolean;
}

const SlideItemTranslation = ({
	translation,
	img,
	showImages,
}: SlideItemTranslationProps): JSX.Element => {
	return (
		<div className="relative flex items-center justify-center w-full h-full">
			{/* 背景画像 */}
			{showImages && img && (
				<img
					src={img}
					alt={translation}
					className="absolute inset-0 w-full h-full rounded-md object-cover opacity-30"
				/>
			)}
			{/* 翻訳テキスト */}
			<p className="relative z-10 text-2xl sm:text-4xl font-semibold text-center text-gray-800">
				{translation}
			</p>
		</div>
	);
};

export default SlideItemTranslation;
