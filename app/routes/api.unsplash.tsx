import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	const page = url.searchParams.get("page") || "1";

	if (!query) {
		return json({ error: "検索クエリは必須です" }, { status: 400 });
	}

	const encodedQuery = encodeURIComponent(query);
	const headers = {
		"Accept-Version": "v1",
		"User-Agent": "InstantCard/1.0",
	};

	try {
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${encodedQuery}&page=${page}&per_page=12&client_id=${context.cloudflare.env.UNSPLASH_ACCESS_KEY}`,
			{
				headers,
				signal: AbortSignal.timeout(5000),
			},
		);

		if (!response.ok) {
			return json(
				{
					error: `Unsplashからのデータ取得に失敗しました: ${response.statusText}`,
				},
				{ status: response.status },
			);
		}

		const data = await response.json();
		if (!data.results) {
			throw new Error("無効なレスポンス形式です");
		}
		return json(data);
	} catch (error) {
		return json(
			{ error: `リクエストがタイムアウトまたは失敗しました: ${error.message}` },
			{ status: 500 },
		);
	}
};
