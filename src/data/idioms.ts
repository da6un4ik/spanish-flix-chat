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
  category: string;
  imageUrl: string;
  exercises: Exercise[];
}

export const categories = ['Все', 'Разговорные', 'Популярные', 'Юмор'];

export const idioms: Idiom[] = [
  {
    id: '1',
    expression: 'Tomar el pelo',
    meaning: 'Разыгрывать кого-то (букв. "тянуть за волосы")',
    example: '¿De verdad ganaste la lotería o me estás tomando el pelo?',
    category: 'Разговорные',
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
        question: 'Me estás ______ el pelo.',
        options: ['dando', 'tomando', 'comiendo'],
        correctAnswer: 'tomando'
      }
    ]
  },
  {
    id: '2',
    expression: 'Estar como una cabra',
    meaning: 'Быть сумасшедшим / вести себя странно',
    example: 'Ese hombre está como una cabra, corre por la calle gritando en pijama.',
    category: 'Юмор',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex2-1',
        type: 'choice',
        question: 'Какое животное упоминается в идиоме о сумасшествии?',
        options: ['Собака', 'Корова', 'Коза'],
        correctAnswer: 'Коза'
      }
    ]
  },
  {
    id: '3',
    expression: 'Ponerse las pilas',
    meaning: 'Взяться за дело / подтянуться (букв. "вставить батарейки")',
    example: 'Si quieres aprobar el examen de español, tienes que ponerte las pilas.',
    category: 'Популярные',
    imageUrl: 'https://images.unsplash.com/photo-1590001158193-79040c4172ad?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex3-1',
        type: 'choice',
        question: 'Когда говорят "Ponerse las pilas"?',
        options: ['Когда хотят спать', 'Когда нужно начать усердно работать', 'Когда садятся батарейки в пульте'],
        correctAnswer: 'Когда нужно начать усердно работать'
      }
    ]
  },
  {
    id: '4',
    expression: 'Ser pan comido',
    meaning: 'Проще простого (букв. "быть съеденным хлебом")',
    example: 'El examen de hoy fue pan comido, terminé в 10 minutos.',
    category: 'Разговорные',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex4-1',
        type: 'choice',
        question: 'Какой продукт упоминается в идиоме "проще простого"?',
        options: ['Хлеб', 'Паэлья', 'Сыр'],
        correctAnswer: 'Хлеб'
      }
    ]
  },
  {
    id: '5',
    expression: 'Echar agua al mar',
    meaning: 'Бесполезное занятие (букв. "лить воду в море")',
    example: 'Tratar de convencerlo es como echar agua al mar, nunca escucha.',
    category: 'Популярные',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex5-1',
        type: 'choice',
        question: 'Что означает "Echar agua al mar"?',
        options: ['Поливать цветы', 'Делать что-то бесполезное', 'Ехать в отпуск'],
        correctAnswer: 'Делать что-то бесполезное'
      }
    ]
  }
];
