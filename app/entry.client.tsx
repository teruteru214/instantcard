import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
	const rootElement = document.querySelector("#app");

	if (rootElement instanceof Element) {
		hydrateRoot(
			rootElement,
			<StrictMode>
				<RemixBrowser />
			</StrictMode>,
		);
	} else {
		console.error("Failed to find the root element for hydration.");
	}
});
