import React, { useState, useRef } from 'react';
import { ArrowLeft, Image as ImageIcon, Camera, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeReceipt } from '../lib/ocrService';

const DiagnosisUpload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [errorObj, setErrorObj] = useState(null);
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    // divがクリックされたら、隠してある実際のファイルinputをクリックさせる
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

      // 画像をBase64に変換してAIへ送信
      const base64Image = await fileToBase64(file);
      const analysisData = await analyzeReceipt(base64Image);

      // 読み取ったデータを持って結果画面へ遷移
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <header className="w-full max-w-md p-4 flex items-center bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 text-center font-bold text-slate-700 mr-8">
          画像のアップロード
        </div>
      </header>

      <main className="w-full max-w-md flex-1 flex flex-col px-4 pt-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-300">
        {errorObj && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm flex gap-2 items-start border border-red-100">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p>{errorObj}</p>
          </div>
        )}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 text-center">
          <h2 className="font-bold text-slate-800 mb-2">請求書全体が写るように撮影してください</h2>
          <p className="text-sm text-slate-500 mb-6">金額と使用量がはっきり見えると正確に診断できます。</p>

          <div 
            className={`w-full aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex border-primary/50 flex-col items-center justify-center gap-3 cursor-pointer hover:bg-sky-50 transition relative ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
            onClick={handleDivClick}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-3 text-primary animate-in zoom-in duration-300">
                <Loader2 size={40} className="animate-spin text-primary" />
                <span className="font-bold animate-pulse text-lg mt-2">文字を解析中...</span>
              </div>
            ) : (
              <>
                <div className="flex gap-4 text-slate-400">
                  <Camera size={42} />
                  <ImageIcon size={42} />
                </div>
                <div className="text-slate-600 font-bold text-lg">
                  タップしてカメラ起動
                </div>
                <div className="text-sm text-slate-400">
                  または写真フォルダから選択
                </div>
              </>
            )}
            
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="bg-sky-50 rounded-xl p-4 text-sm text-slate-600 flex gap-3 items-start border border-sky-100">
          <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={18} />
          <p>読み取った画像データは診断の計算のみに使用され、保存・送信されることはありませんのでご安心ください。</p>
        </div>
      </main>
    </div>
  );
};

export default DiagnosisUpload;
