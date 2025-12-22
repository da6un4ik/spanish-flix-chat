import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomCard } from '@/components/IdiomCard';
import { CategoryRow } from '@/components/CategoryRow';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ModeSelector, AppMode } from '@/components/ModeSelector';
import { FlashCard } from '@/components/FlashCard';
import { QuizMode } from '@/components/QuizMode';
import { IdiomPractice } from '@/components/IdiomPractice';
import { idioms, categories, Idiom } from '@/data/idioms';
import { Home, Layers, Settings } from 'lucide-react';

interface IdiomProgressState {
  completedExercises: Set<string>;
  isLearned: boolean;
}

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, IdiomProgressState>>({});
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [currentMode, setCurrentMode] = useState<AppMode>('browse');
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);

  // --- ЛОГИКА СОХРАНЕНИЯ ПРОГРЕССА ---
  
  // Загрузка данных из LocalStorage при запуске приложения
  useEffect(() => {
    const savedProgress = localStorage.getItem('spanish-flix-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        const restored: Record<string, IdiomProgressState> = {};
        
        // Восстанавливаем Set из массива (JSON не поддерживает Set напрямую)
        Object.keys(parsed).forEach((id) => {
          restored[id] = {
            isLearned: parsed[id].isLearned,
            completedExercises: new Set(parsed[id].completedExercises),
          };
        });
        setProgressMap(restored);
      } catch (e) {
        console.error("Ошибка при загрузке прогресса:", e);
      }
    }
  }, []);

  // Сохранение данных в LocalStorage при каждом изменении progressMap
  useEffect(() => {
    if (Object.keys(progressMap).length === 0) return;

    const dataToSave: Record<string, any> = {};
    Object.keys(progressMap).forEach((id) => {
      dataToSave[id] = {
        isLearned: progressMap[id].isLearned,
        completedExercises: Array.from(progressMap[id].completedExercises),
      };
    });
    localStorage.setItem('spanish-flix-progress', JSON.stringify(dataToSave));
  }, [progressMap]);

  // --- КОНЕЦ ЛОГИКИ СОХРАНЕНИЯ ---

  const getProgress = (idiomId: string): IdiomProgressState => {
    return progressMap[idiomId] || { completedExercises: new Set(), isLearned: false };
  };

  const handleExerciseComplete = (idiomId: string, exerciseId: string) => {
    setProgressMap((prev) => {
      const current = prev[idiomId] || { completedExercises: new Set(), isLearned: false };
      const newCompleted = new Set(current.completedExercises);
      newCompleted.add(exerciseId);

      const idiom = idioms.find((i) => i.id === idiomId);
      const isFullyLearned = idiom ? newCompleted.size === idiom.exercises.length : false;

      return {
        ...prev,
        [idiomId]: {
          completedExercises: newCompleted,
          isLearned: isFullyLearned,
        },
      };
    });
  };

  const handleFullyLearned = (idiomId: string) => {
    setProgressMap((prev) => ({
      ...prev,
      [idiomId]: {
        ...prev[idiomId],
        isLearned: true,
      },
    }));
  };

  const handleLegacyLearn = (id: string) => {
    setProgressMap((prev) => {
      const current = prev[id] || { completedExercises: new Set(), isLearned: false };
      return {
        ...prev,
        [id]: {
          ...current,
          isLearned: !current.isLearned,
        },
      };
    });
  };

  const learnedCount = Object.values(progressMap).filter((p) => p.isLearned).length;
  const learnedIds = new Set(
    Object.entries(progressMap)
      .filter(([_, p]) => p.isLearned)
      .map(([id]) => id)
  );

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
            onLearn={handleLegacyLearn}
          />
        );

      case 'quiz':
        return (
          <QuizMode
            idioms={filteredIdioms.slice(0, 5)}
            onLearn={handleLegacyLearn}
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
              isLearned={getProgress(featuredIdiom.id).isLearned}
              exerciseProgress={getProgress(featuredIdiom.id).completedExercises.size}
              onPractice={() => setPracticeIdiom(featuredIdiom)}
            />

            {/* Progress Bar */}
            <div className="mt-6">
              <ProgressBar learned={learnedCount} total={idioms.length} />
            </div>

            {/* Category Filter */}
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

            {/* Content rows */}
            {selectedCategory === 'Все' ? (
              <>
                {categories.slice(1).map((category) => (
                  <CategoryRow
                    key={category}
                    title={category}
                    idioms={idiomsByCategory[category]}
                    learnedIds={learnedIds}
                    onLearn={handleLegacyLearn}
                    progressMap={progressMap}
                    onPractice={(idiom) => setPracticeIdiom(idiom)}
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
                      isLearned={getProgress(idiom.id).isLearned}
                      exerciseProgress={getProgress(idiom.id).completedExercises.size}
                      onPractice={() => setPracticeIdiom(idiom)}
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
      <Header streak={learnedCount} />

      <main className="px-4 py-6 pb-24 max-w-4xl mx-auto">
        <ModeSelector currentMode={currentMode} onModeChange={setCurrentMode} />
        {renderContent()}
      </main>

      {/* Practice Modal */}
      {practiceIdiom && (
        <IdiomPractice
          idiom={practiceIdiom}
          completedExercises={getProgress(practiceIdiom.id).completedExercises}
          onExerciseComplete={(exerciseId) =>
            handleExerciseComplete(practiceIdiom.id, exerciseId)
          }
          onClose={() => setPracticeIdiom(null)}
          onFullyLearned={() => handleFullyLearned(practiceIdiom.id)}
        />
      )}

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
            <Layers className="w-6 h-6" />
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
