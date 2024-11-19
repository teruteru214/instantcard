import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "~/components/ui/dialog";

const DeleteModal = ({ word }: { word: string }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Trash2
					aria-label="削除"
					className="h-7 w-7 text-gray-400 hover:text-gray-500 cursor-pointer"
				/>
			</DialogTrigger>
			<DialogContent aria-labelledby="login-modal-title">
				<DialogHeader>カードを削除しますか？</DialogHeader>
				<p className="text-gray-400 text-center">"{word}"のカードを選択中</p>
				<Button size="giant" variant="destructive" aria-label="削除">
					削除
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
