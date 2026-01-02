import { motion } from 'framer-motion'; // И сюда!
export const ProgressBar = ({ learned, total }: { learned: number, total: number }) => {
  const percentage = Math.round((learned / total) * 100);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Mi progreso</p>
          <p className="text-2xl font-black">{percentage}%</p>
        </div>
        <p className="text-xs text-gray-500 font-medium">{learned} de {total} idiomas</p>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        />
      </div>
    </div>
  );
};
