import CardForm from "./components/CardForm";

const CreatePage = () => {
	const tags = ["Global", "プログラミング", "TOEIC"];

	return (
		<div className="mt-5 mb-[35rem]">
			<CardForm availableTags={tags} />
		</div>
	);
};

export default CreatePage;
