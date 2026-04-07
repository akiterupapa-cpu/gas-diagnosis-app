import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, AlertCircle, Info, ThumbsUp, TrendingDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { calculateSavings } from '../lib/calculateSavings';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [displaySavings, setDisplaySavings] = useState(0);

  useEffect(() => {
    const inputData = location.state?.inputData;
    let result;

    if (inputData) {
      result = calculateSavings(
        inputData.area, 
        inputData.usage, 
        inputData.baseCharge, 
        inputData.unitPrice
      );
    } else {
      result = {
        area: "東京都（テスト）",
        usage: 25,
        currentBaseCharge: 1500,
        currentUnitPrice: 400,
        isOptimal: false,
        yearlySavings: 31200,
        currentMonthlyTotal: 12000,
        newMonthlyTotal: 9400,
        affiliateData: {
          companyName: "おすすめエコガス(仮)",
          affiliateLink: "#"
        }
      };
    }
    
    setDiagnosisResult(result);

    if (!result.isOptimal) {
      const controls = animate(0, result.yearlySavings, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (value) => setDisplaySavings(Math.floor(value))
      });
      return () => controls.stop();
    }
  }, [location]);

  if (!diagnosisResult) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50 flex flex-col items-center"
    >
      <header className="w-full max-w-md p-4 flex items-center bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 text-center font-bold text-slate-700 mr-8">
          診断結果
        </div>
      </header>

      <main className="w-full max-w-md flex-1 px-4 pt-8 pb-32">
        {diagnosisResult.isOptimal ? (
          <motion.div variants={itemVariants}>
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
          </motion.div>
        ) : (
          <>
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-lg font-bold text-slate-600 mb-2 flex items-center justify-center gap-2">
                <TrendingDown className="text-red-500" size={20} />
                あなたの年間削減可能額
              </h2>
              <div className="text-6xl font-black text-red-500 my-4 tracking-tighter tabular-nums drop-shadow-sm">
                {displaySavings.toLocaleString()}<span className="text-2xl font-bold ml-1">円</span>
              </div>
              <div className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-sm border border-red-100">
                固定費の見直しチャンスです！
              </div>
            </motion.div>

            {/* Visual Comparison Chart */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h3 className="text-sm font-bold text-slate-500 mb-4 text-center uppercase tracking-wider">月々の料金イメージ（比較）</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-400">
                    <span>現在のガス代</span>
                    <span>約 {diagnosisResult.currentMonthlyTotal?.toLocaleString()}円</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5 text-primary">
                    <span>乗り換え後のガス代</span>
                    <span>約 {diagnosisResult.newMonthlyTotal?.toLocaleString()}円</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(diagnosisResult.newMonthlyTotal / diagnosisResult.currentMonthlyTotal) * 100}%` }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <h3 className="font-bold text-slate-800">おすすめの切替先:<br/>【{diagnosisResult.affiliateData?.companyName}】</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                今の基本料金や単価より安く設定されているため、確実な節約が見込めます。初期費用・解約違約金も一切かかりません。
              </p>
              <button 
                onClick={() => navigate('/apply', { state: { diagnosisResult } })}
                className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:brightness-105 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-emerald-200 transform transition active:scale-95 flex items-center justify-center gap-2"
              >
                無料でお申し込み <ChevronRight size={20} />
              </button>
            </motion.div>
          </>
        )}

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Info size={18} className="text-primary" /> ガス以外の節約もご提案できます
          </h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">電気代やインターネット回線の見直しで、さらに年間の固定費を削れる可能性があります。</p>
          <button className="w-full bg-[#06C755] hover:bg-[#05b04c] text-white font-bold py-3.5 rounded-xl shadow-lg transition active:scale-95">
            公式LINEで無料相談する
          </button>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Result;
