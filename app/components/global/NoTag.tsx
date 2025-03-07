import { Link } from "@remix-run/react";

const NoTag = () => {
	return (
		<p className="my-5 text-center text-gray-400 animate-fade-up">
			タグがありません。{" "}
			<Link
				to="/create"
				className="underline hover:text-gray-500 cursor-pointer"
			>
				英単語カード
			</Link>
			をタグで分類できます。
		</p>
	);
};

export default NoTag;
