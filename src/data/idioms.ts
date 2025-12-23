export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Idiom {
  id: string;
  expression: string; // Изменено с spanish для совместимости с Index.tsx
  literal: string;
  meaning: string;
  example: string;
  category: string;
  imageUrl: string; // Добавлено поле для картинок
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
}

export const categories = ['Все', 'Эмоции', 'Характер', 'Деньги', 'Отношения', 'Еда', 'Действия'];

export const idioms: Idiom[] = [
  {
    id: '1',
    expression: 'Tomar el pelo',
    literal: 'брать за волосы',
    meaning: 'Разыгрывать кого-то',
    example: '¿De verdad ganaste la lotería o me estás tomando el pelo?',
    category: 'Действия',
    imageUrl: '/idioms/pelo.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex1', question: 'Что означает "Tomar el pelo"?', options: ['Стричь волосы', 'Разыгрывать', 'Злиться'], correctAnswer: 'Разыгрывать' }
    ]
  },
  {
    id: '2',
    expression: 'Estar como una cabra',
    literal: 'быть как коза',
    meaning: 'Быть сумасшедшим',
    example: 'Ese hombre habla solo, está como una cabra.',
    category: 'Характер',
    imageUrl: '/idioms/cabra.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex2', question: 'Как переводится "Estar como una cabra"?', options: ['Быть голодным', 'Быть сумасшедшим', 'Быть быстрым'], correctAnswer: 'Быть сумасшедшим' }
    ]
  },
  {
    id: '3',
    expression: 'Ser pan comido',
    literal: 'быть съеденным хлебом',
    meaning: 'Проще простого',
    example: 'El examen de español fue pan comido.',
    category: 'Еда',
    imageUrl: '/idioms/pan.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex3', question: 'Синоним "Ser pan comido" это:', options: ['Очень сложно', 'Очень легко', 'Очень вкусно'], correctAnswer: 'Очень легко' }
    ]
  },
  {
    id: '4',
    expression: 'Ponerse las pilas',
    literal: 'вставить батарейки',
    meaning: 'Взяться за дело',
    example: 'Si quieres aprobar, tienes que ponerte las pilas.',
    category: 'Действия',
    imageUrl: '/idioms/pilas.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex4', question: 'Когда говорят "Ponerse las pilas"?', options: ['Когда хотят спать', 'Когда нужно ускориться', 'Когда сломался пульт'], correctAnswer: 'Когда нужно ускориться' }
    ]
  },
  {
    id: '5',
    expression: 'Estar en las nubes',
    literal: 'быть в облаках',
    meaning: 'Витать в облаках',
    example: 'Juan no escucha, siempre está en las nubes.',
    category: 'Характер',
    imageUrl: '/idioms/estar_en_las_nubes.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex5', question: 'О ком говорят "está en las nubes"?', options: ['О пилоте', 'О невнимательном', 'О высоком человеке'], correctAnswer: 'О невнимательном' }
    ]
  },
  {
    id: '6',
    expression: 'No tener pelos en la lengua',
    literal: 'не иметь волос на языке',
    meaning: 'Говорить прямо',
    example: 'Ella dice lo que piensa, no tiene pelos en la lengua.',
    category: 'Характер',
    imageUrl: '/idioms/pelos.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex6', question: 'Человек без волос на языке это:', options: ['Искренний', 'Лжец', 'Молчаливый'], correctAnswer: 'Искренний' }
    ]
  },
  {
    id: '7',
    expression: 'Echar agua al mar',
    literal: 'лить воду в море',
    meaning: 'Бесполезное занятие',
    example: 'Tratar de convencerlo es como echar agua al mar.',
    category: 'Действия',
    imageUrl: '/idioms/echar_agua_al_mar.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex7', question: 'Что значит это выражение?', options: ['Поливать цветы', 'Бесполезное дело', 'Путешествовать'], correctAnswer: 'Бесполезное дело' }
    ]
  },
  {
    id: '8',
    expression: 'Tirar la casa por la ventana',
    literal: 'выбросить дом в окно',
    meaning: 'Не жалеть денег',
    example: 'Para su boda, tiraron la casa por la ventana.',
    category: 'Деньги',
    imageUrl: '/idioms/ventana.jpg',
    difficulty: 'advanced',
    exercises: [
      { id: 'ex8', question: 'Когда "бросают дом в окно"?', options: ['При переезде', 'При больших тратах', 'При ссоре'], correctAnswer: 'При больших тратах' }
    ]
  },
  {
    id: '9',
    expression: 'Quedarse de piedra',
    literal: 'остаться камнем',
    meaning: 'Окаменеть от удивления',
    example: 'Когда услышал новость, me quedé de piedra.',
    category: 'Эмоции',
    imageUrl: '/idioms/quedarse_de_piedra.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex9', question: 'Чувство при "Quedarse de piedra":', options: ['Шок', 'Радость', 'Сонливость'], correctAnswer: 'Шок' }
    ]
  },
  {
    id: '10',
    expression: 'Hacerse la boca agua',
    literal: 'рот наполняется водой',
    meaning: 'Слюнки текут',
    example: 'Con solo oler la pizza, se me hace la boca agua.',
    category: 'Еда',
    imageUrl: '/idioms/hacerse_la_boca_agua.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex10', question: 'Когда "вода во рту"?', options: ['При жажде', 'При аппетите', 'При плавании'], correctAnswer: 'При аппетите' }
    ]
  },
  {
    id: '11',
    expression: 'Ser uña y carne',
    literal: 'быть ногтем и плотью',
    meaning: 'Неразлейвода',
    example: 'Pedro y Luis son uña y carne.',
    category: 'Отношения',
    imageUrl: '/idioms/ser_una_y_carne.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex11', question: 'Кто такие "uña y carne"?', options: ['Враги', 'Лучшие друзья', 'Повара'], correctAnswer: 'Лучшие друзья' }
    ]
  },
  {
    id: '12',
    expression: 'Dar en el clavo',
    literal: 'ударить по гвоздю',
    meaning: 'Попасть в точку',
    example: 'Tu respuesta dio en el clavo.',
    category: 'Действия',
    imageUrl: '/idioms/dar_en_el_clavo.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex12', question: 'Что означает "Dar en el clavo"?', options: ['Ошибиться', 'Угадать/быть правым', 'Сломать что-то'], correctAnswer: 'Угадать/быть правым' }
    ]
  },
  {
    id: '13',
    expression: 'Estar hasta en la sopa',
    literal: 'быть даже в супе',
    meaning: 'Быть повсюду',
    example: 'Esa canción está hasta en la sopa.',
    category: 'Еда',
    imageUrl: '/idioms/hasta_en_la_sopa.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex13', question: 'Если что-то "в супе", значит этого:', options: ['Мало', 'Слишком много везде', 'Вкусно'], correctAnswer: 'Слишком много везде' }
    ]
  },
  {
    id: '14',
    expression: 'Meter la pata',
    literal: 'засунуть лапу',
    meaning: 'Опростоволоситься',
    example: '¡Metí la pata! Le dije el secreto sin querer.',
    category: 'Действия',
    imageUrl: '/idioms/meter_la_pata.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex14', question: 'Что значит "Meter la pata"?', options: ['Танцевать', 'Сделать ошибку', 'Помочь'], correctAnswer: 'Сделать ошибку' }
    ]
  },
  {
    id: '15',
    expression: 'Tener un humor de perros',
    literal: 'иметь настроение собак',
    meaning: 'Быть в скверном настроении',
    example: 'No le hables hoy, tiene un humor de perros.',
    category: 'Эмоции',
    imageUrl: '/idioms/humor_de_perros.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex15', question: 'Какое настроение при "humor de perros"?', options: ['Веселое', 'Злое/плохое', 'Странное'], correctAnswer: 'Злое/плохое' }
    ]
  },
  {
    id: '16',
    expression: 'Dar la lata',
    literal: 'давать консервную банку',
    meaning: 'Надоедать / Донимать',
    example: '¡Deja de dar la lata con esa pregunta!',
    category: 'Действия',
    imageUrl: '/idioms/dar_la_lata.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex16', question: 'Что делает человек, который "da la lata"?', options: ['Дарит подарки', 'Раздражает', 'Поет'], correctAnswer: 'Раздражает' }
    ]
  },
  {
    id: '17',
    expression: 'Pasarse de la raya',
    literal: 'перейти через линию',
    meaning: 'Перейти черту',
    example: 'Te has pasado de la raya con tus insultos.',
    category: 'Действия',
    imageUrl: '/idioms/pasarse_de_la_raya.jpg',
    difficulty: 'advanced',
    exercises: [
      { id: 'ex17', question: 'Значение "Pasarse de la raya":', options: ['Победить в гонке', 'Нарушить границы', 'Рисовать'], correctAnswer: 'Нарушить границы' }
    ]
  },
  {
    id: '18',
    expression: 'Verlo todo de color de rosa',
    literal: 'видеть всё розового цвета',
    meaning: 'Смотреть сквозь розовые очки',
    example: 'Él es muy optimista, lo ve todo de color de rosa.',
    category: 'Характер',
    imageUrl: '/idioms/color_de_rosa.jpg',
    difficulty: 'intermediate',
    exercises: [
      { id: 'ex18', question: 'Кто видит всё в розовом цвете?', options: ['Художник', 'Оптимист', 'Слепой'], correctAnswer: 'Оптимист' }
    ]
  },
  {
    id: '19',
    expression: 'Cría cuervos y te sacarán los ojos',
    literal: 'расти воронов, и они выклюют тебе глаза',
    meaning: 'Пригреть змею на груди',
    example: 'Le ayudé mucho и теперь он меня предал. Cría cuervos...',
    category: 'Отношения',
    imageUrl: '/idioms/cria_cuervos.jpg',
    difficulty: 'advanced',
    exercises: [
      { id: 'ex19', question: 'О чем это выражение?', options: ['О любви к птицам', 'О неблагодарности', 'О зрении'], correctAnswer: 'О неблагодарности' }
    ]
  },
  {
    id: '20',
    expression: 'Dormir como un lirón',
    literal: 'спать как соня',
    meaning: 'Спать как сурок',
    example: 'Anoche estaba tan cansado que dormí como un lirón.',
    category: 'Действия',
    imageUrl: '/idioms/dormir_como_un_liron.jpg',
    difficulty: 'beginner',
    exercises: [
      { id: 'ex20', question: 'Как спит "lirón"?', options: ['Плохо', 'Очень крепко', 'Мало'], correctAnswer: 'Очень крепко' }
    ]
  }
];
