import CardForm from "./components/CardForm";

const CreatePage = () => {
	const initialTags = [
		{ id: 1, name: "プログラミング", isChecked: false },
		{ id: 2, name: "TOEIC", isChecked: false },
	];

	return (
		<div className="mt-5 mb-[35rem]">
			<CardForm initialTags={initialTags} />
		</div>
	);
};

export default CreatePage;
