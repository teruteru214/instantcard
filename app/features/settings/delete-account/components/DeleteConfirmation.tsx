import { Button } from "~/components/ui/button";

const DeleteConfirmation = ({ onConfirm }: { onConfirm: () => void }) => {
	return (
		<div className="space-y-4">
			<p className="text-gray-500">
				一度アカウントを削除すると、アカウントや単語カードを復元することはできません
			</p>
			<Button variant="destructive" type="button" onClick={onConfirm}>
				理解した上で削除に進む
			</Button>
		</div>
	);
};

export default DeleteConfirmation;
