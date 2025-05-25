import { atom } from "jotai";

export interface User {
	id: string;
	name: string;
	img?: string;
	speaker?: string;
}

export const userAtom = atom<User | null>(null);
