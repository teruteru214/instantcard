import { useNavigate } from "@remix-run/react";
import { ArrowLeft, Trash2 } from "lucide-react"; // アイコンをインポート
import DeleteModal from "~/components/global/DeleteModal";
import { Button } from "~/components/ui/button";

interface EditHeaderProps {
	isSaveEnabled: boolean;
}

const EditHeader = ({ isSaveEnabled }: EditHeaderProps) => {
	const navigate = useNavigate();

	return (
		<div className="sticky top-0 left-0 right-0 z-50 bg-white py-3 flex items-center justify-between">
			<div className="space-x-2 flex items-center">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="text-gray-400 hover:text-gray-500" />
				</Button>
				<Button
					type="submit"
					variant="black"
					size="default"
					disabled={!isSaveEnabled}
				>
					保存する
				</Button>
			</div>
			<DeleteModal
				word="word"
				triggerElement={
					<Button
						type="button"
						variant="ghost"
						className="text-gray-400 hover:text-gray-500"
					>
						<Trash2 />
						削除する
					</Button>
				}
			/>
		</div>
	);
};

export default EditHeader;
