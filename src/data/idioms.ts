export interface Idiom {
  id: string;
  expression: string;
  meaning: string; // На испанском
  example: string; // На испанском
  literal: string; // Дословный перевод (можно оставить для справки)
  imageUrl: string;
  videoUrl?: string; // Ссылка на фрагмент
  category: string;
}

export const idioms: Idiom[] = [
  {
    id: '1',
    expression: 'Estar en las nubes',
    meaning: 'Estar despistado o pensando en cosas lejanas a la realidad.',
    example: 'Juan no escuchó la instrucción porque estaba en las nubes.',
    imageUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd',
    videoUrl: '/videos/estar_en_las_nubes.mp4',
    category: 'Estado mental',
    exercises: [
      {
        q: "Completa la frase: «Ana no escuchó la explicación del profesor porque estaba ________.»",
        options: ["en el sol", "en las nubes", "bajo la tierra"],
        a: "en las nubes"
      },
      {
        q: "Situación: Pedro mira por la ventana en la reunión. El jefe le pregunta su opinión, pero él no sabe de qué hablan. ¿Qué le sucede?",
        options: ["Está muy concentrado", "Está en las nubes", "Está de mal humor"],
        a: "Está en las nubes"
      },
      {
        q: "¿Cuál de estas frases significa lo mismo que 'Estar en las nubes'?",
        options: ["Estar muy feliz", "Estar despistado y no enterarse", "Viajar en un avión"],
        a: "Estar despistado y no enterarse"
      }
    ]
  }
];
{
  id: '2',
  expression: 'Ser pan comido',
  meaning: 'Describe una tarea o actividad que es extremadamente fácil de realizar.',
  example: 'No te preocupes por el examen; para ti va a ser pan comido.',
  imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', // Фото свежего хлеба
  videoUrl: '/videos/pan_comido.mp4', // Если добавишь видео позже
  category: 'Dificultad',
  exercises: [
    {
      q: "¿Qué significa realmente cuando alguien dice que una tarea 'es pan comido'?",
      options: [
        "Que es muy aburrida",
        "Que es muy fácil de hacer",
        "Que es imposible de terminar"
      ],
      a: "Que es muy fácil de hacer"
    },
    {
      q: "Completa la frase: «El rompecabezas de 10 piezas para el niño ________ pan comido».",
      options: ["está", "fue", "tiene"],
      a: "fue"
    },
    {
      q: "¿Cuál de estas expresiones es un sinónimo de 'Ser pan comido'?",
      options: [
        "Ser algo muy sencillo",
        "Ser algo muy caro",
        "Ser algo muy peligroso"
      ],
      a: "Ser algo muy sencillo"
    },
    {
      q: "— ¿Puedes arreglar mi computadora? \n— ¡Claro! Solo es un virus pequeño, ________.",
      options: [
        "estoy en las nubes",
        "es pan comido",
        "eres pan comido"
      ],
      a: "es pan comido"
    }
  ]
},
