// クライアントからは自社サーバー(Vercel Functions: /api/ocr)を経由してOpenAIを呼ぶ。
// APIキーをブラウザに渡さないため、ここには認証情報は一切含めない。
export const analyzeReceipt = async (base64Image) => {
  try {
    const response = await fetch("/api/ocr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // サーバー側でAPIキー未設定などの場合もここに来る。
      // ユーザー体験を壊さないようダミーで返すフォールバックも検討可。
      console.error("OCR API error:", response.status, errorData);
      throw new Error(errorData.error || `OCR APIエラー (status ${response.status})`);
    }

    const result = await response.json();
    return {
      area: result.area || "不明",
      usage: parseFloat(result.usage) || 0,
      baseCharge: parseFloat(result.baseCharge) || 0,
      unitPrice: parseFloat(result.unitPrice) || 0,
    };
  } catch (error) {
    console.error("OCR解析に失敗しました:", error);
    throw error;
  }
};
