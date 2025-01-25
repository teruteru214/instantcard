export async function onRequest(context: {
	request: Request;
	env: { GC_API_KEY: string; AUDIO_CACHE: KVNamespace };
}) {
	try {
		const requestData: { text: string } = await context.request.json();
		const { text } = requestData;

		const cacheKey = `audio_${encodeURIComponent(text.trim())}`;
		const cachedAudio = await context.env.AUDIO_CACHE.get(
			cacheKey,
			"arrayBuffer",
		);

		if (cachedAudio) {
			// キャッシュが存在する場合
			return new Response(cachedAudio, {
				status: 200,
				headers: {
					"Content-Type": "audio/wav",
				},
			});
		}

		// キャッシュが存在しない場合、音声データを生成
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
			const errorBody: { error?: { message?: string } } = await response.json();
			throw new Error(
				`API Error: ${response.status} - ${errorBody.error?.message || "不明なエラーが発生しました"}`,
			);
		}

		const audioBuffer = await response.arrayBuffer();

		// 生成した音声データをキャッシュに保存（TTLを設定して自動削除）
		await context.env.AUDIO_CACHE.put(cacheKey, audioBuffer, {
			expirationTtl: 86400,
		}); // 24時間（86400秒）

		return new Response(audioBuffer, {
			status: 200,
			headers: {
				"Content-Type": "audio/wav",
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
