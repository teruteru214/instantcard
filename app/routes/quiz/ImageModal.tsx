import { Image } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "~/components/ui/dialog";

const ImageModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon" type="button">
					<Image />
				</Button>
			</DialogTrigger>
			<DialogContent aria-labelledby="delete-modal-title">
				<h1 className="text-xl text-center">"example"のイメージ</h1>
				<div className="flex justify-center">
					<div
						aria-label="画像設定"
						className="w-48 h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-100"
					>
						<div className="text-gray-400 flex flex-col items-center justify-center">
							<Image size={32} />
							<span className="text-sm text-center">No image</span>
						</div>
					</div>
				</div>
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

export default ImageModal;
