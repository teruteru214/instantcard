import ResponsiveLoginButton from "~/components/global/ResponsiveLoginButton";

const LoginPage = () => {
	return (
		<div className="my-80 space-y-4">
			<div className="space-y-10 flex flex-col justify-center" role="banner">
				<div className="flex items-center justify-center">
					<img
						src="/icon.webp"
						alt="InstantCardのロゴ"
						width={40}
						height={40}
					/>
					<h1 className="text-4xl">InstantCard</h1>
				</div>
				<p className="max-w-lg mx-auto text-center">
					InstantCardは、効率的に英単語カードを作成、学習するために生まれたサービスです。
					日々の英語学習の中で知らない英単語をカードにして、覚えて英語力を鍛えましょう。
				</p>
			</div>
			<div className="flex justify-center">
				<div className="py-5 flex justify-center">
					<ResponsiveLoginButton />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
