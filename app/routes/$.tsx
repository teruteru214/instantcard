import { json } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const loader = () => {
	return json(null, { status: 404 });
};

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="h-screen space-y-4 flex flex-col items-center justify-center">
			<img src="/404.webp" alt="not-found" width={200} height={200} />
			<p>ページが見つかりませんでした</p>
			<Button size="giant" onClick={() => navigate("/")}>
				ホームへ戻る
			</Button>
		</div>
	);
};

export default NotFound;
