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
				<p className="text-gray-400 text-center">"{word}"のカードを選択中</p>
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
