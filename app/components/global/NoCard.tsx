import { useNavigate } from "@remix-run/react";
import { Button } from "../ui/button";

const NoCard = ({ type }: { type: "quiz" | "slide" }) => {
	const navigate = useNavigate();

	const getMessage = () => {
		if (type === "quiz") {
			return "カードを作成すると、クイズが表示されます";
		}
		if (type === "slide") {
			return "カードを作成すると、スライドが表示されます";
		}
		return "";
	};

	return (
		<div className="h-screen space-y-4 flex flex-col items-center justify-center">
			<img src="/card.webp" alt="confirmation" width={200} height={200} />
			<p>{getMessage()}</p>
			<Button size="giant" onClick={() => navigate("/search")}>
				カードを作成する
			</Button>
		</div>
	);
};

export default NoCard;
