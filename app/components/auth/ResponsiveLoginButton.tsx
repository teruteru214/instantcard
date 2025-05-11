import { Button } from "../ui/button";
import LoginModal from "./part/LoginModal";
import LoginSheet from "./part/LoginSheet";

const ResponsiveLoginButton = () => (
	<>
		<div className="hidden sm:block">
			<LoginModal
				trigger={
					<Button size="giant" aria-label="ログインモーダルを開く">
						今すぐ試してみる
					</Button>
				}
			/>
		</div>
		<div className="block sm:hidden">
			<LoginSheet
				trigger={
					<Button size="giant" aria-label="ログインシートを開く">
						今すぐ試してみる
					</Button>
				}
			/>
		</div>
	</>
);

export default ResponsiveLoginButton;
