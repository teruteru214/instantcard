import { json } from "@remix-run/node";

export const loader = async ({ request }: { request: Request }) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");

	if (!query) {
		return json({ suggestions: [] }, { status: 400 });
	}

	const response = await fetch(
		`https://api.datamuse.com/words?sp=${encodeURIComponent(query)}*&max=10`,
	);

	if (!response.ok) {
		return json({ suggestions: [] }, { status: response.status });
	}

	const data = await response.json();

	return json({ suggestions: data });
};
