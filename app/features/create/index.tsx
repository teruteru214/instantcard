import CreateForm from "./components/CreateForm";

const CreatePage = () => {
	// 仮のタグデータ
	const tags = ["プログラミング", "TOEIC"];

	return (
		<div className="h-screen">
			<div className="mt-5">
				<CreateForm tags={tags} />
			</div>
		</div>
	);
};

export default CreatePage;
