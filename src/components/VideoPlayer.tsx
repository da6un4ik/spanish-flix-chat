import React, { useRef, useEffect } from "react";

const VideoPlayer = ({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Telegram/iOS часто блокируют .play() без атрибута muted, 
    // если видео запускается программно.
    const tryPlay = async () => {
      try {
        // Устанавливаем muted, чтобы обойти блокировку автоплея (по желанию)
        // video.muted = true; 
        await video.play();
      } catch (err) {
        console.warn("Autoplay failed. User interaction required.");
      }
    };

    video.addEventListener("canplay", tryPlay);
    return () => video.removeEventListener("canplay", tryPlay);
  }, [src]); // Добавляем src в зависимости, чтобы менять видео при смене идиомы

  return (
    <div 
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200"
      onClick={onClose} // Закрытие при клике на фон
    >
      <div 
        className="w-full max-w-lg relative" 
        onClick={(e) => e.stopPropagation()} // Чтобы не закрывалось при клике на само видео
      >
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-sm font-medium text-gray-400">Ejemplo en video</span>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <video
            ref={videoRef}
            src={src}
            controls
            playsInline // КРИТИЧНО для Telegram и iOS
            preload="metadata"
            className="w-full h-full"
            // Добавляем атрибуты для корректной работы в мобильных браузерах
            webkit-playsinline="true"
          >
            Tu navegador no soporta video.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
