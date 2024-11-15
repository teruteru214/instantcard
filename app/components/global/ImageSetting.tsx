import type { WordProps } from "~/types/word";

const ImageSetting = ({ word }: WordProps) => {
	console.log(word);
	return (
		<div>
			<h1>Image Setting</h1>
			<p>{word}</p>
		</div>
	);
};

export default ImageSetting;
