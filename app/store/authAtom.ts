// app/store/authAtom.ts
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { UserSchema } from "schema/user";
import { authCookie } from "~/utils/auth";

const authAtom = atom(async () => {
	if (typeof document === "undefined") return null;

	const token = await authCookie.parse(document.cookie);
	if (!token) return null;

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);

		const response = await fetch("/workers/auth/find-user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) return null;

		const json = await response.json();
		const result = UserSchema.safeParse(json);

		if (!result.success) {
			console.error("Invalid user data:", result.error);
			return null;
		}

		const userData = {
			...result.data,
			img: result.data.img ?? undefined,
			speaker: result.data.speaker ?? undefined,
		};

		return userData;
	} catch (error) {
		console.error("Authentication check failed:", error);
		return null;
	}
});

// loadableでラップして、ローディング状態を管理
export const loadableAuthAtom = loadable(authAtom);

export const isLoggedInAtom = atom((get) => {
	const auth = get(loadableAuthAtom);
	return (
		auth.state === "hasData" && auth.data !== null && auth.data !== undefined
	);
});
