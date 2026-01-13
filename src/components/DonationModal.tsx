import { useState } from "react";

const DonationModal = ({ user, onClose }: { user: any; onClose: () => void }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDonate = async (amount: number, label: string) => {
    const tg = (window as any).Telegram?.WebApp;
    try {
      const res = await fetch('/api/server?action=create-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.id, amount, label })
      });
      const data = await res.json();
      
      if (data.link) {
        // Открываем нативный счет Telegram
        tg.openInvoice(data.link, (status: string) => {
          if (status === 'paid') {
            setIsSuccess(true); // Показываем экран благодарности
          }
        });
      }
    } catch (e) {
      alert("Error al procesar la donación");
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
        <div className="text-7xl mb-6">❤️</div>
        <h2 className="text-3xl font-bold mb-4">¡Muchas gracias!</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Tu apoyo significa mucho para nosotros. Gracias a ti, Modismo seguirá siendo gratuito para todos.
        </p>
        <button 
          onClick={onClose}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold active:scale-95 transition"
        >
          Continuar aprendiendo
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="text-6xl mb-6">☕</div>
      <h2 className="text-3xl font-bold mb-2">¡Apoya a Modismo!</h2>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Nuestra aplicación es gratuita y sin publicidad. Si te gusta nuestro contenido, puedes invitarnos a un café.
      </p>

      <div className="w-full space-y-3">
        <button onClick={() => handleDonate(19000, "Un café")} className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl font-bold flex justify-between px-6 active:scale-95 transition">
          <span>☕ Un café</span>
          <span className="text-yellow-500">190 ₽</span>
        </button>
        <button onClick={() => handleDonate(50000, "Una pizza")} className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl font-bold flex justify-between px-6 active:scale-95 transition">
          <span>🍕 Una pizza</span>
          <span className="text-yellow-500">500 ₽</span>
        </button>
        <button onClick={() => handleDonate(100000, "Súper apoyo")} className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-black flex justify-between px-6 active:scale-95 transition hover:bg-yellow-400">
          <span>💎 Súper apoyo</span>
          <span>1000 ₽</span>
        </button>
      </div>

      <button onClick={onClose} className="mt-8 text-gray-500 text-sm font-medium hover:text-white transition">
        Ahora no, gracias
      </button>
    </div>
  );
};

export default DonationModal;
