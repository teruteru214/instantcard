import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import DeletionForm from "./DeletionForm";
import LoginVerification from "./LoginVerification";

const DeleteUser = () => {
	const [step, setStep] = useState(0);

	return (
		<div className="rounded-lg border border-gray-200 p-6">
			{step === 0 && <LoginVerification onSuccess={() => setStep(1)} />}
			{step === 1 && <DeleteConfirmation onConfirm={() => setStep(2)} />}
			{step === 2 && <DeletionForm />}
		</div>
	);
};

export default DeleteUser;
