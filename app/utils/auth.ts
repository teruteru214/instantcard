import { createCookie } from "@remix-run/cloudflare";
import {
	type Auth,
	GoogleAuthProvider,
	type UserCredential,
	signInWithPopup,
} from "firebase/auth";

interface GoogleProfile {
	email: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	locale: string;
}

interface AdditionalUserInfo {
	isNewUser: boolean;
	providerId: string | null;
	profile: GoogleProfile | null;
}

interface ExtendedUserCredential extends UserCredential {
	additionalUserInfo: AdditionalUserInfo | null;
}

export const authCookie = createCookie("firebase_token", {
	secure: true,
	sameSite: "lax",
	path: "/",
	maxAge: 60 * 60 * 24 * 14,
	httpOnly: true,
});

// Googleログイン
export const signInWithGoogle = async (
	auth: Auth,
): Promise<{ token: string; isNewUser: boolean }> => {
	try {
		const provider = new GoogleAuthProvider();
		const result = (await signInWithPopup(
			auth,
			provider,
		)) as ExtendedUserCredential;
		const token = await result.user.getIdToken();
		const isNewUser = result.additionalUserInfo?.isNewUser ?? false;

		return { token, isNewUser };
	} catch (error) {
		console.error("Googleログインエラー:", error);
		throw error;
	}
};
