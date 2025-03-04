import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

const TagSection = () => {
	return (
		<div className="rounded-lg border border-gray-200 p-6">
			<div className="space-y-4">
				<h2 className="text-base font-medium">タグ</h2>
				<p className="text-gray-500">
					タグ機能を使って、単語カードを分類できます
				</p>
				<Link
					to="/settings/tags"
					className="inline-flex items-center text-gray-500 hover:text-gray-600 underline"
				>
					タグを管理 <ArrowRight className="ml-1 h-4 w-4" />
				</Link>
			</div>
		</div>
	);
};

export default TagSection;
