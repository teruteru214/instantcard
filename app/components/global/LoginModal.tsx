import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "../ui/button";
import LoginContents from "./LoginContents";

const LoginModal = ({ label }: { label: string }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="giant" aria-label="ログインモーダルを開く">
					{label}
				</Button>
			</DialogTrigger>
			<DialogContent aria-labelledby="login-modal-title">
				<LoginContents />
			</DialogContent>
		</Dialog>
	);
};

export default LoginModal;
