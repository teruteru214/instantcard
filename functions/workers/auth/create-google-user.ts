import type { Env } from "types/workers";
import type { User } from "~/store/userAtom";
import { authCookie } from "~/utils/auth";

export interface RequestBody {
	name?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const { request, env } = context;

	if (request.method !== "POST") {
		return new Response("許可されていないメソッドです", { status: 405 });
	}

	const token = await authCookie.parse(request.headers.get("Cookie"));

	if (!token) {
		return new Response("認証が必要です", { status: 401 });
	}

	try {
		const { name } = (await request.json()) as RequestBody;

		if (!name) {
			return new Response("名前は必須です", { status: 400 });
		}

		const response = await fetch(
			`${env.BACKEND_API_URL}/auth/create-google-user`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name }),
			},
		);

		const user: User = await response.json();
		return new Response(JSON.stringify(user), {
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
