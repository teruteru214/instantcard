import type { ReactNode } from "react";
import Footer from "./Footer";
import LoginMenu from "./LoginMenu";

const LayoutView = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className="mx-auto max-w-screen-lg px-5 sm:px-10">{children}</div>
			<Footer />
			<LoginMenu />
		</>
	);
};

export default LayoutView;
