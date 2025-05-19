export interface Env {
	BACKEND_API_URL: string;
	ASSETS: {
		fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
	};
}
