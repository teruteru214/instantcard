import TagsTable from "./components/TagsTable";
import type { Tag } from "./types/tag";

const tags: Tag[] = [
	{ id: 2, name: "プログラミング", count: 7 },
	{ id: 3, name: "TOEIC", count: 67 },
];

const TrashSettings = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="py-4 space-y-5">
				<h1 className="text-base font-medium">設定 / タグ</h1>
				<div>
					<TagsTable tags={tags} />
				</div>
			</div>
		</div>
	);
};

export default TrashSettings;
