// Vercel Serverless Function: OpenAI APIキーをサーバー側で保持し
// クライアントには絶対に渡さないためのプロキシ。
//
// 受け取るbody: { image: "data:image/...;base64,...." }
// 返すbody:    { area, usage, baseCharge, unitPrice }
//
// 環境変数 OPENAI_API_KEY を Vercel ダッシュボードに登録すること。

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });
  }

  const { image } = req.body || {};
  if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
    return res.status(400).json({ error: "Invalid request body. Expecting { image: 'data:image/...;base64,...' }" });
  }

  const prompt = `このガスの請求書・検針票の画像から以下の4つの情報を抽出してください。

【抽出項目】
1. area: 都道府県・市区町村名。請求書の宛先住所、発行者の所在地、明示的な地名表記から読み取る（例: "大分県佐伯市"）。住所が一切見当たらない場合のみ空文字列 ""。会社名のみからの推測は避けるが、「○○市ガス」のように地名を含む会社名があれば手がかりとして使ってよい。
2. usage: 「使用量」「消費量」「ご使用量」「指針差引」などの今月分のm³数値（例: 8.2）。読めなければ0。
3. baseCharge: 「基本料金」円（例: 1721）。読めなければ0。「原料調整費」「設備料金」とは別。
4. unitPrice: 「従量単価」「従量料金単価」「単位料金」円/㎥（例: 506）。階段料金なら使用量に該当するレンジの単価。「原料調整単価」「燃調費」は除外。読めなければ0。

【出力ルール】
- 画像に書かれている値を素直に抽出してください。
- 読めない数値は0、読めない地域は空文字列を返してください。
- 数字部分のみ抽出（円・m3などの単位は含めない）。

必ず以下の形式のJSON文字列のみを出力してください。
{"area": "...", "usage": 0.0, "baseCharge": 0, "unitPrice": 0.0}`;

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "あなたは優秀なデータ抽出アシスタントです。提供されるJSONスキーマの形式のみで回答してください。",
          },
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 300,
      }),
    });

    const data = await upstream.json();
    if (data.error) {
      console.error("OpenAI API Error:", data.error.message);
      return res.status(502).json({ error: data.error.message });
    }

    const resultJson = JSON.parse(data.choices[0].message.content);
    return res.status(200).json({
      area: resultJson.area || "不明",
      usage: parseFloat(resultJson.usage) || 0,
      baseCharge: parseFloat(resultJson.baseCharge) || 0,
      unitPrice: parseFloat(resultJson.unitPrice) || 0,
    });
  } catch (err) {
    console.error("OCR proxy error:", err);
    return res.status(500).json({ error: "OCR処理に失敗しました。" });
  }
}

export const config = {
  api: {
    bodyParser: { sizeLimit: "10mb" },
  },
};
