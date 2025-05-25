// app/store/authAtom.ts
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { authCookie } from "~/utils/auth";
import type { User } from "./userAtom";

const authAtom = atom(async () => {
	const token = await authCookie.parse(document.cookie);
	if (!token) return null;

	const response = await fetch("/workers/auth/find-user", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token }),
	});

	if (!response.ok) return null;
	return response.json() as Promise<User>;
});

// loadableでラップして、ローディング状態を管理
export const loadableAuthAtom = loadable(authAtom);

export const isLoggedInAtom = atom((get) => {
	const auth = get(loadableAuthAtom);
	return auth.state === "hasData" && auth.data !== null;
});
