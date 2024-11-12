import { Button } from "~/components/ui/button";

const LoginPage = () => {
	return (
		<div className="my-64 space-y-6">
			<h1 className="text-3xl text-center">ログイン</h1>
			<div className="space-y-10 flex flex-col justify-center">
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
				<Button size="giant" className="w-96">
					Googleでログイン
				</Button>
			</div>
			<div className="flex justify-center">
				<Button size="giant" className="w-96">
					メールアドレスでログイン
				</Button>
			</div>
		</div>
	);
};

export default LoginPage;
