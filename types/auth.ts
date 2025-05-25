import type { User } from "~/store/userAtom";

export interface AuthError {
	code: string;
	message: string;
	status: number;
}

export interface AuthState {
	status: "idle" | "loading" | "error" | "success";
	error?: AuthError;
	user?: User;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface LoginRequest {
	token: string;
}
