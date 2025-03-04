import { Table, TableBody } from "~/components/ui/table";

import type { Tag } from "../types/tag";
import TagEditRow from "./TagEditRow";

interface TagsTableProps {
	tags: Tag[];
}

const TagsTable = ({ tags }: TagsTableProps) => {
	return (
		<Table>
			<TableBody>
				{tags.map((tag: Tag) => (
					<TagEditRow key={tag.id} tag={tag} />
				))}
			</TableBody>
		</Table>
	);
};

export default TagsTable;
