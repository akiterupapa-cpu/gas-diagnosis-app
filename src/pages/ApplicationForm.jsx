import React, { useState } from 'react';
import { ArrowLeft, Send, ShieldCheck, HelpCircle, Phone, Mail, User, MapPin, Building2, Clock, Search, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sendApplicationData } from '../lib/logService';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const diagnosisResult = location.state?.diagnosisResult;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    currentGasCompany: '',
    preferredTime: 'いつでも可',
    agreePrivacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearchingZip, setIsSearchingZip] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleZipSearch = async () => {
    const zip = formData.zipCode.replace(/[^0-9]/g, '');
    if (zip.length !== 7) {
      setError('郵便番号は7桁で入力してください。');
      return;
    }

    try {
      setIsSearchingZip(true);
      setError('');
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
      const data = await response.json();
      
      if (data.results) {
        const res = data.results[0];
        const fullAddress = `${res.address1}${res.address2}${res.address3}`;
        setFormData(prev => ({ ...prev, address: fullAddress }));
      } else {
        setError('該当する住所が見つかりませんでした。');
      }
    } catch (err) {
      setError('住所検索に失敗しました。');
    } finally {
      setIsSearchingZip(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreePrivacy) {
      setError('個人情報保護方針への同意が必要です。');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      await sendApplicationData(formData, diagnosisResult || {});
      
      navigate('/success');
    } catch (err) {
      console.error(err);
      setError('送信中にエラーが発生しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const inputClass = "w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium";
  const labelClass = "block text-xs font-black text-slate-400 mb-2 ml-1 uppercase tracking-widest";

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
          お申し込みフォーム
        </div>
      </header>

      <main className="w-full max-w-md flex-1 px-4 pt-6 pb-20">
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-4 mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
              <ShieldCheck size={28} />
            </div>
            <div className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight">
              情報は厳重に管理され、<br/>診断以外の目的には使用しません。
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex gap-2 items-center"
                >
                  <HelpCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <label className={labelClass}><User size={14} className="inline mr-1" /> ご氏名</label>
              <input required type="text" name="name" placeholder="例：山田 太郎" className={inputClass} value={formData.name} onChange={handleChange} />
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div variants={itemVariants}>
                <label className={labelClass}><Mail size={14} className="inline mr-1" /> メールアドレス</label>
                <input required type="email" name="email" placeholder="example@mail.com" className={inputClass} value={formData.email} onChange={handleChange} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className={labelClass}><Phone size={14} className="inline mr-1" /> 電話番号</label>
                <input required type="tel" name="phone" placeholder="09012345678" className={inputClass} value={formData.phone} onChange={handleChange} />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label className={labelClass}><MapPin size={14} className="inline mr-1" /> 郵便番号</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="zipCode" 
                  placeholder="1000001 (ハイフンなし可)" 
                  className={inputClass} 
                  value={formData.zipCode} 
                  onChange={handleChange} 
                />
                <button 
                  type="button" 
                  onClick={handleZipSearch}
                  disabled={isSearchingZip}
                  className="bg-slate-800 text-white px-5 rounded-xl text-sm font-bold active:scale-95 transition disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                >
                  {isSearchingZip ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                  検索
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className={labelClass}><MapPin size={14} className="inline mr-1" /> ご住所</label>
              <input required type="text" name="address" placeholder="都道府県から入力してください" className={inputClass} value={formData.address} onChange={handleChange} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className={labelClass}><Building2 size={14} className="inline mr-1" /> 現在のガス会社</label>
              <input required type="text" name="currentGasCompany" placeholder="例：東京ガス、レモンガス等" className={inputClass} value={formData.currentGasCompany} onChange={handleChange} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className={labelClass}><Clock size={14} className="inline mr-1" /> 連絡希望時間帯</label>
              <select name="preferredTime" className={inputClass} value={formData.preferredTime} onChange={handleChange}>
                <option value="いつでも可">いつでも可</option>
                <option value="午前中（9時〜12時）">午前中（9時〜12時）</option>
                <option value="お昼頃（12時〜14時）">お昼頃（12時〜14時）</option>
                <option value="午後（14時〜17時）">午後（14時〜17時）</option>
                <option value="夕方以降（17時〜19時）">夕方以降（17時〜19時）</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    name="agreePrivacy" 
                    className="w-6 h-6 rounded-lg border-slate-300 text-primary focus:ring-primary bg-slate-50 transition" 
                    checked={formData.agreePrivacy} 
                    onChange={handleChange} 
                  />
                </div>
                <span className="text-xs text-slate-500 font-bold leading-relaxed group-hover:text-slate-700 transition">
                  個人情報保護方針および利用規約に同意して、<br/>
                  無料診断お申し込みを確定します。
                </span>
              </label>
            </motion.div>

            <motion.button 
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-primary to-accent hover:brightness-105 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-sky-200 transform transition active:scale-95 flex items-center justify-center gap-3 mt-8 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
            >
              {isSubmitting ? <><Loader2 size={24} className="animate-spin" /> 送信中...</> : <><Send size={22} /> お申し込みを確定する</>}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default ApplicationForm;
