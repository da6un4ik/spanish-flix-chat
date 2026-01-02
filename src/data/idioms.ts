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
        q: "Completa la frase: «Ana no escuchó la explicación porque estaba ________.»",
        options: ["en el sol", "en las nubes", "bajo la tierra"],
        a: "en las nubes"
      },
      {
        q: "Pedro mira por la ventana y no sabe de qué hablan. ¿Qué le sucede?",
        options: ["Está muy concentrado", "Está en las nubes", "Está de mal humor"],
        a: "Está en las nubes"
      },
      {
        q: "¿Cuál significa lo mismo que 'Estar en las nubes'?",
        options: ["Estar muy feliz", "Estar despistado", "Viajar en avión"],
        a: "Estar despistado"
      }
    ]
  },
  {
    id: '2',
    expression: 'Ser pan comido',
    meaning: 'Describe una tarea o actividad que es extremadamente fácil de realizar.',
    example: 'No te preocupes por el examen; para ti va a ser pan comido.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    videoUrl: '/videos/pan_comido.mp4',
    category: 'Dificultad',
    exercises: [
      {
        q: "¿Qué significa que una tarea 'es pan comido'?",
        options: ["Que es aburrida", "Que es muy fácil", "Que es imposible"],
        a: "Que es muy fácil"
      },
      {
        q: "Completa: «El rompecabezas de 10 piezas para el niño ________ pan comido».",
        options: ["está", "fue", "tiene"],
        a: "fue"
      },
      {
        q: "— ¿Puedes arreglar mi PC? — ¡Claro! Solo es un virus pequeño, ________.",
        options: ["estoy en las nubes", "es pan comido", "eres pan comido"],
        a: "es pan comido"
      }
    ]
  },
  {
    id: '3',
    expression: 'Costar un ojo de la cara',
    meaning: 'Se utiliza para decir que algo es extremadamente caro.',
    example: 'Ese coche deportivo es increíble, pero debe costar un ojo de la cara.',
    imageUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366',
    videoUrl: '/videos/ojo_cara.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: "Si un reloj 'cuesta un ojo de la cara', ¿qué podemos decir de él?",
        options: ["Que es antiguo", "Que su precio es muy elevado", "Que está roto"],
        a: "Que su precio es muy elevado"
      },
      {
        q: "Completa: «El viaje fue increíble, pero los billetes me ________ un ojo de la cara».",
        options: ["valieron", "costaron", "gastaron"],
        a: "costaron"
      },
      {
        q: "¿Qué frase es lo OPUESTO a 'Costar un ojo de la cara'?",
        options: ["Ser muy difícil", "Ser muy barato", "Ser pan comido"],
        a: "Ser muy barato"
      }
    ]
  },
  {
    id: '4',
    expression: 'Meter la pata',
    meaning: 'Cometer un error, decir algo inoportuno o actuar de manera torpe.',
    example: '¡Uy, metí la pata! Le pregunté a Laura por su novio y habían terminado.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041',
    videoUrl: '/videos/meter_pata.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente la expresión 'Meter la pata'?",
        options: ["Tropezar en la calle", "Cometer un error", "Caminar rápido"],
        a: "Cometer un error"
      },
      {
        q: "Completa: «¡Qué vergüenza! Yo siempre ________ la pata con mi jefe».",
        options: ["metes", "meto", "metemos"],
        a: "meto"
      },
      {
        q: "¿Cuál de estas expresiones es similar?",
        options: ["Hacerlo bien", "Cometer una equivocación", "Estar en las nubes"],
        a: "Cometer una equivocación"
      }
    ]
  },
  {
    id: '5',
    expression: 'Tomar el pelo',
    meaning: 'Burlarse de alguien amistosamente o intentar engañarle con una broma.',
    example: '¿De verdad ganaste la lotería? ¡No me tomes el pelo!',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c',
    videoUrl: '/videos/tomar_pelo.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa 'Tomar el pelo' a alguien?",
        options: ["Lavarle el cabello", "Hacerle una broma", "Cortarle el pelo"],
        a: "Hacerle una broma"
      },
      {
        q: "Completa: «¿El examen es hoy? ¡No me ________ el pelo!»",
        options: ["tomes", "comes", "metas"],
        a: "tomes"
      }
    ]
  },
  {
    id: '6',
    expression: 'Estar como una cabra',
    meaning: 'Decir que alguien está loco o hace cosas muy extrañas y divertidas.',
    example: 'Mi abuelo se bañó en el río en invierno, ¡está como una cabra!',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881',
    videoUrl: '/videos/cabra.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "Elige el verbo adecuado: «Marta siempre hace cosas raras. ________ como una cabra».",
        options: ["es", "está", "tiene"],
        a: "está"
      },
      {
        q: "¿Qué significa estar como una cabra?",
        options: ["Estar hambriento", "Estar un poco loco", "Ser muy rápido"],
        a: "Estar un poco loco"
      }
    ]
  },
  {
    id: '7',
    expression: 'Llover a cántaros',
    meaning: 'Se utiliza cuando la lluvia es muy intensa, fuerte y abundante.',
    example: 'No podemos ir al parque, está lloviendo a cántaros y nos vamos a mojar.',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0',
    videoUrl: '/videos/llover_cantaros.mp4',
    category: 'Naturaleza',
    exercises: [
      {
        q: "¿Qué clima hace si 'llueve a cántaros'?",
        options: ["Hace sol", "Lluvia muy fina", "Lluvia muy fuerte"],
        a: "Lluvia muy fuerte"
      },
      {
        q: "Completa: «¡Busca un paraguas! Está lloviendo a ________».",
        options: ["cubos", "cántaros", "vasos"],
        a: "cántaros"
      }
    ]
  },
  {
    id: '8',
    expression: 'Ponerse las pilas',
    meaning: 'Empezar a esforzarse o actuar con energía y rapidez.',
    example: 'Si quieres aprobar, tienes que ponerte las pilas y estudiar ahora.',
    imageUrl: 'https://images.unsplash.com/photo-1619641634305-677a5bc690ab',
    videoUrl: '/videos/ponerse_pilas.mp4',
    category: 'Motivación',
    exercises: [
      {
        q: "¿Qué significa realmente 'Ponerse las pilas'?",
        options: ["Comprar baterías", "Esforzarse y activarse", "Irse a dormir"],
        a: "Esforzarse y activarse"
      },
      {
        q: "Un entrenador dice: «¡Vamos equipo! ¡________ las pilas para ganar!».",
        options: ["Ponéis", "Poneos", "Ponía"],
        a: "Poneos"
      }
    ]
  },
  {
    id: '9',
    expression: 'Quedarse de piedra',
    meaning: 'Sentir una sorpresa tan fuerte que no puedes reaccionar ni moverte.',
    example: 'Cuando me dijo que se mudaba hoy, me quedé de piedra.',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642',
    videoUrl: '/videos/quedarse_piedra.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente alguien que 'se queda de piedra'?",
        options: ["Cansado", "Extremadamente sorprendido", "Enfadado"],
        a: "Extremadamente sorprendido"
      },
      {
        q: "Completa: «Al ver el precio de la casa, me ________ de piedra».",
        options: ["quedamos", "quedé", "quedas"],
        a: "quedé"
      }
    ]
  },
  {
    id: '10',
    expression: 'Echar leña al fuego',
    meaning: 'Hacer o decir algo que empeora una situación conflictiva.',
    example: 'Ellos ya están discutiendo; no digas nada para no echar leña al fuego.',
    imageUrl: 'https://images.unsplash.com/photo-1545147986-a9d6f210df77',
    videoUrl: '/videos/lena_fuego.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Cuál es el resultado de 'echar leña al fuego'?",
        options: ["Se calman", "El conflicto empeora", "Se ríen"],
        a: "El conflicto empeora"
      },
      {
        q: "Sustituye por un verbo: ¿Qué es echar leña al fuego?",
        options: ["Solucionar", "Empeorar", "Olvidar"],
        a: "Empeorar"
      }
    ]
  },
  {
    id: '11',
    expression: 'Tener mala leche',
    meaning: 'Tener mal carácter, mala intención o mala suerte.',
    example: 'Ten cuidado con el jefe hoy; ha venido con muy mala leche.',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    videoUrl: '/videos/mala_leche.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Qué significa que alguien 'tiene mala leche'?",
        options: ["Bebe mucha leche", "Tiene mal carácter", "Es muy divertido"],
        a: "Tiene mal carácter"
      },
      {
        q: "Completa: «¡Qué ________ leche! Perdí el bus por un segundo».",
        options: ["buena", "poca", "mala"],
        a: "mala"
      }
    ]
  },
  {
    id: '12',
    expression: 'Consultar con la almohada',
    meaning: 'Tomar tiempo para pensar antes de tomar una decisión importante.',
    example: 'La oferta es buena, pero antes de decir sí, debo consultarlo con la almohada.',
    imageUrl: 'https://images.unsplash.com/photo-1520206115501-d70d3f023821',
    videoUrl: '/videos/almohada.mp4',
    category: 'Decisiones',
    exercises: [
      {
        q: "¿Qué hace quien 'consulta con la almohada'?",
        options: ["Duerme mucho", "Reflexiona antes de decidir", "Habla solo"],
        a: "Reflexiona antes de decidir"
      }
    ]
  },
  {
    id: '13',
    expression: 'Ser un trozo de pan',
    meaning: 'Persona extremadamente buena, noble, generosa y de gran corazón.',
    example: 'Mi abuela ayuda a todos; es que es un trozo de pan.',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73',
    videoUrl: '/videos/trozo_pan.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Cómo es un 'trozo de pan'?",
        options: ["Persona bondadosa", "Persona débil", "Persona con hambre"],
        a: "Persona bondadosa"
      },
      {
        q: "Completa: «Mi hermano nunca se enfada. Él ________ un trozo de pan».",
        options: ["está", "es", "tiene"],
        a: "es"
      }
    ]
  },
  {
    id: '14',
    expression: 'Matar dos pájaros de un tiro',
    meaning: 'Lograr dos objetivos con una sola acción.',
    example: 'Iré al banco y compraré el pan al lado; así mato dos pájaros de un tiro.',
    imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890',
    videoUrl: '/videos/dos_pajaros.mp4',
    category: 'Eficiencia',
    exercises: [
      {
        q: "¿Qué describe mejor esta expresión?",
        options: ["Pereza", "Eficiencia", "Confusión"],
        a: "Eficiencia"
      },
      {
        q: "Completa: «Matamos dos ________ de un ________».",
        options: ["perros / salto", "pájaros / tiro", "aviones / vuelo"],
        a: "pájaros / tiro"
      }
    ]
  },
  {
    id: '15',
    expression: 'Tirar la casa por la ventana',
    meaning: 'Derrochar recursos económicos en una ocasión especial.',
    example: 'Para su boda, decidieron tirar la casa por la ventana.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    videoUrl: '/videos/casa_ventana.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: "¿Qué hicieron los García al alquilar un jet para su fiesta?",
        options: ["Ahorraron dinero", "Tiraron la casa por la ventana", "Metieron la pata"],
        a: "Tiraron la casa por la ventana"
      },
      {
        q: "¿En qué situación NO se usa esta expresión?",
        options: ["Boda de lujo", "Pagar factura de luz con retraso", "Viaje de herencia"],
        a: "Pagar factura de luz con retraso"
      }
    ]
  }
];
