import CardForm from "./components/CardForm";

const CreatePage = () => {
	const initialTags = [
		{ name: "プログラミング", isChecked: false },
		{ name: "TOEIC", isChecked: false },
	];

	return (
		<div className="mt-5 mb-[35rem]">
			<CardForm initialTags={initialTags} />
		</div>
	);
};

export default CreatePage;
