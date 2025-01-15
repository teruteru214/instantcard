export async function onRequest(context: {
	request: Request;
	env: { AUDIO_URL: string };
}) {
	try {
		const AUDIO_URL = context.env.AUDIO_URL;

		const requestData: { text: string } = await context.request.json();
		const { text } = requestData;

		if (!text) {
			return new Response(JSON.stringify({ error: "Text is required." }), {
				status: 400,
			});
		}

		const audioResponse = await fetch(AUDIO_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});

		if (!audioResponse.ok) {
			return new Response(
				JSON.stringify({ error: "Failed to fetch audio file." }),
				{ status: 500 },
			);
		}

		const audioBlob = await audioResponse.blob();

		return new Response(audioBlob, {
			status: 200,
			headers: {
				"Content-Type": "audio/wav",
			},
		});
	} catch (error) {
		console.error("Error:", error);
		return new Response(JSON.stringify({ error: "Internal server error." }), {
			status: 500,
		});
	}
}
