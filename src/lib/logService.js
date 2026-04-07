/**
 * 診断結果と申し込み情報をGoogleスプレッドシート（GAS）に送信するサービス
 */
export const sendApplicationData = async (formData, diagnosisData) => {
  const webhookUrl = import.meta.env.VITE_GAS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("VITE_GAS_WEBHOOK_URL が設定されていないため、送信をスキップします。");
    // 開発用：URLがない場合は成功したことにして遷移を確認できるようにする
    return { success: true, mock: true };
  }

  // 送信データの整形
  const payload = {
    timestamp: new Date().toLocaleString("ja-JP"),
    // ユーザー情報
    name: formData.name,
    email: formData.email,
    phone: `'${formData.phone}`,
    zipCode: formData.zipCode,
    address: formData.address,
    currentGasCompany: formData.currentGasCompany,
    preferredTime: formData.preferredTime,
    // 診断データ
    area: diagnosisData.area,
    usage: diagnosisData.usage,
    currentBaseCharge: diagnosisData.currentBaseCharge,
    currentUnitPrice: diagnosisData.currentUnitPrice,
    newBaseCharge: diagnosisData.affiliateData?.baseCharge,
    newUnitPrice: diagnosisData.affiliateData?.unitPrice,
    yearlySavings: diagnosisData.yearlySavings,
    recommendedCompany: diagnosisData.affiliateData?.companyName,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors", // GASの仕様上、no-corsが必要な場合が多い
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // no-cors の場合、レスポンスの中身は見れないが、エラーがなければ成功とみなす
    return { success: true };
  } catch (error) {
    console.error("データ送信エラー:", error);
    throw error;
  }
};
