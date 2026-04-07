import React, { useState } from 'react';
import { ArrowLeft, MapPin, Activity, DollarSign, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <header className="w-full max-w-md p-4 flex items-center bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 text-center font-bold text-slate-700 mr-8">
          手動入力で診断
        </div>
      </header>

      <main className="w-full max-w-md flex-1 px-4 pt-6 pb-24 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="text-slate-600 text-sm mb-6 bg-white p-4 rounded-xl border border-slate-100 shadow-sm leading-relaxed">
          お手元の請求書（検針票）を確認しながら、以下の4項目をご入力ください。
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mb-1">
              <MapPin size={16} className="text-primary" /> お住まいのエリア (都道府県・市町村)
            </label>
            <input 
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="例：東京都世田谷区"
              required
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition shadow-sm text-[16px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mb-1">
              <Activity size={16} className="text-emerald-500" /> 今月の使用量
            </label>
            <div className="relative">
              <input 
                type="number"
                name="usage"
                inputMode="decimal"
                value={formData.usage}
                onChange={handleChange}
                placeholder="例：15.5"
                required
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition shadow-sm text-[16px]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">m³</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mb-1">
              <DollarSign size={16} className="text-amber-500" /> 基本料金
            </label>
            <div className="relative">
              <input 
                type="number"
                name="baseCharge"
                inputMode="numeric"
                value={formData.baseCharge}
                onChange={handleChange}
                placeholder="例：1500"
                required
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition shadow-sm text-[16px]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">円</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mb-1">
              <Zap size={16} className="text-purple-500" /> 従量単価
            </label>
            <div className="relative">
              <input 
                type="number"
                name="unitPrice"
                inputMode="decimal"
                value={formData.unitPrice}
                onChange={handleChange}
                placeholder="例：180.5"
                required
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition shadow-sm text-[16px]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">円/m³</span>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 transform transition active:scale-95"
            >
              診断結果を見る
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DiagnosisManual;
