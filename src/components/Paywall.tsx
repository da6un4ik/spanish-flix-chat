import React, { useState } from "react";

const Paywall = ({ onClose, onUnlock }: { onClose: () => void; onUnlock: () => void }) => {
  const [code, setCode] = useState("");

  const handleActivate = () => {
    if (code.toUpperCase() === "ESP2026") {
      localStorage.setItem("modismo-is-pro", "true");
      alert("¡Pro activado!");
      window.location.reload(); // Перезагружаем, чтобы применить статус
    } else {
      alert("Código incorrecto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-lg shadow-blue-500/50">💎</div>
      <h2 className="text-3xl font-bold mb-2 text-white">Modismo Pro</h2>
      <p className="text-gray-400 mb-8 leading-relaxed">
        ¡Suscríbete para desbloquear todo! <br/>
        Tras el pago, el bot te enviará un código.
      </p>

      <button
        onClick={onUnlock}
        className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-xl mb-6 active:scale-95 transition"
      >
        Pagar con ЮKassa
      </button>

      <div className="w-full border-t border-white/10 pt-6 mt-2">
        <input 
          type="text"
          placeholder="Introducir código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-white/5 border border-white/20 p-3 rounded-xl mb-3 text-center uppercase tracking-widest text-white"
        />
        <button onClick={handleActivate} className="text-blue-400 font-bold text-sm">
          Activar código
        </button>
      </div>

      <button onClick={onClose} className="text-gray-500 mt-8 text-sm">Más tarde</button>
    </div>
  );
};

export default Paywall;
