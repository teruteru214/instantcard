import { useNavigate } from "@remix-run/react";
import { Button } from "../ui/button";

const NoCard = () => {
	const navigate = useNavigate();

	return (
		<div className="my-32 sm:my-64 space-y-3 flex flex-col items-center justify-center">
			<img
				src="/tree.webp"
				alt="単語カードがありません"
				width={200}
				height={200}
				className="max-w-full h-auto"
			/>
			<p>単語カードがありません</p>
			<Button size="giant" onClick={() => navigate("/create")}>
				カードを作成する
			</Button>
		</div>
	);
};

export default NoCard;
