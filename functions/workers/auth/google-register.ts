import { authCookie } from "~/utils/auth";

// functions/api/register.ts
export const onRequest: PagesFunction = async (context) => {
	const { request } = context;

	const cookieHeader = request.headers.get("Cookie");
	const token = await authCookie.parse(cookieHeader);

	if (!token) {
		return new Response("認証が必要です", { status: 401 });
	}

	return new Response(
		JSON.stringify({
			success: true,
			token,
		}),
		{
			headers: { "Content-Type": "application/json" },
		},
	);
};
