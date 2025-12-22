import { Flame, Search } from 'lucide-react';

interface HeaderProps {
  streak?: number;
}

export const Header = ({ streak = 0 }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display text-lg">ES</span>
          </div>
          <div>
            <h1 className="font-display text-lg leading-none">IDIOMAS</h1>
            <p className="text-[10px] text-muted-foreground">Испанские идиомы</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400">{streak}</span>
            </div>
          )}
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
