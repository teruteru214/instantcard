import { type MetaFunction, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => [{ title: "見つかりませんでした" }];

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="h-screen space-y-4 flex flex-col items-center justify-center">
			<img
				src="/404.webp"
				alt="ページが見つかりません"
				width={200}
				height={200}
			/>
			<p>ページが見つかりませんでした</p>
			<Button size="giant" onClick={() => navigate("/")}>
				ホームへ戻る
			</Button>
		</div>
	);
};

export default NotFound;
