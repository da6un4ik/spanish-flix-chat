export interface Exercise {
  id: string;
  question: string;
  options: string[];
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
    meaning: 'Разыгрывать кого-то (досл. "брать за волосы")',
    example: '¿De verdad ganaste la lotería или me estás tomando el pelo?',
    imageUrl: '/idioms/pelo.jpg',
    exercises: [
      {
        id: 'ex1',
        question: 'Что означает "Tomar el pelo"?',
        options: ['Стричь волосы', 'Разыгрывать', 'Злиться'],
        correctAnswer: 'Разыгрывать'
      }
    ]
  },
  {
    id: '2',
    expression: 'Estar como una cabra',
    meaning: 'Быть сумасшедшим (досл. "быть как коза")',
    example: 'Ese hombre habla solo, está como una cabra.',
    imageUrl: '/idioms/cabra.jpg',
    exercises: [
      {
        id: 'ex2',
        question: 'Как переводится "Estar como una cabra"?',
        options: ['Быть голодным', 'Быть сумасшедшим', 'Быть быстрым'],
        correctAnswer: 'Быть сумасшедшим'
      }
    ]
  },
  {
    id: '3',
    expression: 'Ser pan comido',
    meaning: 'Проще простого (досл. "быть съеденным хлебом")',
    example: 'El examen de español fue pan comido.',
    imageUrl: '/idioms/bread.jpg',
    exercises: [
      {
        id: 'ex3',
        question: 'Синоним "Ser pan comido" это:',
        options: ['Очень сложно', 'Очень легко', 'Очень вкусно'],
        correctAnswer: 'Очень легко'
      }
    ]
  },
  {
    id: '4',
    expression: 'Ponerse las pilas',
    meaning: 'Взяться за дело / Энергично начать (досл. "вставить батарейки")',
    example: 'Si quieres aprobar, tienes que ponerte las pilas.',
    imageUrl: '/idioms/batteries.jpg',
    exercises: [
      { id: 'ex4', question: 'Когда говорят "Ponerse las pilas"?', options: ['Когда хотят спать', 'Когда нужно ускориться', 'Когда сломался пульт'], correctAnswer: 'Когда нужно ускориться' }
    ]
  },
  {
    id: '5',
    expression: 'Estar en las nubes',
    meaning: 'Витать в облаках',
    example: 'Juan no escucha, siempre está en las nubes.',
    imageUrl: '/idioms/clouds.jpg',
    exercises: [
      { id: 'ex5', question: 'О ком говорят "está en las nubes"?', options: ['О пилоте', 'О невнимательном', 'О высоком человеке'], correctAnswer: 'О невнимательном' }
    ]
  },
  {
    id: '6',
    expression: 'No tener pelos en la lengua',
    meaning: 'Говорить прямо (досл. "не иметь волос на языке")',
    example: 'Ella dice lo que piensa, no tiene pelos en la lengua.',
    imageUrl: '/idioms/tongue.jpg',
    exercises: [
      { id: 'ex6', question: 'Человек без волос на языке это:', options: ['Искренний', 'Лжец', 'Молчаливый'], correctAnswer: 'Искренний' }
    ]
  },
  {
    id: '7',
    expression: 'Echar agua al mar',
    meaning: 'Бесполезное занятие (досл. "лить воду в море")',
    example: 'Tratar de convencerlo es como echar agua al mar.',
    imageUrl: '/idioms/sea.jpg',
    exercises: [
      { id: 'ex7', question: 'Что значит это выражение?', options: ['Поливать цветы', 'Бесполезное дело', 'Путешествовать'], correctAnswer: 'Бесполезное дело' }
    ]
  },
  {
    id: '8',
    expression: 'Tirar la casa por la ventana',
    meaning: 'Не жалеть денег (досл. "выбросить дом в окно")',
    example: 'Para su boda, tiraron la casa por la ventana.',
    imageUrl: '/idioms/window.jpg',
    exercises: [
      { id: 'ex8', question: 'Когда "бросают дом в окно"?', options: ['При переезде', 'При больших тратах', 'При ссоре'], correctAnswer: 'При больших тратах' }
    ]
  },
  {
    id: '9',
    expression: 'Quedarse de piedra',
    meaning: 'Окаменеть от удивления',
    example: 'Cuando escuché la noticia, me quedé de piedra.',
    imageUrl: '/idioms/stone.jpg',
    exercises: [
      { id: 'ex9', question: 'Чувство при "Quedarse de piedra":', options: ['Шок', 'Радость', 'Сонливость'], correctAnswer: 'Шок' }
    ]
  },
  {
    id: '10',
    expression: 'Hacerse la boca agua',
    meaning: 'Слюнки текут',
    example: 'Con solo oler la pizza, se me hace la boca agua.',
    imageUrl: '/idioms/pizza.jpg',
    exercises: [
      { id: 'ex10', question: 'Когда "вода во рту"?', options: ['При жажде', 'При аппетите', 'При плавании'], correctAnswer: 'При аппетите' }
    ]
  },
  {
    id: '11',
    expression: 'Ser uña и carne',
    meaning: 'Неразлейвода (досл. "быть ногтем и плотью")',
    example: 'Pedro и Luis son uña и carne.',
    imageUrl: '/idioms/friends.jpg',
    exercises: [
      { id: 'ex11', question: 'Кто такие "uña и carne"?', options: ['Враги', 'Лучшие друзья', 'Повара'], correctAnswer: 'Лучшие друзья' }
    ]
  },
  {
    id: '12',
    expression: 'Dar en el clavo',
    meaning: 'Попасть в точку (досл. "ударить по гвоздю")',
    example: 'Tu respuesta dio en el clavo.',
    imageUrl: '/idioms/nail.jpg',
    exercises: [
      { id: 'ex12', question: 'Что означает "Dar en el clavo"?', options: ['Ошибиться', 'Угадать/быть правым', 'Сломать что-то'], correctAnswer: 'Угадать/быть правым' }
    ]
  },
  {
    id: '13',
    expression: 'Estar hasta en la sopa',
    meaning: 'Быть повсюду (досл. "быть даже в супе")',
    example: 'Esa canción está hasta en la sopa.',
    imageUrl: '/idioms/soup.jpg',
    exercises: [
      { id: 'ex13', question: 'Если что-то "в супе", значит этого:', options: ['Мало', 'Слишком много везде', 'Вкусно'], correctAnswer: 'Слишком много везде' }
    ]
  },
  {
    id: '14',
    expression: 'Meter la pata',
    meaning: 'Сглупить / Опростоволоситься (досл. "засунуть лапу")',
    example: '¡Metí la pata! Le dije el secreto sin querer.',
    imageUrl: '/idioms/leg.jpg',
    exercises: [
      { id: 'ex14', question: 'Что значит "Meter la pata"?', options: ['Танцевать', 'Сделать ошибку', 'Помочь'], correctAnswer: 'Сделать ошибку' }
    ]
  },
  {
    id: '15',
    expression: 'Tener un humor de perros',
    meaning: 'Быть в скверном настроении',
    example: 'No le hables hoy, tiene un humor de perros.',
    imageUrl: '/idioms/dog.jpg',
    exercises: [
      { id: 'ex15', question: 'Какое настроение при "humor de perros"?', options: ['Веселое', 'Злое/плохое', 'Странное'], correctAnswer: 'Злое/плохое' }
    ]
  },
  {
    id: '16',
    expression: 'Dar la lata',
    meaning: 'Надоедать / Донимать (досл. "давать консервную банку")',
    example: '¡Deja de dar la lata con esa pregunta!',
    imageUrl: '/idioms/can.jpg',
    exercises: [
      { id: 'ex16', question: 'Что делает человек, который "da la lata"?', options: ['Дарит подарки', 'Раздражает', 'Поет'], correctAnswer: 'Раздражает' }
    ]
  },
  {
    id: '17',
    expression: 'Pasarse de la raya',
    meaning: 'Перейти черту',
    example: 'Te has pasado de la raya con tus insultos.',
    imageUrl: '/idioms/line.jpg',
    exercises: [
      { id: 'ex17', question: 'Значение "Pasarse de la raya":', options: ['Победить в гонке', 'Нарушить границы', 'Рисовать'], correctAnswer: 'Нарушить границы' }
    ]
  },
  {
    id: '18',
    expression: 'Verlo todo de color de rosa',
    meaning: 'Смотреть сквозь розовые очки',
    example: 'Él es muy optimista, lo ve todo de color de rosa.',
    imageUrl: '/idioms/pink.jpg',
    exercises: [
      { id: 'ex18', question: 'Кто видит всё в розовом цвете?', options: ['Художник', 'Оптимист', 'Слепой'], correctAnswer: 'Оптимист' }
    ]
  },
  {
    id: '19',
    expression: 'Cría cuervos и te sacarán los ojos',
    meaning: 'Пригреть змею на груди (досл. "расти воронов, и они выклюют тебе глаза")',
    example: 'Le ayudé mucho и ahora me traiciona. Cría cuervos...',
    imageUrl: '/idioms/crow.jpg',
    exercises: [
      { id: 'ex19', question: 'О чем это выражение?', options: ['О любви к птицам', 'О неблагодарности', 'О зрении'], correctAnswer: 'О неблагодарности' }
    ]
  },
  {
    id: '20',
    expression: 'Dormir como un lirón',
    meaning: 'Спать как сурок (досл. "как соня")',
    example: 'Anoche estaba tan cansado que dormí como un lirón.',
    imageUrl: '/idioms/sleep.jpg',
    exercises: [
      { id: 'ex20', question: 'Как спит "lirón"?', options: ['Плохо', 'Очень крепко', 'Мало'], correctAnswer: 'Очень крепко' }
    ]
  }
];
