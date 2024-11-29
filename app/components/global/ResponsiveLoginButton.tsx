import { Button } from "../ui/button";
import LoginModal from "./LoginModal";
import LoginSheet from "./LoginSheet";

const ResponsiveLoginButton = () => (
	<>
		<div className="hidden sm:block">
			<LoginModal
				trigger={
					<Button size="giant" aria-label="ログインモーダルを開く">
						カードを作る
					</Button>
				}
			/>
		</div>
		<div className="block sm:hidden">
			<LoginSheet
				trigger={
					<Button size="giant" aria-label="ログインモーダルを開く">
						カードを作る
					</Button>
				}
			/>
		</div>
	</>
);

export default ResponsiveLoginButton;
