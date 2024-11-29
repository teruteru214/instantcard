import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import LoginContents from "./LoginContents";

const LoginModal = ({
	trigger,
}: {
	trigger: React.ReactNode;
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent aria-labelledby="login-modal-title">
				<LoginContents />
			</DialogContent>
		</Dialog>
	);
};

export default LoginModal;
