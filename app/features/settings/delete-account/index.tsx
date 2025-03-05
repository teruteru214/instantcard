import DeleteUser from "./components/DeleteUser";

const DeleteAccountPage = () => {
	return (
		<div className="min-h-screen">
			<div className="py-4 space-y-5">
				<h1 className="text-base font-medium">設定 / アカウントの削除</h1>
				<div>
					<DeleteUser />
				</div>
			</div>
		</div>
	);
};

export default DeleteAccountPage;
