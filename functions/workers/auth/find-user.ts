import type { PagesFunction } from "@cloudflare/workers-types";
import { Response } from "@cloudflare/workers-types";
import type { Env } from "types/workers";
import { authCookie } from "~/utils/auth";

export const onRequest: PagesFunction<Env> = async (context) => {
	if (context.request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const token = await authCookie.parse(context.request.headers.get("Cookie"));

		if (!token) {
			return new Response("Token is required", { status: 400 });
		}

		if (typeof token !== "string" || token.length < 10) {
			return new Response("Invalid token format", { status: 400 });
		}

		const existingUserResponse = await fetch(
			`${context.env.BACKEND_API_URL}/workers/auth/find-user`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token }),
			},
		);

		const userDto = await existingUserResponse.json();
		return new Response(JSON.stringify(userDto), {
			status: existingUserResponse.status,
			headers: {
				...existingUserResponse.headers,
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
