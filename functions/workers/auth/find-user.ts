import { UserSchema } from "schema/user";
import type { Env } from "types/workers";
import { authCookie } from "~/utils/auth";

export const onRequest = async (context: { request: Request; env: Env }) => {
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
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({}),
			},
		);

		const json = await existingUserResponse.json();
		const result = UserSchema.safeParse(json);

		if (!result.success) {
			console.error("Invalid user data:", result.error);
			throw new Error("Invalid user data received from server");
		}

		const userData = {
			...result.data,
			img: result.data.img ?? undefined,
			speaker: result.data.speaker ?? undefined,
		};

		return new Response(JSON.stringify(userData), {
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
