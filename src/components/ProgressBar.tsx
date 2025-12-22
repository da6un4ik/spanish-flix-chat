interface ProgressBarProps {
  learned: number;
  total: number;
}

export const ProgressBar = ({ learned, total }: ProgressBarProps) => {
  const percentage = total > 0 ? (learned / total) * 100 : 0;

  return (
    <div className="bg-card rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Ваш прогресс</span>
        <span className="text-sm font-medium text-foreground">
          {learned} / {total} идиом
        </span>
      </div>
      
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        {percentage === 0
          ? 'Начните изучать испанские идиомы!'
          : percentage < 50
          ? 'Отличное начало! Продолжайте!'
          : percentage < 100
          ? 'Вы почти у цели!'
          : '🎉 Поздравляем! Все идиомы изучены!'}
      </p>
    </div>
  );
};
