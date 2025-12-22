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
        options: ['Сделать стрижку', 'Разыгрывать', 'Помогать'],
        correctAnswer: 'Разыгрывать'
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
    imageUrl: 'https://images.unsplash.com/photo-1590001158193-79040c4172ad?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex3-1',
        type: 'choice',
        question: 'Когда говорят "Ponerse las pilas"?',
        options: ['Когда хотят спать', 'Нужно начать работать', 'Когда садятся батарейки'],
        correctAnswer: 'Нужно начать работать'
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
        question: 'Какой продукт в идиоме означает легкость задачи?',
        options: ['Хлеб', 'Паэлья', 'Сыр'],
        correctAnswer: 'Хлеб'
      }
    ]
  },
  {
    id: '5',
    expression: 'No tener pelos en la lengua',
    meaning: 'Говорить прямо, что думаешь (букв. "не иметь волос на языке")',
    example: 'Ella no tiene pelos en la lengua, te dirá la verdad aunque duela.',
    imageUrl: 'https://images.unsplash.com/photo-1541534401786-2077a4a88e5b?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex5-1',
        type: 'choice',
        question: 'О чем эта идиома?',
        options: ['О болезни', 'О честности и прямоте', 'О плохой дикции'],
        correctAnswer: 'О честности и прямоте'
      }
    ]
  },
  {
    id: '6',
    expression: 'Estar en las nubes',
    meaning: 'Витать в облаках / быть рассеянным',
    example: '¡Oye! Pon atención, pareces estar en las nubes hoy.',
    imageUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex6-1',
        type: 'choice',
        question: 'Что значит "Estar en las nubes"?',
        options: ['Лететь в самолете', 'Быть очень внимательным', 'Быть рассеянным'],
        correctAnswer: 'Быть рассеянным'
      }
    ]
  },
  {
    id: '7',
    expression: 'Dar en el clavo',
    meaning: 'Попасть в точку (букв. "ударить по гвоздю")',
    example: 'Tu respuesta dio en el clavo, eso es exactamente lo que pasaba.',
    imageUrl: 'https://images.unsplash.com/photo-1586864387789-628af9feed71?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex7-1',
        type: 'choice',
        question: 'Во что нужно попасть согласно этой идиоме?',
        options: ['В стену', 'В гвоздь', 'В цель'],
        correctAnswer: 'В гвоздь'
      }
    ]
  },
  {
    id: '8',
    expression: 'Meter la pata',
    meaning: 'Сплоховать / совершить оплошность (букв. "вставить лапу")',
    example: 'Metí la pata al decirle a Juan sobre su fiesta sorpresa.',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex8-1',
        type: 'choice',
        question: 'Что означает "Meter la pata"?',
        options: ['Танцевать', 'Ошибиться / сказать лишнее', 'Быстро бежать'],
        correctAnswer: 'Ошибиться / сказать лишнее'
      }
    ]
  }
];
