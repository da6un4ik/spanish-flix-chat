import { motion } from 'framer-motion';

export const ProgressBar = ({ learned, total }: { learned: number; total: number }) => {
  const percentage = Math.round((learned / total) * 100);

  return (
    <div className="w-full mb-6 pt-2">
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
        />
      </div>
      <div className="flex justify-end mt-2">
        <span className="text-[9px] font-black text-red-600 italic uppercase tracking-tighter">{percentage}% COMPLETADO</span>
      </div>
    </div>
  );
};
