import React from 'react';
import { CheckCircle, Home, PhoneCall, MailCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SuccessPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen bg-white flex flex-col items-center"
    >
      <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center px-8 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-10 shadow-xl shadow-green-100/50"
        >
          <CheckCircle size={48} strokeWidth={2.5} />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-3xl font-black text-slate-800 mb-4 tracking-tight">
          送信が完了しました！
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-slate-500 mb-12 leading-relaxed font-bold">
          お申し込みいただき、誠にありがとうございます。<br/>
          内容を確認の上、担当者より<br/>
          <span className="text-primary">24時間以内</span>にご連絡させていただきます。
        </motion.p>

        <motion.div variants={itemVariants} className="w-full bg-slate-50 rounded-3xl p-8 mb-12 space-y-6 border border-slate-100">
          <div className="flex items-center gap-5 text-left">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
              <PhoneCall size={24} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">電話連絡の場合</div>
              <div className="text-sm font-bold text-slate-700 leading-tight">お電話番号宛に<br/>ご連絡いたします。</div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-left">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
              <MailCheck size={24} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">メール連絡の場合</div>
              <div className="text-sm font-bold text-slate-700 leading-tight">メールアドレス宛に<br/>控えを送付しました。</div>
            </div>
          </div>
        </motion.div>

        <motion.button 
          variants={itemVariants}
          onClick={() => navigate('/')}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-slate-200 transform transition active:scale-95 flex items-center justify-center gap-3"
        >
          トップページへ戻る <Home size={22} />
        </motion.button>
      </main>

      <footer className="w-full max-w-md p-8 text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
        &copy; 2026 ガス代診断プロ. All rights reserved.
      </footer>
    </motion.div>
  );
};

export default SuccessPage;
