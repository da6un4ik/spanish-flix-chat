export interface Idiom {
  id: string;
  expression: string;
  meaning: string;
  example: string;
  category: string;
  imageUrl?: string; // Добавляем это поле (необязательное)
  exercises: any[];
}

export interface Exercise {
  id: string;
  type: 'fillBlank' | 'translate' | 'multiChoice' | 'matchParts';
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
}

export interface IdiomProgress {
  idiomId: string;
  completedExercises: Set<string>;
  isLearned: boolean;
}

export const idioms: Idiom[] = [
  {
    id: '1',
    spanish: 'Estar en las nubes',
    literal: 'Быть в облаках',
    meaning: 'Витать в облаках, быть рассеянным',
    example: 'María está en las nubes, no escuchó nada de la clase.',
    category: 'Эмоции',
    difficulty: 'beginner',
    exercises: [
      {
        id: '1-1',
        type: 'fillBlank',
        question: 'María está en las ___, no escuchó nada.',
        answer: 'nubes',
        hint: 'Что на небе?',
      },
      {
        id: '1-2',
        type: 'translate',
        question: 'Переведи: "Он витает в облаках"',
        answer: 'Él está en las nubes',
      },
      {
        id: '1-3',
        type: 'multiChoice',
        question: 'Что означает "estar en las nubes"?',
        answer: 'Быть рассеянным',
        options: ['Быть счастливым', 'Быть рассеянным', 'Быть злым', 'Быть усталым'],
      },
    ],
  },
  {
    id: '2',
    spanish: 'Costar un ojo de la cara',
    literal: 'Стоить глаз с лица',
    meaning: 'Стоить очень дорого',
    example: 'Este coche me costó un ojo de la cara.',
    category: 'Деньги',
    difficulty: 'beginner',
    exercises: [
      {
        id: '2-1',
        type: 'fillBlank',
        question: 'Este coche me costó un ___ de la cara.',
        answer: 'ojo',
        hint: 'Чем мы видим?',
      },
      {
        id: '2-2',
        type: 'multiChoice',
        question: 'Если что-то "cuesta un ojo de la cara", это значит:',
        answer: 'Это очень дорого',
        options: ['Это бесплатно', 'Это очень дорого', 'Это некрасиво', 'Это опасно'],
      },
      {
        id: '2-3',
        type: 'translate',
        question: 'Переведи: "Этот телефон стоит целое состояние"',
        answer: 'Este teléfono cuesta un ojo de la cara',
      },
    ],
  },
  {
    id: '3',
    spanish: 'Ser pan comido',
    literal: 'Быть съеденным хлебом',
    meaning: 'Быть очень лёгким делом',
    example: 'El examen fue pan comido para ella.',
    category: 'Работа',
    difficulty: 'beginner',
    exercises: [
      {
        id: '3-1',
        type: 'fillBlank',
        question: 'El examen fue ___ comido para ella.',
        answer: 'pan',
        hint: 'Что едят на завтрак?',
      },
      {
        id: '3-2',
        type: 'multiChoice',
        question: 'Что означает "ser pan comido"?',
        answer: 'Быть лёгким делом',
        options: ['Быть голодным', 'Быть лёгким делом', 'Быть вкусным', 'Быть скучным'],
      },
      {
        id: '3-3',
        type: 'translate',
        question: 'Переведи: "Это задание — раз плюнуть"',
        answer: 'Esta tarea es pan comido',
      },
    ],
  },
  {
    id: '4',
    spanish: 'Tomar el pelo',
    literal: 'Брать волосы',
    meaning: 'Подшучивать, разыгрывать кого-то',
    example: '¿Me estás tomando el pelo? No te creo.',
    category: 'Общение',
    difficulty: 'intermediate',
    exercises: [
      {
        id: '4-1',
        type: 'fillBlank',
        question: '¿Me estás tomando el ___?',
        answer: 'pelo',
        hint: 'Что растёт на голове?',
      },
      {
        id: '4-2',
        type: 'multiChoice',
        question: '"Tomar el pelo" означает:',
        answer: 'Разыгрывать кого-то',
        options: ['Стричь волосы', 'Разыгрывать кого-то', 'Злиться', 'Любить'],
      },
      {
        id: '4-3',
        type: 'translate',
        question: 'Переведи: "Ты меня разыгрываешь?"',
        answer: '¿Me estás tomando el pelo?',
      },
    ],
  },
  {
    id: '5',
    spanish: 'Meter la pata',
    literal: 'Засунуть лапу',
    meaning: 'Совершить ошибку, оплошность',
    example: 'Metí la pata cuando le conté el secreto.',
    category: 'Эмоции',
    difficulty: 'beginner',
    exercises: [
      {
        id: '5-1',
        type: 'fillBlank',
        question: 'Metí la ___ cuando le conté el secreto.',
        answer: 'pata',
        hint: 'Нога у животного',
      },
      {
        id: '5-2',
        type: 'multiChoice',
        question: '"Meter la pata" значит:',
        answer: 'Совершить ошибку',
        options: ['Бежать быстро', 'Совершить ошибку', 'Танцевать', 'Готовить еду'],
      },
      {
        id: '5-3',
        type: 'translate',
        question: 'Переведи: "Я облажался"',
        answer: 'Metí la pata',
      },
    ],
  },
  {
    id: '6',
    spanish: 'No tener pelos en la lengua',
    literal: 'Не иметь волос на языке',
    meaning: 'Говорить прямо, без обиняков',
    example: 'Ella no tiene pelos en la lengua, siempre dice lo que piensa.',
    category: 'Общение',
    difficulty: 'intermediate',
    exercises: [
      {
        id: '6-1',
        type: 'fillBlank',
        question: 'Ella no tiene pelos en la ___.',
        answer: 'lengua',
        hint: 'Орган во рту',
      },
      {
        id: '6-2',
        type: 'multiChoice',
        question: '"No tener pelos en la lengua" означает:',
        answer: 'Говорить прямо',
        options: ['Молчать', 'Говорить прямо', 'Врать', 'Петь'],
      },
      {
        id: '6-3',
        type: 'translate',
        question: 'Переведи: "Он говорит что думает"',
        answer: 'Él no tiene pelos en la lengua',
      },
    ],
  },
  {
    id: '7',
    spanish: 'Estar como una cabra',
    literal: 'Быть как коза',
    meaning: 'Быть сумасшедшим, чудаковатым',
    example: 'Mi vecino está como una cabra, habla solo.',
    category: 'Характер',
    difficulty: 'beginner',
    exercises: [
      {
        id: '7-1',
        type: 'fillBlank',
        question: 'Mi vecino está como una ___.',
        answer: 'cabra',
        hint: 'Животное с рогами, даёт молоко',
      },
      {
        id: '7-2',
        type: 'multiChoice',
        question: '"Estar como una cabra" значит:',
        answer: 'Быть чудаком',
        options: ['Быть голодным', 'Быть чудаком', 'Быть сильным', 'Быть красивым'],
      },
      {
        id: '7-3',
        type: 'translate',
        question: 'Переведи: "Он немного сумасшедший"',
        answer: 'Él está como una cabra',
      },
    ],
  },
  {
    id: '8',
    spanish: 'Quedarse de piedra',
    literal: 'Остаться камнем',
    meaning: 'Остолбенеть от удивления',
    example: 'Me quedé de piedra cuando vi el precio.',
    category: 'Эмоции',
    difficulty: 'intermediate',
    exercises: [
      {
        id: '8-1',
        type: 'fillBlank',
        question: 'Me quedé de ___ cuando vi el precio.',
        answer: 'piedra',
        hint: 'Твёрдый природный материал',
      },
      {
        id: '8-2',
        type: 'multiChoice',
        question: '"Quedarse de piedra" означает:',
        answer: 'Остолбенеть',
        options: ['Упасть', 'Остолбенеть', 'Уснуть', 'Рассмеяться'],
      },
      {
        id: '8-3',
        type: 'translate',
        question: 'Переведи: "Я был в шоке"',
        answer: 'Me quedé de piedra',
      },
    ],
  },
  {
    id: '9',
    spanish: 'Tirar la casa por la ventana',
    literal: 'Выбросить дом через окно',
    meaning: 'Тратить деньги без счёта, шиковать',
    example: 'Para su boda, tiraron la casa por la ventana.',
    category: 'Деньги',
    difficulty: 'advanced',
    exercises: [
      {
        id: '9-1',
        type: 'fillBlank',
        question: 'Tiraron la casa por la ___.',
        answer: 'ventana',
        hint: 'Через что смотрят на улицу?',
      },
      {
        id: '9-2',
        type: 'multiChoice',
        question: '"Tirar la casa por la ventana" значит:',
        answer: 'Тратить много денег',
        options: ['Делать ремонт', 'Тратить много денег', 'Переезжать', 'Убирать дом'],
      },
      {
        id: '9-3',
        type: 'translate',
        question: 'Переведи: "Они потратили кучу денег на вечеринку"',
        answer: 'Tiraron la casa por la ventana para la fiesta',
      },
    ],
  },
  {
    id: '10',
    spanish: 'Dar en el clavo',
    literal: 'Попасть в гвоздь',
    meaning: 'Попасть в точку, угадать',
    example: 'Has dado en el clavo con tu análisis.',
    category: 'Работа',
    difficulty: 'intermediate',
    exercises: [
      {
        id: '10-1',
        type: 'fillBlank',
        question: 'Has dado en el ___.',
        answer: 'clavo',
        hint: 'Что забивают молотком?',
      },
      {
        id: '10-2',
        type: 'multiChoice',
        question: '"Dar en el clavo" означает:',
        answer: 'Попасть в точку',
        options: ['Ошибиться', 'Попасть в точку', 'Построить дом', 'Сломать что-то'],
      },
      {
        id: '10-3',
        type: 'translate',
        question: 'Переведи: "Ты угадал!"',
        answer: 'Has dado en el clavo',
      },
    ],
  },
  {
    id: '11',
    spanish: 'Tener mala leche',
    literal: 'Иметь плохое молоко',
    meaning: 'Быть злым, иметь дурной характер',
    example: 'Hoy tiene mala leche, mejor no le hables.',
    category: 'Характер',
    difficulty: 'advanced',
    exercises: [
      {
        id: '11-1',
        type: 'fillBlank',
        question: 'Hoy tiene mala ___.',
        answer: 'leche',
        hint: 'Белый напиток от коровы',
      },
      {
        id: '11-2',
        type: 'multiChoice',
        question: '"Tener mala leche" значит:',
        answer: 'Быть в плохом настроении',
        options: ['Болеть', 'Быть в плохом настроении', 'Быть весёлым', 'Быть сонным'],
      },
      {
        id: '11-3',
        type: 'translate',
        question: 'Переведи: "Он сегодня злой"',
        answer: 'Hoy tiene mala leche',
      },
    ],
  },
  {
    id: '12',
    spanish: 'Ponerse las pilas',
    literal: 'Поставить себе батарейки',
    meaning: 'Взяться за дело, собраться',
    example: 'Tienes que ponerte las pilas si quieres aprobar.',
    category: 'Работа',
    difficulty: 'intermediate',
    exercises: [
      {
        id: '12-1',
        type: 'fillBlank',
        question: 'Tienes que ponerte las ___.',
        answer: 'pilas',
        hint: 'Что нужно пульту для работы?',
      },
      {
        id: '12-2',
        type: 'multiChoice',
        question: '"Ponerse las pilas" означает:',
        answer: 'Взяться за дело',
        options: ['Отдыхать', 'Взяться за дело', 'Спать', 'Есть'],
      },
      {
        id: '12-3',
        type: 'translate',
        question: 'Переведи: "Пора взяться за работу"',
        answer: 'Hay que ponerse las pilas',
      },
    ],
  },
];

export const categories = ['Все', 'Эмоции', 'Деньги', 'Работа', 'Общение', 'Характер'];
