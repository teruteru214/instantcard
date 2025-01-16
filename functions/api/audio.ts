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
						name: "en-US-Wavenet-A",
						ssmlGender: "NEUTRAL",
					},
					audioConfig: { audioEncoding: "LINEAR16" },
				}),
			},
		);

		return new Response(response.body, {
			status: response.status,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (_error) {
		console.error("Error:", _error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
