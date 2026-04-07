export const analyzeReceipt = async (base64Image) => {
  // Viteの環境変数からAPIキーを取得
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("APIキーが設定されていないため、ダミーの解析結果を返します。");
    // APIキーがない場合の仮データ
    return {
      area: "東京都（API未連携ダミー）",
      usage: 25.0,
      baseCharge: 1800,
      unitPrice: 400
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "あなたは優秀なデータ抽出アシスタントです。提供されるJSONスキーマの形式のみで回答してください。"
          },
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: `このガスの請求書・利用控えの画像から以下の4つの数値を抽出してください。
1. area: 都道府県・市区町村名（例: "東京都世田谷区"）
2. usage: 今月の「使用量」 ㎥（例: 15.5 のような数値のみ）
3. baseCharge: 「基本料金」 円（例: 1500 のような数値のみ）
4. unitPrice: 「従量単価」 円/㎥（例: 350.5 のような数値のみ、複数ある場合は最もウェイトの高いものを1つ）

明記されていない、または読み取れない項目は「0」または空白としてください。必ず以下の形式のJSON文字列のみを出力してください。
{"area": "...", "usage": 0.0, "baseCharge": 0, "unitPrice": 0.0}` 
              },
              { 
                type: "image_url", 
                image_url: { "url": base64Image } 
              }
            ]
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 300,
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error("OpenAI API Error:", data.error.message);
      throw new Error(data.error.message);
    }

    const resultJson = JSON.parse(data.choices[0].message.content);
    
    return {
      area: resultJson.area || "不明",
      usage: parseFloat(resultJson.usage) || 0,
      baseCharge: parseFloat(resultJson.baseCharge) || 0,
      unitPrice: parseFloat(resultJson.unitPrice) || 0
    };
    
  } catch (error) {
    console.error("OCR解析に失敗しました:", error);
    throw error;
  }
};
