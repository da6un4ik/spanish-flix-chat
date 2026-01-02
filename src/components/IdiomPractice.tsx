import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, X } from 'lucide-react';
import { Idiom } from '@/data/idioms';

export const IdiomPractice = ({ idiom, onClose, onFullyLearned }: { idiom: Idiom, onClose: () => void, onFullyLearned: () => void }) => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  const exercises = [
    { q: `¿Qué significa "${idiom.expression}"?`, options: [idiom.meaning, "Hacer algo rápido", "Dormir mucho"], a: idiom.meaning },
    { q: `Completa: "Él siempre ________ porque no escucha".`, options: [idiom.expression, "habla por los codos", "está de mala leche"], a: idiom.expression },
    { q: `¿Cuándo usarías esta expresión?`, options: ["Alguien está distraído", "Alguien está feliz", "Alguien tiene hambre"], a: "Alguien está distraído" }
  ];

  const current = exercises[step - 1];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const tg = (window as any).Telegram?.WebApp;
    tg?.HapticFeedback?.impactOccurred(opt === current.a ? 'medium' : 'error');
    
    setTimeout(() => {
      if (step < 3) { setStep(step + 1); setSelected(null); }
      else { setStep(4); }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#0A0A0A] p-6 flex flex-col text-left">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => <div key={i} className={`h-1 w-10 rounded-full ${i <= step ? 'bg-red-600' : 'bg-white/10'}`} />)}
        </div>
        <button onClick={onClose}><X /></button>
      </div>

      <AnimatePresence mode="wait">
        {step <= 3 ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col justify-center">
            <h2 className="text-sm font-black text-red-600 uppercase mb-4 tracking-widest italic">Ejercicio {step}/3</h2>
            <p className="text-2xl font-bold mb-8 leading-tight italic">{current.q}</p>
            <div className="space-y-3">
              {current.options.map(opt => (
                <button key={opt} onClick={() => handleSelect(opt)} className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selected === opt ? (opt === current.a ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500') : 'bg-white/5 border-white/5'}`}>
                  <span className="font-bold text-sm uppercase italic">{opt}</span>
                  {selected === opt && (opt === current.a ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />)}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={40} className="text-green-500" /></div>
            <h2 className="text-3xl font-black italic uppercase mb-2">¡Excelente!</h2>
            <p className="text-gray-500 mb-10 uppercase font-bold text-[10px] tracking-widest">Has dominado este modismo</p>
            <button onClick={onFullyLearned} className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2 italic uppercase">Siguiente <ArrowRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
