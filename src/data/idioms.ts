export interface Idiom {
  id: string;
  spanish: string;
  literal: string;
  meaning: string;
  example: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learned?: boolean;
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
  },
  {
    id: '2',
    spanish: 'Costar un ojo de la cara',
    literal: 'Стоить глаз с лица',
    meaning: 'Стоить очень дорого',
    example: 'Este coche me costó un ojo de la cara.',
    category: 'Деньги',
    difficulty: 'beginner',
  },
  {
    id: '3',
    spanish: 'Ser pan comido',
    literal: 'Быть съеденным хлебом',
    meaning: 'Быть очень лёгким делом',
    example: 'El examen fue pan comido para ella.',
    category: 'Работа',
    difficulty: 'beginner',
  },
  {
    id: '4',
    spanish: 'Tomar el pelo',
    literal: 'Брать волосы',
    meaning: 'Подшучивать, разыгрывать кого-то',
    example: '¿Me estás tomando el pelo? No te creo.',
    category: 'Общение',
    difficulty: 'intermediate',
  },
  {
    id: '5',
    spanish: 'Meter la pata',
    literal: 'Засунуть лапу',
    meaning: 'Совершить ошибку, оплошность',
    example: 'Metí la pata cuando le conté el secreto.',
    category: 'Эмоции',
    difficulty: 'beginner',
  },
  {
    id: '6',
    spanish: 'No tener pelos en la lengua',
    literal: 'Не иметь волос на языке',
    meaning: 'Говорить прямо, без обиняков',
    example: 'Ella no tiene pelos en la lengua, siempre dice lo que piensa.',
    category: 'Общение',
    difficulty: 'intermediate',
  },
  {
    id: '7',
    spanish: 'Estar como una cabra',
    literal: 'Быть как коза',
    meaning: 'Быть сумасшедшим, чудаковатым',
    example: 'Mi vecino está como una cabra, habla solo.',
    category: 'Характер',
    difficulty: 'beginner',
  },
  {
    id: '8',
    spanish: 'Quedarse de piedra',
    literal: 'Остаться камнем',
    meaning: 'Остолбенеть от удивления',
    example: 'Me quedé de piedra cuando vi el precio.',
    category: 'Эмоции',
    difficulty: 'intermediate',
  },
  {
    id: '9',
    spanish: 'Tirar la casa por la ventana',
    literal: 'Выбросить дом через окно',
    meaning: 'Тратить деньги без счёта, шиковать',
    example: 'Para su boda, tiraron la casa por la ventana.',
    category: 'Деньги',
    difficulty: 'advanced',
  },
  {
    id: '10',
    spanish: 'Dar en el clavo',
    literal: 'Попасть в гвоздь',
    meaning: 'Попасть в точку, угадать',
    example: 'Has dado en el clavo con tu análisis.',
    category: 'Работа',
    difficulty: 'intermediate',
  },
  {
    id: '11',
    spanish: 'Tener mala leche',
    literal: 'Иметь плохое молоко',
    meaning: 'Быть злым, иметь дурной характер',
    example: 'Hoy tiene mala leche, mejor no le hables.',
    category: 'Характер',
    difficulty: 'advanced',
  },
  {
    id: '12',
    spanish: 'Ponerse las pilas',
    literal: 'Поставить себе батарейки',
    meaning: 'Взяться за дело, собраться',
    example: 'Tienes que ponerte las pilas si quieres aprobar.',
    category: 'Работа',
    difficulty: 'intermediate',
  },
];

export const categories = ['Все', 'Эмоции', 'Деньги', 'Работа', 'Общение', 'Характер'];
