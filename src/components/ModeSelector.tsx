import { BookOpen, Layers, Brain } from 'lucide-react';

export type AppMode = 'browse' | 'flashcards' | 'quiz';

interface ModeSelectorProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  const modes = [
    { id: 'browse' as const, label: 'Обзор', icon: BookOpen },
    { id: 'flashcards' as const, label: 'Карточки', icon: Layers },
    { id: 'quiz' as const, label: 'Квиз', icon: Brain },
  ];

  return (
    <div className="flex gap-2 p-1 bg-secondary rounded-xl mb-6">
      {modes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onModeChange(id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
            currentMode === id
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};
