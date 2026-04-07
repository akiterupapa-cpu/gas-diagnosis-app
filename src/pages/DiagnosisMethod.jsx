import React from 'react';
import { Camera, Edit3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiagnosisMethod = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-md p-4 flex items-center bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 text-center font-bold text-slate-700 mr-8">
          入力方法の選択
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md flex-1 flex flex-col px-4 pt-8 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h2 className="text-xl font-bold text-slate-800 text-center mb-2">
          診断方法を選んでください
        </h2>
        <p className="text-slate-500 text-sm text-center mb-8">
          請求書がお手元にある場合は、写真を撮るだけで簡単に入力できます。
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/upload')}
            className="w-full bg-white p-6 rounded-2xl shadow-sm border-2 border-transparent hover:border-primary focus:border-primary active:bg-sky-50 transition active:scale-95 flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-primary group-focus:bg-primary transition-all duration-300">
              <Camera size={32} className="text-primary group-hover:text-white group-focus:text-white transition-colors" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-slate-800">請求書の写真を撮る</div>
              <div className="text-sm text-slate-500 mt-1">カメラで撮影するだけで自動入力</div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/manual')}
            className="w-full bg-white p-6 rounded-2xl shadow-sm border-2 border-transparent hover:border-slate-300 focus:border-slate-300 active:bg-slate-50 transition active:scale-95 flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 group-focus:bg-slate-200 transition-all duration-300">
              <Edit3 size={32} className="text-slate-500 transition-colors" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-slate-800">手動で入力する</div>
              <div className="text-sm text-slate-500 mt-1">お住まいのエリアや料金を自分で入力</div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default DiagnosisMethod;
