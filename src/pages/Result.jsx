import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, AlertCircle, Info, ThumbsUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { calculateSavings } from '../lib/calculateSavings';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [savings, setSavings] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  useEffect(() => {
    const inputData = location.state?.inputData;
    
    let result;
    if (inputData) {
      // 手動入力の場合
      result = calculateSavings(
        inputData.area, 
        inputData.usage, 
        inputData.baseCharge, 
        inputData.unitPrice
      );
    } else {
      // ダミーデータ
      result = {
        isOptimal: false,
        yearlySavings: 31200,
        affiliateData: {
          companyName: "おすすめエコガス(仮)",
          affiliateLink: "#"
        }
      };
    }
    
    setDiagnosisResult(result);

    if (!result.isOptimal) {
      const target = result.yearlySavings;
      const duration = 1500;
      const steps = 60;
      const stepTime = Math.abs(Math.floor(duration / steps));
      
      let current = 0;
      const timer = setInterval(() => {
        current += target / steps;
        if (current >= target) {
          setSavings(target);
          clearInterval(timer);
        } else {
          setSavings(Math.floor(current));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [location]);

  if (!diagnosisResult) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <header className="w-full max-w-md p-4 flex items-center bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 text-center font-bold text-slate-700 mr-8">
          診断結果
        </div>
      </header>

      <main className="w-full max-w-md flex-1 px-4 pt-8 pb-32 animate-in fade-in zoom-in-95 duration-500">
        {diagnosisResult.isOptimal ? (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">素晴らしいです！</h2>
              <p className="text-slate-600 font-medium">
                あなたのガス料金は、お住まいのエリアで<br/>すでに最安クラスです。
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                現在ご契約中のガス会社は非常に良心的な価格設定です。今のところガス会社を変更する必要はありません。
              </p>
              <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-2 border border-blue-100">
                このまま契約を継続しましょう！
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Info size={18} className="text-primary" /> ガス以外の節約もご提案できます
              </h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">電気代やインターネット回線の見直しで、さらに年間の固定費を削れる可能性があります。</p>
              <button className="w-full bg-[#06C755] hover:bg-[#05b04c] text-white font-bold py-3.5 rounded-xl shadow-lg transition active:scale-95">
                公式LINEで無料相談する
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-slate-700 mb-2">あなたにぴったりのガス会社なら</h2>
              <p className="text-slate-500">1年間で約...</p>
              <div className="text-5xl font-extrabold text-red-500 my-4 tracking-tight drop-shadow-sm">
                {savings.toLocaleString()}<span className="text-3xl ml-1">円</span>
              </div>
              <div className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-sm border border-red-100">
                も安くなる可能性があります！
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <h3 className="font-bold text-slate-800">おすすめの切替先:<br/>【{diagnosisResult.affiliateData.companyName}】</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                今の基本料金や単価より安く設定されているため、確実な節約が見込めます。初期費用・解約違約金も一切かかりません。
              </p>
              <button 
                onClick={() => window.location.href = diagnosisResult.affiliateData.affiliateLink}
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-emerald-500/30 transform transition active:scale-95 flex items-center justify-center gap-2"
              >
                無料でお申し込み <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="flex items-start gap-2 text-[11px] text-slate-400 px-2 leading-relaxed">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p>提示している金額は概算であり、実際の使用状況により変動する場合があります。<br/>賃貸住宅の場合でも、ガス会社との契約名義がご自身であれば問題なく切り替えが可能です。</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Result;
