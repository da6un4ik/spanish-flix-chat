import { Film, Plus } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { videoClips } from '@/data/videos';

export const VideoSection = () => {
  if (videoClips.length === 0) {
    return (
      <div className="mt-12">
        <h3 className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 mb-6">
          <Film className="w-3 h-3 text-red-600" /> Видео с идиомами
        </h3>
        
        <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-8 text-center">
          <Film className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-medium mb-2">
            Здесь появятся видеоклипы
          </p>
          <p className="text-gray-600 text-xs leading-relaxed max-w-xs mx-auto">
            Загрузите короткие отрывки с идиомами в папку <code className="bg-white/10 px-1.5 py-0.5 rounded text-red-400">public/videos/</code> и добавьте их в <code className="bg-white/10 px-1.5 py-0.5 rounded text-red-400">src/data/videos.ts</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 mb-6">
        <Film className="w-3 h-3 text-red-600" /> Видео с идиомами
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {videoClips.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};
