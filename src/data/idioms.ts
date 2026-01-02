export interface Exercise {
  q: string;
  options: string[];
  a: string;
}

export interface Idiom {
  id: string;
  expression: string;
  meaning: string;
  example: string;
  imageUrl: string;
  videoUrl?: string;
  category: string;
  exercises: Exercise[];
}

export const idioms: Idiom[] = [
  {
    id: '1',
    expression: 'Estar en las nubes',
    meaning: 'Estar despistado o pensando en cosas lejanas a la realidad.',
    example: 'Ana no escuchó la explicación del profesor porque estaba en las nubes.',
    imageUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd',
    videoUrl: '/videos/nubes.mp4',
    category: 'Estado mental',
    exercises: [
      {
        q: "Completa la frase: «Ana no escuchó la explicación del profesor porque estaba ________.»",
        options: ["en el sol", "en las nubes", "bajo la tierra"],
        a: "en las nubes"
      },
      {
        q: "Pedro mira por la ventana en la reunión y no sabe de qué hablan. ¿Qué le sucede?",
        options: ["Está muy concentrado", "Está en las nubes", "Está de mal humor"],
        a: "Está en las nubes"
      },
      {
        q: "¿Cuál de estas frases significa lo mismo que 'Estar en las nubes'?",
        options: ["Estar muy feliz", "Estar despistado y no enterarse", "Viajar en un avión"],
        a: "Estar despistado y no enterarse"
      }
    ]
  },
  {
    id: '2',
    expression: 'Ser pan comido',
    meaning: 'Describe una tarea o actividad que es extremadamente fácil de realizar.',
    example: 'No te preocupes por el examen de conducir; para ti va a ser pan comido.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    videoUrl: '/videos/pan_comido.mp4',
    category: 'Dificultad',
    exercises: [
      {
        q: "¿Qué significa realmente cuando alguien dice que una tarea 'es pan comido'?",
        options: ["Que es muy aburrida", "Que es muy fácil de hacer", "Que es imposible"],
        a: "Que es muy fácil de hacer"
      },
      {
        q: "Completa la frase: «El rompecabezas de 10 piezas para el niño ________ pan comido».",
        options: ["está", "fue", "tiene"],
        a: "fue"
      },
      {
        q: "¿Cuál de estas expresiones es un sinónimo de 'Ser pan comido'?",
        options: ["Ser algo muy sencillo", "Ser algo muy caro", "Ser algo muy peligroso"],
        a: "Ser algo muy sencillo"
      },
      {
        q: "— ¿Puedes arreglar mi computadora? \n— ¡Claro! Solo es un virus pequeño, ________.",
        options: ["estoy en las nubes", "es pan comido", "eres pan comido"],
        a: "es pan comido"
      }
    ]
  },
  {
    id: '3',
    expression: 'Costar un ojo de la cara',
    meaning: 'Se utiliza para decir que algo es extremadamente caro o tiene un precio excesivo.',
    example: 'Me encanta ese coche deportivo, pero estoy seguro de que debe costar un ojo de la cara.',
    imageUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366',
    videoUrl: '/videos/ojo_cara.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: "Si un reloj 'cuesta un ojo de la cara', ¿qué podemos decir del reloj?",
        options: ["Que es muy antiguo", "Que el precio es muy elevado", "Que está roto"],
        a: "Que el precio es muy elevado"
      },
      {
        q: "Completa: «El viaje a Japón fue increíble, pero los billetes me ________ un ojo de la cara».",
        options: ["valieron", "costaron", "gastaron"],
        a: "costaron"
      },
      {
        q: "¿Qué frase es lo OPUESTO a 'Costar un ojo de la cara'?",
        options: ["Ser muy difícil", "Ser muy barato", "Ser pan comido"],
        a: "Ser muy barato"
      },
      {
        q: "¿En qué escenario usarías esta expresión?",
        options: ["Comprar una manzana", "Ver el precio de una mansión", "Recibir un descuento"],
        a: "Ver el precio de una mansión"
      }
    ]
  },
  {
    id: '4',
    expression: 'Meter la pata',
    meaning: 'Cometer un error, decir algo inoportuno o actuar de manera torpe en una situación social.',
    example: '¡Uy, metí la pata! Le pregunté a Laura por su novio, pero se habían separado ayer.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041',
    videoUrl: '/videos/meter_pata.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente la expresión 'Meter la pata'?",
        options: ["Poner el pie en un lugar peligroso", "Comprar algo caro", "Cometer un error"],
        a: "Cometer un error"
      },
      {
        q: "Completa con la forma correcta: «¡Qué vergüenza! Yo siempre ________ la pata con mi jefe».",
        options: ["metes", "metemos", "meto"],
        a: "meto"
      },
      {
        q: "¿En qué situación es más probable que alguien 'metiera la pata'?",
        options: ["Al sacar un 10", "Al revelar un secreto por accidente", "Al cocinar bien"],
        a: "Al revelar un secreto por accidente"
      },
      {
        q: "¿Cuál de estas expresiones es similar a 'Meter la pata'?",
        options: ["Hacerlo muy bien", "Cometer una equivocación", "Estar en las nubes"],
        a: "Cometer una equivocación"
      }
    ]
  }
];
