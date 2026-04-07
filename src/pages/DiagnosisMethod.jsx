import React from 'react';
import { Camera, Edit3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DiagnosisMethod = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen bg-slate-50 flex flex-col items-center"
    >
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
      <main className="w-full max-w-md flex-1 flex flex-col px-4 pt-8 pb-20">
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-slate-800 text-center mb-2 font-black tracking-tight">
          診断方法を選んでください
        </motion.h2>
        <motion.p variants={itemVariants} className="text-slate-500 text-sm text-center mb-8 font-medium">
          請求書がお手元にある場合は、写真を撮るだけで簡単に入力できます。
        </motion.p>

        <div className="space-y-4">
          <motion.button 
            variants={itemVariants}
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
          </motion.button>

          <motion.button 
            variants={itemVariants}
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
          </motion.button>
        </div>
      </main>
    </motion.div>
  );
};

export default DiagnosisMethod;
