import type { Env } from "types/workers";

export interface RequestBody {
	name: string;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
	const { request, env } = context;

	if (request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const { name } = (await request.json()) as RequestBody;

		if (!name) {
			return new Response("名前は必須です", { status: 400 });
		}

		const response = await fetch(
			`${env.BACKEND_API_URL}/workers/user/find-same-name`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			},
		);

		const json = await response.json();

		return new Response(JSON.stringify(json), {
			status: response.status,
			headers: {
				"Content-Type": "application/json",
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
			},
		});
	} catch (error) {
		const requestId = crypto.randomUUID();
		console.error(`Error in find-same-name [${requestId}]:`, error);
		return new Response("Internal server error", { status: 500 });
	}
};
