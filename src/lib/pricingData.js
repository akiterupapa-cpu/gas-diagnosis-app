export const affiliatePricingData = {
  kanto: {
    baseCharge: 1500,
    unitPrice: 350,
    companyName: "〇〇ガス（関東エリア）",
    affiliateLink: "#"
  },
  kansai: {
    baseCharge: 1600,
    unitPrice: 370,
    companyName: "△△ガス（関西エリア）",
    affiliateLink: "#"
  },
  default: {
    baseCharge: 1700,
    unitPrice: 400,
    companyName: "おすすめ定額ガス",
    affiliateLink: "#"
  }
};

export const getAreaPricing = (areaName) => {
  if (!areaName) return affiliatePricingData.default;
  if (areaName.includes('東京') || areaName.includes('神奈川') || areaName.includes('埼玉') || areaName.includes('千葉') || areaName.includes('群馬') || areaName.includes('栃木') || areaName.includes('茨城')) {
    return affiliatePricingData.kanto;
  }
  if (areaName.includes('大阪') || areaName.includes('京都') || areaName.includes('兵庫') || areaName.includes('奈良') || areaName.includes('滋賀') || areaName.includes('和歌山')) {
    return affiliatePricingData.kansai;
  }
  return affiliatePricingData.default;
};
