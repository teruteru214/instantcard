import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

const TrashSection = ({ cardCount }: { cardCount: number }) => {
	return (
		<div className="rounded-lg border border-gray-200 p-6">
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<h2 className="text-base font-medium">ゴミ箱</h2>
					<p className="flex items-center justify-center h-[20px] aspect-square rounded-full p-[1.5px] text-xs text-black bg-gray-100">
						{cardCount}
					</p>
				</div>
				<p className="text-gray-500">
					毎月1日にタグ未分類の単語カードが自動で削除されます。
				</p>
				<Link
					to="/settings/trash"
					className="inline-flex items-center text-gray-500 hover:text-gray-600 underline"
				>
					中身を見る <ArrowRight className="ml-1 h-4 w-4" />
				</Link>
			</div>
		</div>
	);
};
export default TrashSection;
