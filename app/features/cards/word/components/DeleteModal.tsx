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
				<DialogHeader>カードをゴミ箱に入れますか？</DialogHeader>
				<p className="text-gray-400 text-center">
					"{word}"を選択中
					<br />
					<Link to="/settings/tags" className="hover:text-gray-500 underline">
						ゴミ箱内のカード
					</Link>
					は毎月1日に削除されます。
				</p>
				<Button size="giant" variant="destructive" aria-label="削除">
					ゴミ箱に入れる
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
