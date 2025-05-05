import WordForm from "./components/WordForm";

const CreatePage = () => {
	const initialTags = [
		{ id: 1, name: "プログラミング", isChecked: false },
		{ id: 2, name: "TOEIC", isChecked: false },
	];

	return (
		<div>
			<WordForm initialTags={initialTags} />
		</div>
	);
};

export default CreatePage;
