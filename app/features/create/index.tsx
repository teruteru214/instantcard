import CreateForm from "./components/CreateForm";

const CreatePage = () => {
	// 仮のタグデータ
	const tags = ["Global", "プログラミング", "TOEIC"];

	return (
		<div className="mt-5 mb-[35rem]">
			{" "}
			{/* 余白をさらに広げる */}
			<CreateForm tags={tags} />
		</div>
	);
};

export default CreatePage;
