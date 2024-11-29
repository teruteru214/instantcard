import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

const LogoutModal = ({
	trigger,
}: {
	trigger: React.ReactNode;
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>ログアウトしますか？</DialogTitle>
					<DialogDescription className="text-center py-5">
						@usernameとしてログインしています。
					</DialogDescription>
				</DialogHeader>
				<Button size="giant" className="w-full">
					ログアウト
				</Button>
				<DialogClose asChild>
					<Button variant="secondary" size="giant" className="w-full">
						キャンセル
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default LogoutModal;
