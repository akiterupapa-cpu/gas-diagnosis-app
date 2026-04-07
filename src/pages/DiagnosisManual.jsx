import React, { useState } from 'react';
import { ArrowLeft, MapPin, Activity, DollarSign, Zap, Calculator, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DiagnosisManual = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    area: '',
    usage: '',
    baseCharge: '',
    unitPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/result', { 
      state: { 
        inputData: {
          area: formData.area,
          usage: parseFloat(formData.usage),
          baseCharge: parseFloat(formData.baseCharge),
          unitPrice: parseFloat(formData.unitPrice)
        }
      } 
    });
  };

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

  const inputClass = "w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition shadow-sm text-slate-700 font-medium placeholder:text-slate-300";
  const labelClass = "text-xs font-black text-slate-400 flex items-center gap-2 mb-2 ml-1 uppercase tracking-widest";

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
          手動入力で診断
        </div>
      </header>

      <main className="w-full max-w-md flex-1 px-4 pt-6 pb-24">
        <motion.div variants={itemVariants} className="text-slate-500 text-xs font-bold mb-8 bg-primary/5 p-5 rounded-2xl border border-primary/10 leading-relaxed flex gap-3">
          <HelpCircle size={20} className="shrink-0 text-primary" />
          <p>お手元の請求書（検針票）を確認しながら、以下の4項目をご入力ください。正確な診断が可能になります。</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <motion.div variants={itemVariants}>
            <label className={labelClass}>
              <MapPin size={14} /> お住まいのエリア
            </label>
            <input 
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="例：東京都世田谷区"
              required
              className={inputClass}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className={labelClass}>
              <Activity size={14} /> 今月の使用量
            </label>
            <div className="relative">
              <input 
                type="number"
                name="usage"
                inputMode="decimal"
                step="0.1"
                value={formData.usage}
                onChange={handleChange}
                placeholder="例：15.5"
                required
                className={inputClass}
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">m³</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-5">
            <motion.div variants={itemVariants}>
              <label className={labelClass}>
                <DollarSign size={14} /> 基本料金
              </label>
              <div className="relative">
                <input 
                  type="number"
                  name="baseCharge"
                  inputMode="numeric"
                  value={formData.baseCharge}
                  onChange={handleChange}
                  placeholder="1500"
                  required
                  className={inputClass}
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">円</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className={labelClass}>
                <Zap size={14} /> 従量単価
              </label>
              <div className="relative">
                <input 
                  type="number"
                  name="unitPrice"
                  inputMode="decimal"
                  step="0.1"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  placeholder="450"
                  required
                  className={inputClass}
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">円</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="pt-6">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:brightness-110 text-white font-black text-lg py-5 rounded-3xl shadow-xl shadow-slate-200 transform transition active:scale-95 flex items-center justify-center gap-3"
            >
              診断を開始する <Calculator size={22} />
            </button>
          </motion.div>
        </form>
      </main>
    </motion.div>
  );
};

export default DiagnosisManual;
