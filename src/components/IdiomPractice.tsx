import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, X } from 'lucide-react';
import { Idiom } from '@/data/idioms';

export const IdiomPractice = ({ idiom, onClose, onFullyLearned }: { idiom: Idiom, onClose: () => void, onFullyLearned: () => void }) => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  // Cargamos el ejercicio actual basado en el paso
  const current = idiom.exercises[step - 1];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    
    const tg = (window as any).Telegram?.WebApp;
    const isCorrect = opt === current.a;

    if (isCorrect) {
      tg?.HapticFeedback?.notificationOccurred('success');
    } else {
      tg?.HapticFeedback?.notificationOccurred('error');
    }
    
    setTimeout(() => {
      if (step < idiom.exercises.length) {
        setStep(step + 1);
        setSelected(null);
      } else {
        setStep(idiom.exercises.length + 1); // Pantalla final
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#0A0A0A] p-6 flex flex-col text-left">
      {/* HEADER: Indicador de progreso superior */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div className="flex gap-2">
          {idiom.exercises.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 w-10 rounded-full transition-all duration-500 ${i + 1 <= step ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-white/10'}`} 
            />
          ))}
        </div>
        <button onClick={onClose} className="p-2 text-gray-500 active:scale-90 transition-transform">
          <X size={24} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step <= idiom.exercises.length ? (
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -30 }} 
            className="flex-1 flex flex-col justify-center"
          >
            <span className="text-red-600 font-black uppercase text-[10px] tracking-[0.3em] mb-4 italic">
              Desafío {step} de {idiom.exercises.length}
            </span>
            <h2 className="text-2xl font-bold mb-10 leading-snug italic text-white pr-4">
              {current.q}
            </h2>

            <div className="space-y-4">
              {current.options.map(opt => {
                const isCorrect = opt === current.a;
                const isSelected = selected === opt;
                
                let borderClass = "border-white/5 bg-white/5";
                let textClass = "text-white/80";

                if (isSelected) {
                  borderClass = isCorrect ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10";
                  textClass = isCorrect ? "text-green-500" : "text-red-500";
                } else if (selected && isCorrect) {
                  borderClass = "border-green-500/40 bg-green-500/5";
                  textClass = "text-green-500/70";
                }

                return (
                  <button 
                    key={opt} 
                    onClick={() => handleSelect(opt)}
                    disabled={!!selected}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex justify-between items-center ${borderClass}`}
                  >
                    <span className={`font-bold text-sm uppercase italic leading-tight ${textClass}`}>
                      {opt}
                    </span>
                    {isSelected && (
                      isCorrect ? <CheckCircle2 className="text-green-500" size={20} /> : <XCircle className="text-red-500" size={20} />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* PANTALLA DE ÉXITO FINAL */
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h2 className="text-4xl font-black italic uppercase mb-2 tracking-tighter">¡Dominado!</h2>
            <p className="text-gray-500 uppercase font-black text-[10px] tracking-[0.2em] mb-12">
              Has completado los retos de "{idiom.expression}"
            </p>
            
            <button 
              onClick={onFullyLearned} 
              className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2 italic uppercase shadow-xl shadow-red-900/40 active:scale-95 transition-transform"
            >
                Siguiente modismo <ArrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
