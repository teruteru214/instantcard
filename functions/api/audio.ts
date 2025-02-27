export async function onRequest(context: {
	request: Request;
	env: { GC_API_KEY: string };
}) {
	try {
		const requestData: { text: string; speaker: string } =
			await context.request.json();
		const { text, speaker } = requestData;

		const cache = await caches.open("default");
		const cacheKey = new Request(
			`${context.request.url}?text=${encodeURIComponent(text.trim())}&speaker=${encodeURIComponent(speaker)}`,
		);
		const cachedResponse = await cache.match(cacheKey);

		if (cachedResponse) {
			return cachedResponse;
		}

		const response = await fetch(
			`https://texttospeech.googleapis.com/v1/text:synthesize?key=${context.env.GC_API_KEY}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					input: { text },
					voice: {
						languageCode: "en-US",
						name: speaker,
					},
					audioConfig: { audioEncoding: "LINEAR16" },
				}),
			},
		);

		if (!response.ok) {
			const errorBody: { error?: { message?: string } } = await response.json();
			throw new Error(
				`API Error: ${response.status} - ${errorBody.error?.message || "不明なエラーが発生しました"}`,
			);
		}

		const audioBuffer = await response.arrayBuffer();
		const newResponse = new Response(audioBuffer, {
			status: 200,
			headers: {
				"Content-Type": "audio/wav",
				"Cache-Control": "public, max-age=86400",
			},
		});

		await cache.put(cacheKey, newResponse.clone());

		return newResponse;
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
