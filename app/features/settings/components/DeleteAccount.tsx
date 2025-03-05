import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

const DeleteAccount = () => {
	return (
		<div className="flex justify-center">
			<Link
				to="/settings/delete-account"
				className="text-red-500 inline-flex items-center hover:underline cursor-pointer"
				aria-label="アカウントの削除ページへ移動"
			>
				アカウントの削除 <ArrowRight className="ml-1 h-4 w-4" />
			</Link>
		</div>
	);
};

export default DeleteAccount;
