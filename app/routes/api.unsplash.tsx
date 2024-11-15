import { type LoaderFunctionArgs, json } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	const page = url.searchParams.get("page") || "1";

	if (!query) {
		return json({ error: "Search query is required" }, { status: 400 });
	}

	const response = await fetch(
		`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
	);

	if (!response.ok) {
		return json(
			{ error: "Failed to fetch data from Unsplash" },
			{ status: 500 },
		);
	}

	const data = await response.json();
	return json(data);
};
