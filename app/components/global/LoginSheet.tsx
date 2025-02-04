import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import LoginContents from "./parts/LoginContents";

const LoginSheet = ({
	trigger,
}: {
	trigger: React.ReactNode;
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent side="bottom">
				<LoginContents />
			</SheetContent>
		</Sheet>
	);
};

export default LoginSheet;
