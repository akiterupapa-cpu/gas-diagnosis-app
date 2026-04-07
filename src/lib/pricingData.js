export const affiliatePricingData = {
  hokkaido: {
    baseCharge: 1800,
    unitPrice: 450,
    companyName: "エコガス北海道",
    affiliateLink: "#"
  },
  tohoku: {
    baseCharge: 1700,
    unitPrice: 420,
    companyName: "みちのくガス診断",
    affiliateLink: "#"
  },
  kanto: {
    baseCharge: 1500,
    unitPrice: 350,
    companyName: "レモンガス（関東）",
    affiliateLink: "#"
  },
  chubu: {
    baseCharge: 1600,
    unitPrice: 380,
    companyName: "中部スマートガス",
    affiliateLink: "#"
  },
  kansai: {
    baseCharge: 1600,
    unitPrice: 370,
    companyName: "大阪ガス（取次：〇〇）",
    affiliateLink: "#"
  },
  chugoku: {
    baseCharge: 1700,
    unitPrice: 400,
    companyName: "中国エネライン",
    affiliateLink: "#"
  },
  shikoku: {
    baseCharge: 1700,
    unitPrice: 410,
    companyName: "四国ガス相談所",
    affiliateLink: "#"
  },
  kyushu: {
    baseCharge: 1600,
    unitPrice: 390,
    companyName: "九州エナジーナビ",
    affiliateLink: "#"
  },
  default: {
    baseCharge: 1700,
    unitPrice: 400,
    companyName: "全国対応ガスプラザ",
    affiliateLink: "#"
  }
};

const regionMapping = [
  { region: 'hokkaido', keywords: ['北海道'] },
  { region: 'tohoku', keywords: ['青森', '岩手', '宮城', '秋田', '山形', '福島'] },
  { region: 'kanto', keywords: ['東京', '神奈川', '埼玉', '千葉', '茨城', '栃木', '群馬'] },
  { region: 'chubu', keywords: ['愛知', '岐阜', '三重', '静岡', '山梨', '長野', '新潟', '富山', '石川', '福井'] },
  { region: 'kansai', keywords: ['大阪', '兵庫', '京都', '滋賀', '奈良', '和歌山'] },
  { region: 'chugoku', keywords: ['鳥取', '島根', '岡山', '広島', '山口'] },
  { region: 'shikoku', keywords: ['徳島', '香川', '愛媛', '高知'] },
  { region: 'kyushu', keywords: ['福岡', '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄'] }
];

export const getAreaPricing = (areaName) => {
  if (!areaName) return affiliatePricingData.default;

  for (const item of regionMapping) {
    if (item.keywords.some(keyword => areaName.includes(keyword))) {
      return affiliatePricingData[item.region];
    }
  }

  return affiliatePricingData.default;
};
