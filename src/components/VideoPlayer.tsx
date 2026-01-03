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

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log("Telegram blocked autoplay, waiting for user tap");
      }
    };

    // Запускаем видео после загрузки метаданных
    video.addEventListener("loadedmetadata", tryPlay);

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Video</h2>
          <button onClick={onClose} className="text-gray-300 text-xl">✕</button>
        </div>

        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          className="w-full rounded-xl bg-black"
        >
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
