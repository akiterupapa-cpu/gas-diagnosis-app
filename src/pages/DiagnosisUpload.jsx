import React, { useState, useRef } from 'react';
import { ArrowLeft, Image as ImageIcon, Camera, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeReceipt } from '../lib/ocrService';

const DiagnosisUpload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [errorObj, setErrorObj] = useState(null);
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    if (fileInputRef.current && !isUploading) {
      setErrorObj(null);
      fileInputRef.current.click();
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorObj(null);

      const base64Image = await fileToBase64(file);
      const analysisData = await analyzeReceipt(base64Image);

      navigate('/result', {
        state: {
          inputData: {
            area: analysisData.area,
            usage: analysisData.usage,
            baseCharge: analysisData.baseCharge,
            unitPrice: analysisData.unitPrice
          }
        }
      });
    } catch (err) {
      console.error(err);
      setErrorObj("画像の解析に失敗しました。もう一度はっきりと撮影するか、手動入力画面をお試しください。");
    } finally {
      setIsUploading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen bg-slate-50 flex flex-col items-center"
    >
      <header className="w-full max-w-md p-4 flex items-center bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 text-center font-bold text-slate-700 mr-8 uppercase tracking-tight">
          画像のアップロード
        </div>
      </header>

      <main className="w-full max-w-md flex-1 flex flex-col px-4 pt-6 pb-20">
        <AnimatePresence>
          {errorObj && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-2xl mb-4 text-xs font-bold flex gap-2 items-start border border-red-100"
            >
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p>{errorObj}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-6 text-center"
        >
          <h2 className="font-bold text-slate-800 mb-2 tracking-tight">請求書全体が写るように撮影してください</h2>
          <p className="text-xs text-slate-500 mb-8 font-medium">金額と使用量がはっきり見えると正確に診断できます。</p>

          <div 
            className={`w-full aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-sky-50 hover:border-primary/30 transition-all relative overflow-hidden ${isUploading ? 'pointer-events-none' : ''}`}
            onClick={handleDivClick}
          >
            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 text-primary"
                >
                  <Loader2 size={48} className="animate-spin" />
                  <span className="font-black animate-pulse text-lg tracking-widest uppercase">解析中...</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex gap-4 text-slate-300 mb-4">
                    <Camera size={48} />
                    <ImageIcon size={48} />
                  </div>
                  <div className="text-slate-700 font-black text-xl mb-1">
                    タップしてカメラ起動
                  </div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    または写真フォルダから選択
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-sky-50 rounded-2xl p-5 text-xs text-slate-600 font-bold flex gap-4 items-start border border-sky-100 leading-relaxed"
        >
          <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
          <p>読み取った画像データは診断の計算のみに使用され、保存・送信されることはありませんのでご安心ください。</p>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default DiagnosisUpload;
