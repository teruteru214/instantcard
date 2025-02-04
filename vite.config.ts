import {
	cloudflareDevProxyVitePlugin,
	vitePlugin as remix,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		cloudflareDevProxyVitePlugin(),
		remix({
			ssr: false,
			routes(defineRoutes) {
				return defineRoutes((route) => {
					route("", "features/_index.tsx", { index: true });
					route("/login", "features/login/index.tsx");
					route("/search", "features/search/index.tsx");
					route("cards", "features/cards/index.tsx");
					route("cards/:word", "features/cards/word.tsx");
					route("/quiz", "features/quiz/index.tsx");
					route("/slide", "features/slide/index.tsx");
					route("*", "features/not-found.tsx");
				});
			},
		}),
		tsconfigPaths(),
	],
	ssr: {
		noExternal: ["problematic-dependency"],
	},
	test: {
		globals: true,
		environment: "happy-dom",
	},
});
