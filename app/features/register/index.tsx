import { useNavigate } from "@remix-run/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "~/config/initFirebase";

import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				// 未認証の場合はログインページへ
				navigate("/");
				return;
			}

			// 既存ユーザーの場合はカード一覧へ
			if (!user.metadata.creationTime) {
				navigate("/cards");
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	return (
		<div className="mt-20 mb-40 flex items-center justify-center min-h-[60vh]">
			<div className="w-full max-w-md mx-auto p-8 rounded-xl bg-white shadow-sm border border-gray-100">
				<div className="space-y-6 text-center mb-8">
					<div className="flex items-center justify-center gap-2">
						<img
							src="/icon.webp"
							alt="Enlexのロゴ"
							width={40}
							height={40}
							className="rounded-md"
						/>
						<h1 className="text-3xl font-bold">Enlex</h1>
					</div>
					<h2 className="text-gray-600">
						はじめるにはアカウント登録が必要です
					</h2>
				</div>

				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
