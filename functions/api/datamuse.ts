export async function onRequest(context: { request: Request }) {
	const url = new URL(context.request.url);
	const query = url.searchParams.get("query");

	if (!query) {
		return new Response(JSON.stringify([]), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const response = await fetch(
			`https://api.datamuse.com/words?sp=${encodeURIComponent(query)}*&max=10`,
			{ signal: AbortSignal.timeout(5000) },
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch suggestions: ${response.status}`);
		}

		const suggestions = await response.json();
		return new Response(JSON.stringify(suggestions), {
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
