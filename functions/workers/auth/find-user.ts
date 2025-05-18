import type { PagesFunction } from "@cloudflare/workers-types";
import { Response } from "@cloudflare/workers-types";
import type { Env } from "types/env";

interface RequestBody {
	token: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	// POSTリクエストのみ許可
	if (context.request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		// リクエストボディからトークンを取得
		const { token } = (await context.request.json()) as RequestBody;

		if (!token) {
			return new Response("Token is required", { status: 400 });
		}

		// バックエンドAPIにリクエストを転送
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

		const data = await existingUserResponse.json();
		return new Response(JSON.stringify(data), {
			status: existingUserResponse.status,
			headers: existingUserResponse.headers,
		});
	} catch (error) {
		console.error("Error in find-user:", error);
		return new Response("Internal server error", { status: 500 });
	}
};
