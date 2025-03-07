import CreateForm from "./components/CreateForm";

const CreatePage = () => {
	const tags = ["Global", "プログラミング", "TOEIC"];

	return (
		<div className="mt-5 mb-[35rem]">
			<CreateForm tags={tags} />
		</div>
	);
};

export default CreatePage;
