import {
	cloudflareDevProxyVitePlugin,
	vitePlugin as remix,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [cloudflareDevProxyVitePlugin(), remix(), tsconfigPaths()],
});
