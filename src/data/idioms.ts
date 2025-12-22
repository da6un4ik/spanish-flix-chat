export interface Exercise {
  id: string;
  type: 'choice' | 'input';
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface Idiom {
  id: string;
  expression: string;
  meaning: string;
  example: string;
  imageUrl: string;
  exercises: Exercise[];
}

export const idioms: Idiom[] = [
  {
    id: '1',
    expression: 'Tomar el pelo',
    meaning: 'Разыгрывать кого-то (букв. "тянуть за волосы")',
    example: '¿De verdad ganaste la lotería o me estás tomando el pelo?',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex1-1',
        type: 'choice',
        question: 'Что означает фраза "Tomar el pelo"?',
        options: ['Сделать стрижку', 'Разыгрывать', 'Помогать другу'],
        correctAnswer: 'Разыгрывать'
      },
      {
        id: 'ex1-2',
        type: 'choice',
        question: 'За что "тянут" в этой идиоме?',
        options: ['За руку', 'За волосы', 'За нос'],
        correctAnswer: 'За волосы'
      }
    ]
  },
  {
    id: '2',
    expression: 'Estar como una cabra',
    meaning: 'Быть сумасшедшим / вести себя странно',
    example: 'Ese hombre está como una cabra, corre por la calle gritando en pijama.',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex2-1',
        type: 'choice',
        question: 'О ком говорят, когда кто-то ведет себя безумно?',
        options: ['О собаке', 'О козе', 'О быке'],
        correctAnswer: 'О козе'
      }
    ]
  },
  {
    id: '3',
    expression: 'Ponerse las pilas',
    meaning: 'Взяться за дело / подтянуться (букв. "вставить батарейки")',
    example: 'Si quieres aprobar el examen de español, tienes que ponerte las pilas.',
    imageUrl: 'https://images.unsplash.com/photo-1590001158193-79040c4172ad?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex3-1',
        type: 'choice',
        question: 'Что нужно "вставить", чтобы начать усердно работать?',
        options: ['Батарейки', 'Ключи', 'Слова'],
        correctAnswer: 'Батарейки'
      }
    ]
  },
  {
    id: '4',
    expression: 'Ser pan comido',
    meaning: 'Проще простого (букв. "быть съеденным хлебом")',
    example: 'El examen de hoy fue pan comido, terminé en 10 minutos.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex4-1',
        type: 'choice',
        question: 'Какой продукт символизирует очень легкую задачу?',
        options: ['Сыр', 'Вино', 'Хлеб'],
        correctAnswer: 'Хлеб'
      }
    ]
  },
  {
    id: '5',
    expression: 'No tener pelos en la lengua',
    meaning: 'Говорить прямо, что думаешь (букв. "не иметь волос на языке")',
    example: 'Ella не tiene pelos en la lengua, всегда говорит правду.',
    imageUrl: 'https://images.unsplash.com/photo-1541534401786-2077a4a88e5b?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex5-1',
        type: 'choice',
        question: 'Что отсутствует на языке у очень прямолинейного человека?',
        options: ['Слова', 'Волосы', 'Вкус'],
        correctAnswer: 'Волосы'
      }
    ]
  },
  {
    id: '6',
    expression: 'Tirar la casa por la ventana',
    meaning: 'Не жалеть денег / кутить (букв. "выбросить дом в окно")',
    example: 'Para su boda, decidieron tirar la casa por la ventana.',
    imageUrl: 'https://images.unsplash.com/photo-1513519247352-4d3660365ee1?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex6-1',
        type: 'choice',
        question: 'Куда "выбрасывают дом", когда тратят много денег?',
        options: ['В окно', 'В дверь', 'В корзину'],
        correctAnswer: 'В окно'
      }
    ]
  }
];
