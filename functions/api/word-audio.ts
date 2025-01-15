export async function onRequest(context: {
	request: Request;
	env: { GC_API_KEY: string };
}) {
	try {
		const requestData: { text: string } = await context.request.json();
		const { text } = requestData;

		if (!text || text.trim() === "") {
			return new Response(JSON.stringify({ error: "Text is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${context.env.GC_API_KEY}`;

		const response = await fetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: { text: text },
				voice: {
					languageCode: "en-US",
					name: "en-US-Wavenet-A",
					ssmlGender: "NEUTRAL",
				},
				audioConfig: { audioEncoding: "LINEAR16" },
			}),
		});

		if (!response.ok) {
			throw new Error(`Google TTS API request failed: ${response.statusText}`);
		}

		const data: { audioContent: string } = await response.json();

		if (!data.audioContent) {
			throw new Error("No audio content received");
		}

		const binaryString = atob(data.audioContent);
		const audioBuffer = new Uint8Array(
			binaryString.split("").map((char) => char.charCodeAt(0)),
		);

		return new Response(audioBuffer, {
			status: 200,
			headers: {
				"Content-Type": "audio/wav",
				"Content-Length": audioBuffer.length.toString(),
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
