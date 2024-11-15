import { type LoaderFunctionArgs, json } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	const page = url.searchParams.get("page") || "1";

	if (!query) {
		return json({ error: "Search query is required" }, { status: 400 });
	}

	const encodedQuery = encodeURIComponent(query);

	const headers = {
		"Accept-Version": "v1",
		"User-Agent": "InstantCard/1.0",
	};

	try {
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${encodedQuery}&page=${page}&per_page=12&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
			{
				headers,
				signal: AbortSignal.timeout(5000),
			},
		);

		if (!response.ok) {
			return json(
				{ error: "Failed to fetch data from Unsplash" },
				{ status: 500 },
			);
		}

		try {
			const data = await response.json();
			if (!data.results) {
				throw new Error("Invalid response format");
			}
			return json(data);
		} catch (_error) {
			return json({ error: "データの解析に失敗しました" }, { status: 500 });
		}
	} catch (_error) {
		return json({ error: "Request timed out or failed" }, { status: 500 });
	}
};
