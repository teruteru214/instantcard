import { Table, TableBody } from "~/components/ui/table";

import type { TagEdit } from "../types/tag";
import TagEditRow from "./TagEditRow";

interface TagsTableProps {
	tags: TagEdit[];
}

const TagsTable = ({ tags }: TagsTableProps) => {
	return (
		<Table>
			<TableBody>
				{tags.map((tag: TagEdit) => (
					<TagEditRow key={tag.id} tag={tag} />
				))}
			</TableBody>
		</Table>
	);
};

export default TagsTable;
