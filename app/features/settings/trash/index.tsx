import TrashWordsTable from "./components/TrashWordsTable";

const words = [
	{ word: "apple" },
	{ word: "banana" },
	{ word: "cherry" },
	{ word: "date" },
	{ word: "elderberry" },
	{ word: "fig" },
	{ word: "grape" },
	{ word: "honeydew" },
	{ word: "kiwi" },
	{ word: "supercalifragilisticexpialidocious" },
];

const tags = [
	{ id: 1, name: "Global", isChecked: false },
	{ id: 2, name: "プログラミング", isChecked: false },
	{ id: 3, name: "TOEIC", isChecked: false },
];

const TrashSettings = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="py-4 space-y-5">
				<h1 className="text-base font-medium">設定 / ゴミ箱</h1>
				<p className="text-red-500">
					毎月1日にタグ未分類の単語カードが完全削除されます。
				</p>
				<div>
					<TrashWordsTable words={words} tags={tags} />
				</div>
			</div>
		</div>
	);
};

export default TrashSettings;
