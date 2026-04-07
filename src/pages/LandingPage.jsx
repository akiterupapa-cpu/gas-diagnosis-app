import React from 'react';
import { Flame, ArrowRight, CheckCircle2, ShieldCheck, Camera, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col items-center"
    >
      {/* Header */}
      <header className="w-full max-w-md p-4 flex justify-center items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-sky-100">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-primary-dark font-bold text-xl"
        >
          <Flame className="text-primary" size={24} fill="currentColor" />
          <span>ガス代診断プロ</span>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center px-4 pt-8 pb-20">
        
        {/* Hero Section */}
        <div className="text-center mb-10 w-full">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl font-extrabold text-slate-800 leading-tight mb-4"
          >
            あなたのガス代、<br/>
            <span className="text-red-500 bg-red-50 px-2 rounded-md">高すぎない？</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-slate-600 mb-8 font-medium"
          >
            スマホでカンタン、10秒でわかる。<br/>毎月の無駄なガス代を無料診断。
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="bg-white p-5 rounded-2xl shadow-xl shadow-sky-100/50 border border-sky-50"
          >
            <h2 className="text-lg font-bold text-center mb-4 text-slate-700 flex justify-center items-center gap-2">
              <ShieldCheck className="text-green-500" size={20} />
              使い方はとっても簡単！
            </h2>
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-center gap-3 text-slate-600">
                <Camera className="text-primary shrink-0" size={18} />
                <span>請求書の写真を撮るだけ！</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <Edit3 className="text-primary shrink-0" size={18} />
                <span>スマホからの手入力も可能！</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <CheckCircle2 className="text-primary shrink-0" size={18} />
                <span>完全無料で診断可能</span>
              </li>
            </ul>
            
            <button 
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 transform transition active:scale-95 flex items-center justify-center gap-2"
              onClick={() => navigate('/method')}
            >
              無料診断スタート <ArrowRight size={20} />
            </button>
            <p className="text-xs text-slate-400 mt-3 text-center">
              ※診断結果からそのまま最適な会社へ切り替え可能です
            </p>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;
