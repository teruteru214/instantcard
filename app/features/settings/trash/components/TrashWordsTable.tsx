import TagsDropdownMenu from "~/components/global/TagsDropDown";
import WordDetails from "~/components/global/WordDetails";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import type { Tag, Word } from "~/types/word";
import DeleteModal from "./DeleteModal";

interface TrashWordsTableProps {
	words: Word[];
	tags: Tag[];
}

const TrashWordsTable = ({ words, tags }: TrashWordsTableProps) => {
	return (
		<Table>
			<TableBody>
				{words.map((w) => (
					<TableRow key={w.word}>
						<TableCell className="flex justify-between items-center">
							<WordDetails
								word={w.word}
								triggerElement={
									<div className="hover:underline cursor-pointer sm:max-w-[300px] max-w-[150px] truncate">
										<span
											className="block overflow-hidden text-ellipsis whitespace-nowrap"
											title={w.word}
										>
											{w.word}
										</span>
									</div>
								}
							/>

							<div className="flex items-center gap-2 flex-shrink-0">
								<TagsDropdownMenu
									tags={tags}
									triggerElement={
										<Button size="sm" variant="outline">
											<span className="hidden sm:inline">元に戻す</span>
											<span className="sm:hidden">戻す</span>
										</Button>
									}
								/>
								<DeleteModal
									word={w.word}
									triggerElement={
										<Button size="sm" variant="secondary">
											<span className="hidden sm:inline">削除する</span>
											<span className="sm:hidden">削除</span>
										</Button>
									}
								/>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TrashWordsTable;
