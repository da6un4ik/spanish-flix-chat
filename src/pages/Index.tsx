import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomCard } from '@/components/IdiomCard';
import { CategoryRow } from '@/components/CategoryRow';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ModeSelector, AppMode } from '@/components/ModeSelector';
import { FlashCard } from '@/components/FlashCard';
import { QuizMode } from '@/components/QuizMode';
import { idioms, categories } from '@/data/idioms';
import { Home, CheckCircle, Settings } from 'lucide-react';

const Index = () => {
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [currentMode, setCurrentMode] = useState<AppMode>('browse');

  const handleLearn = (id: string) => {
    setLearnedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const featuredIdiom = idioms[0];

  const filteredIdioms = useMemo(() => {
    if (selectedCategory === 'Все') return idioms;
    return idioms.filter((idiom) => idiom.category === selectedCategory);
  }, [selectedCategory]);

  const idiomsByCategory = useMemo(() => {
    const grouped: Record<string, typeof idioms> = {};
    categories.slice(1).forEach((cat) => {
      grouped[cat] = idioms.filter((idiom) => idiom.category === cat);
    });
    return grouped;
  }, []);

  const renderContent = () => {
    switch (currentMode) {
      case 'flashcards':
        return (
          <FlashCard
            idioms={filteredIdioms}
            learnedIds={learnedIds}
            onLearn={handleLearn}
          />
        );

      case 'quiz':
        return (
          <QuizMode
            idioms={filteredIdioms.slice(0, 5)}
            onLearn={handleLearn}
          />
        );

      case 'browse':
      default:
        return (
          <>
            {/* Featured Idiom */}
            <IdiomCard
              idiom={featuredIdiom}
              featured
              isLearned={learnedIds.has(featuredIdiom.id)}
              onLearn={handleLearn}
            />

            {/* Progress */}
            <div className="mt-6">
              <ProgressBar learned={learnedIds.size} total={idioms.length} />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* Content based on filter */}
            {selectedCategory === 'Все' ? (
              <>
                {categories.slice(1).map((category) => (
                  <CategoryRow
                    key={category}
                    title={category}
                    idioms={idiomsByCategory[category]}
                    learnedIds={learnedIds}
                    onLearn={handleLearn}
                  />
                ))}
              </>
            ) : (
              <div className="mt-4">
                <div className="flex flex-wrap gap-3 justify-center">
                  {filteredIdioms.map((idiom) => (
                    <IdiomCard
                      key={idiom.id}
                      idiom={idiom}
                      isLearned={learnedIds.has(idiom.id)}
                      onLearn={handleLearn}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header streak={learnedIds.size} />

      <main className="px-4 py-6 pb-24 max-w-4xl mx-auto">
        {/* Mode Selector */}
        <ModeSelector currentMode={currentMode} onModeChange={setCurrentMode} />

        {/* Render based on mode */}
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border">
        <div className="flex justify-around py-3 max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentMode('browse')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentMode === 'browse' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Главная</span>
          </button>
          <button
            onClick={() => setCurrentMode('flashcards')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentMode === 'flashcards' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <CheckCircle className="w-6 h-6" />
            <span className="text-[10px] font-medium">Карточки</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-medium">Настройки</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
