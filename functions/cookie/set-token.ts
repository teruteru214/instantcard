import type { Env } from "types/workers";
import { authCookie } from "~/utils/auth";

export interface RequestBody {
	token: string;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
	const { request } = context;

	if (request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const { token } = (await request.json()) as RequestBody;

		if (!token) {
			return new Response("Token is required", { status: 400 });
		}

		// Cookieを設定
		const cookieValue = await authCookie.serialize(token);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Set-Cookie": cookieValue,
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
			},
		});
	} catch (error) {
		const requestId = crypto.randomUUID();
		console.error(`Error in set-token [${requestId}]:`, error);
		return new Response("Internal server error", { status: 500 });
	}
};
