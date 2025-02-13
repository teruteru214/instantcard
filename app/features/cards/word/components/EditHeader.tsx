import { useNavigate } from "@remix-run/react";
import { ArrowLeft, Tags, Trash2 } from "lucide-react";
import DeleteModal from "~/components/global/DeleteModal";
import TagsDropdownMenu from "~/components/global/TagsDropDown";
import { Button } from "~/components/ui/button";
import type { Tag } from "~/types/word";

interface EditHeaderProps {
	isSaveEnabled: boolean;
	tags: Tag[];
}

const EditHeader = ({ isSaveEnabled, tags }: EditHeaderProps) => {
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
					className="text-sm"
				>
					保存する
				</Button>
			</div>
			<div className="space-x-2">
				<TagsDropdownMenu
					tags={tags}
					triggerElement={
						<Button
							variant="ghost"
							className="text-sm text-gray-400 hover:text-gray-500"
						>
							<Tags className="-mr-1" />
							<span className="hidden sm:block">タグ</span>
						</Button>
					}
				/>
				<DeleteModal
					word="word"
					triggerElement={
						<Button
							type="button"
							variant="ghost"
							className="text-sm text-red-400 hover:text-red-500"
						>
							<Trash2 className="-mr-1" />
							<span className="hidden sm:block">ゴミ箱に入れる</span>
						</Button>
					}
				/>
			</div>
		</div>
	);
};

export default EditHeader;
