export interface VideoClip {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  idiomExpression: string;
  source: string; // Название сериала/фильма
  duration: string; // "0:45"
}

// Здесь можно добавить свои видеоклипы
// Загрузите видео в папку public/videos/ и добавьте их сюда
export const videoClips: VideoClip[] = [
  // Пример структуры:
  // {
  //   id: '1',
  //   title: 'Tomar el pelo в контексте',
  //   description: 'Герой использует идиому в разговоре',
  //   videoUrl: '/videos/clip1.mp4',
  //   thumbnailUrl: '/videos/thumb1.jpg',
  //   idiomExpression: 'Tomar el pelo',
  //   source: 'La Casa de Papel',
  //   duration: '0:32'
  // }
];
