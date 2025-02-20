import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "~/components/ui/dialog";

interface DeleteProps {
	word: string;
	triggerElement: React.ReactNode;
}

const DeleteModal = ({ word, triggerElement }: DeleteProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
			<DialogContent aria-labelledby="delete-modal-title">
				<DialogHeader>このタグからカードを削除しますか？</DialogHeader>
				<p className="text-gray-400 text-center">
					"{word}" のカードをこのタグから削除します。
					<br />
					削除しても
					<Link to={`/cards/${word}`} className="underline hover:text-gray-500">
						編集
					</Link>
					でタグを再追加できます。
				</p>
				<Button size="giant" variant="destructive" aria-label="ゴミ箱に入れる">
					タグから削除
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
