import React from "react";

const VideoPlayer = ({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Video</h2>
          <button onClick={onClose} className="text-gray-300 text-xl">✕</button>
        </div>

        <video
          src={src}
          controls
          autoPlay
          className="w-full rounded-xl bg-black"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
