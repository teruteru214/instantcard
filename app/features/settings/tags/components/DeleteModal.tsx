import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "~/components/ui/dialog";

interface DeleteProps {
	tag_name: string;
	tag_count: number;
	triggerElement: React.ReactNode;
}

const DeleteModal = ({ tag_name, tag_count, triggerElement }: DeleteProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
			<DialogContent
				aria-labelledby="delete-modal-title"
				aria-describedby="delete-modal-description"
			>
				<DialogHeader id="delete-modal-title">
					タグを削除しますか？
				</DialogHeader>
				<p id="delete-modal-description" className="text-gray-400 text-center ">
					"<span className="font-medium">{tag_name}</span>"を選択中です。
					<br />
					削除すると、{tag_count}つのカードのタグが外れます。
					また未分類のカードはゴミ箱へ移動します。
				</p>
				<Button size="giant" variant="destructive" aria-label="削除">
					削除する
				</Button>
				<DialogClose>
					<Button
						size="giant"
						variant="secondary"
						aria-label="キャンセル"
						className="w-full"
					>
						キャンセル
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
