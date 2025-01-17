/**
 * Handles text-to-speech conversion by calling the Google Cloud Text-to-Speech API.
 *
 * @remarks
 * This function processes an incoming request with text and generates an audio response
 * using the Google Cloud Text-to-Speech service.
 *
 * @param context - The request context containing the HTTP request and API key
 * @param context.request - The incoming HTTP request with JSON payload
 * @param context.env.GC_API_KEY - The Google Cloud API key for authentication
 *
 * @returns A Response object containing the synthesized audio or an error response
 *
 * @throws {Error} Throws an error if the API request fails or request processing encounters issues
 *
 * @example
 * // Example request payload
 * {
 *   "text": "Hello, world!"
 * }
 *
 * @beta
 */
export async function onRequest(context: {
	request: Request;
	env: { GC_API_KEY: string };
}) {
	try {
		const requestData: { text: string } = await context.request.json();
		const { text } = requestData;

		const response = await fetch(
			`https://texttospeech.googleapis.com/v1/text:synthesize?key=${context.env.GC_API_KEY}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					input: { text },
					voice: {
						languageCode: "en-US",
						name: "en-US-Standard-F",
						ssmlGender: "NEUTRAL",
					},
					audioConfig: { audioEncoding: "LINEAR16" },
				}),
			},
		);

		if (!response.ok) {
			throw new Error(`API Error: "不明なエラーが発生しました"}`);
		}

		return new Response(response.body, {
			status: response.status,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error:", error);
		const statusCode =
			error instanceof Error && error.message.includes("API Error") ? 400 : 500;
		const errorMessage =
			error instanceof Error ? error.message : "Internal server error";

		return new Response(
			JSON.stringify({
				error: errorMessage,
				timestamp: new Date().toISOString(),
				requestId: context.request.headers.get("x-request-id"),
			}),
			{
				status: statusCode,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
