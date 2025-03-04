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
			<DialogContent aria-labelledby="delete-modal-title">
				<DialogHeader>タグを削除しますか？</DialogHeader>
				<p className="text-gray-400 text-center">
					"{tag_name}"を選択中です。
					<br />"{tag_name}
					"を削除すると、{tag_count}つのカードのタグが外れます。
					未分類のカードはゴミ箱へ移動します。
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
