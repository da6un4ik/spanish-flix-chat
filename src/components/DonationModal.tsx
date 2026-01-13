import { useState } from "react";

const DonationModal = ({ onClose }: { onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  
  // ТВОЙ НОМЕР КАРТЫ
  const cardNumber = "5536 9139 6288 4660"; 

  const handleCopy = () => {
    // Копируем без пробелов для банковских приложений
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="text-6xl mb-6">☕</div>
      <h2 className="text-3xl font-bold mb-2">¡Apoya a Modismo!</h2>
      <p className="text-gray-400 mb-8 leading-relaxed text-sm">
        Si te gusta la aplicación y quieres ayudarnos a crecer, puedes hacernos una donación directa. ¡Cualquier apoyo es bienvenido!
      </p>

      <div className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl mb-6">
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2 text-left">Número de tarjeta</p>
        <p className="text-xl font-mono font-bold tracking-wider mb-4 text-white">{cardNumber}</p>
        
        <button 
          onClick={handleCopy}
          className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
            copied ? 'bg-green-600 text-white scale-95' : 'bg-white text-black active:scale-95'
          }`}
        >
          {copied ? (
            <><span>✓</span> Номер скопирован</>
          ) : (
            <><span>📋</span> Copiar número</>
          )}
        </button>
      </div>

      <button 
        onClick={onClose} 
        className="text-gray-500 text-sm font-medium hover:text-white transition py-2"
      >
        Volver a la app
      </button>
    </div>
  );
};

export default DonationModal;
