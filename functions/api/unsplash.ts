export async function onRequest(context: {
	request: Request;
	env: { UNSPLASH_ACCESS_KEY: string };
}) {
	const url = new URL(context.request.url);
	const query = url.searchParams.get("query");
	const page = url.searchParams.get("page") || "1";

	if (!query) {
		return new Response(JSON.stringify({ error: "検索クエリが必要です" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const accessKey = context.env.UNSPLASH_ACCESS_KEY;

		if (!accessKey) {
			throw new Error("Unsplash API のアクセスキーが設定されていません");
		}

		const headers = {
			"Accept-Version": "v1",
			"User-Agent": "InstantCard/1.0",
		};

		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=12&client_id=${accessKey}`,
			{ headers, signal: AbortSignal.timeout(5000) },
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch Unsplash images: ${response.status}`);
		}

		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : "Unknown error",
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
