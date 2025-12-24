import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X, Film } from 'lucide-react';
import { VideoClip } from '@/data/videos';

interface VideoCardProps {
  video: VideoClip;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsPlaying(true)}
        className="relative aspect-video rounded-2xl overflow-hidden bg-[#161616] border border-white/5 shadow-2xl cursor-pointer group"
      >
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-900/30 to-black flex items-center justify-center">
            <Film className="w-12 h-12 text-gray-600" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-900/50">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-[10px] font-bold text-white z-20">
          {video.duration}
        </div>

        {/* Info */}
        <div className="absolute inset-x-0 bottom-0 p-4 z-20">
          <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mb-1">
            {video.source}
          </p>
          <p className="font-bold text-sm leading-tight text-white">
            {video.idiomExpression}
          </p>
          <p className="text-gray-400 text-xs mt-1 line-clamp-1">
            {video.description}
          </p>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsPlaying(false)}
        >
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="w-full rounded-xl"
            >
              Ваш браузер не поддерживает видео
            </video>
            
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">{video.idiomExpression}</h3>
              <p className="text-gray-400 text-sm mt-1">{video.title}</p>
              <p className="text-red-500 text-xs mt-2 uppercase tracking-wider">{video.source}</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
