import { Link } from "@remix-run/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
				<TagsForm initialTags={tags} />
				<DropdownMenuSeparator />
				<Link
					to="/settings/tags"
					className="px-2 py-2 text-sm text-gray-500 hover:underline"
				>
					タグを編集する →
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TagsDropdownMenu;
