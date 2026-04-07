import { getAreaPricing } from './pricingData';

export const calculateSavings = (area, usage, currentBaseCharge, currentUnitPrice) => {
  // 1. 提案先の料金テーブルを取得
  const affiliateData = getAreaPricing(area);

  // 2. 現在の1ヶ月の料金を計算: 基本料金 + (単価 × 使用量)
  const currentMonthlyTotal = currentBaseCharge + (currentUnitPrice * usage);

  // 3. 提案先の1ヶ月の料金を計算
  const newMonthlyTotal = affiliateData.baseCharge + (affiliateData.unitPrice * usage);

  // 4. 1ヶ月の差額 と 年間の差額を計算
  const monthlySavings = currentMonthlyTotal - newMonthlyTotal;
  const yearlySavings = monthlySavings * 12;

  // 5. 判定（安くなるのか、すでに安いのか）
  // 節約額が0円以下の場合はすでに最安クラス
  const isOptimal = yearlySavings <= 0; 

  return {
    isOptimal,
    yearlySavings: Math.max(0, Math.floor(yearlySavings)),
    currentMonthlyTotal: Math.floor(currentMonthlyTotal),
    newMonthlyTotal: Math.floor(newMonthlyTotal),
    affiliateData
  };
};
