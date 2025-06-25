import { UserSchema } from "schema/user";
import type { Env } from "types/workers";
import { authCookie } from "~/utils/auth";

export interface RequestBody {
	name?: string;
	language?: string;
	purpose?: string;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
	const { request, env } = context;

	if (request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 }) as Response;
	}

	const token = await authCookie.parse(request.headers.get("Cookie"));

	if (!token) {
		return new Response("認証が必要です", { status: 401 });
	}

	try {
		const { name, language, purpose } = (await request.json()) as RequestBody;

		if (!name) {
			return new Response("名前は必須です", { status: 400 });
		}

		if (!language) {
			return new Response("言語は必須です", { status: 400 });
		}

		const response = await fetch(
			`${env.BACKEND_API_URL}/auth/create-google-user`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name, language, purpose }),
			},
		);

		const json = await response.json();
		const result = UserSchema.safeParse(json);

		if (!result.success) {
			console.error("Invalid user data:", result.error);
			return new Response("Invalid user data", { status: 400 });
		}

		const userData = {
			...result.data,
			img: result.data.img ?? undefined,
			speaker: result.data.speaker ?? undefined,
		};

		return new Response(JSON.stringify(userData), {
			status: response.status,
			headers: {
				...response.headers,
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
			},
		});
	} catch (error) {
		const requestId = crypto.randomUUID();
		console.error(`Error in create-google-user [${requestId}]:`, error);
		return new Response("Internal server error", { status: 500 });
	}
};
