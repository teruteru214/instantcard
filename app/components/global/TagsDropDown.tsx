import { Link } from "@remix-run/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Tag } from "~/types/word";
import TagsForm from "./parts/TagsForm";

interface TagsProps {
	triggerElement: React.ReactNode;
	tags: Tag[];
}

const TagsDropdownMenu = ({ triggerElement, tags }: TagsProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80">
				<DropdownMenuLabel>タグを付与する</DropdownMenuLabel>
				<div className="p-2">
					<TagsForm initialTags={tags} />
					{tags.length > 0 && (
						<div className="mt-2">
							<Link
								to="/settings/tags"
								className="text-sm text-gray-500 hover:underline"
							>
								タグを編集する →
							</Link>
						</div>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TagsDropdownMenu;
