import React from "react";

const Paywall = ({ onClose, onUnlock }: { onClose: () => void; onUnlock: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-lg shadow-blue-500/50">💎</div>
      <h2 className="text-3xl font-bold mb-2 text-white">Modismo Pro</h2>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Has visto tus 3 idiomas gratuitos. <br/>
        ¡Suscríbete para desbloquear todas las expresiones y videos sin límites!
      </p>
      <button
        onClick={onUnlock}
        className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-xl mb-4 active:scale-95 transition shadow-xl shadow-blue-900/40"
      >
        Desbloquear todo
      </button>
      <button onClick={onClose} className="text-gray-500 font-medium p-2">Más tarde</button>
    </div>
  );
};

export default Paywall;
