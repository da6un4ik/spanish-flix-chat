const DonationModal = ({ user, onClose }: { user: any; onClose: () => void }) => {
  const handleDonate = async (amount: number, label: string) => {
    const tg = (window as any).Telegram?.WebApp;
    try {
      const res = await fetch('/api/server?action=create-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.id, amount, label })
      });
      const data = await res.json();
      if (data.link) tg.openInvoice(data.link);
    } catch (e) {
      alert("Error al procesar la donación");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="text-6xl mb-6">☕</div>
      <h2 className="text-3xl font-bold mb-2">¡Apoya a Modismo!</h2>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Nuestra aplicación es gratuita y sin publicidad. Si te gusta nuestro contenido, puedes invitarnos a un café para ayudarnos a mejorar.
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
        <button onClick={() => handleDonate(100000, "Súper apoyo")} className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-black flex justify-between px-6 active:scale-95 transition">
          <span>💎 Súper apoyo</span>
          <span>1000 ₽</span>
        </button>
      </div>

      <button onClick={onClose} className="mt-8 text-gray-500 text-sm font-medium">
        Ahora no, gracias
      </button>
    </div>
  );
};

export default DonationModal;
