import type { Env } from "types/workers";
import { authCookie } from "~/utils/auth";

interface BackendResponse {
	exists: boolean;
	user?: {
		user_id: string;
		name: string;
		img?: string;
		language?: string;
		speaker?: string;
	};
	message?: string;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
	const { request } = context;

	if (context.request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const cookieHeader = request.headers.get("Cookie");
		const token = await authCookie.parse(cookieHeader);

		if (!token) {
			return new Response("Token is required", { status: 401 });
		}

		const existingUserResponse = await fetch(
			`${context.env.BACKEND_API_URL}/workers/auth/find-user`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({}),
			},
		);

		if (!existingUserResponse.ok) {
			return new Response("Backend API error", {
				status: existingUserResponse.status,
			});
		}

		const json = (await existingUserResponse.json()) as BackendResponse;

		if (!json.exists) {
			return new Response("User not found", { status: 404 });
		}

		return new Response(JSON.stringify(json.user), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
			},
		});
	} catch (error) {
		const requestId = crypto.randomUUID();
		console.error(`Error in find-user [${requestId}]:`, error);
		return new Response("Internal server error", { status: 500 });
	}
};
