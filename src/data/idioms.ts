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
        q: "¿En qué escenario usarías esta expresión?",
        options: ["Comprar una manzana", "Arreglar un virus informático pequeño", "Recibir un descuento"],
        a: "Arreglar un virus informático pequeño"
      }
    ]
  },
  {
    id: '3',
    expression: 'Costar un ojo de la cara',
    meaning: 'Se utiliza para decir que algo es extremadamente caro.',
    example: 'Me encanta ese coche deportivo, pero debe costar un ojo de la cara.',
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
        q: "¿Qué frase es lo OPUESTO a 'Costar un ojo de la cara'?",
        options: ["Ser muy difícil", "Ser muy barato", "Ser pan comido"],
        a: "Ser muy barato"
      }
    ]
  },
  {
    id: '4',
    expression: 'Meter la pata',
    meaning: 'Cometer un error o decir algo inoportuno en una situación social.',
    example: '¡Uy, metí la pata! Le pregunté a Laura por su novio, pero se habían separado.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041',
    videoUrl: '/videos/meter_pata.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente la expresión 'Meter la pata'?",
        options: ["Poner el pie en peligro", "Cometer un error", "Comprar algo caro"],
        a: "Cometer un error"
      },
      {
        q: "¿En qué situación es más probable que alguien 'metiera la pata'?",
        options: ["Al sacar un 10", "Al revelar un secreto por accidente", "Al cocinar bien"],
        a: "Al revelar un secreto por accidente"
      }
    ]
  },
  {
    id: '5',
    expression: 'Tomar el pelo',
    meaning: 'Burlarse de alguien de manera amistosa o intentar engañarle con una broma.',
    example: '¿De verdad ganaste la lotería? ¡No me tomes el pelo!',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c',
    videoUrl: '/videos/tomar_pelo.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente 'Tomar el pelo' a alguien?",
        options: ["Lavarle el cabello", "Hacerle una broma o engañarle", "Cortarle el pelo"],
        a: "Hacerle una broma o engañarle"
      },
      {
        q: "Si un amigo te dice algo increíble y no le crees, ¿qué le dices?",
        options: ["Estás en las nubes", "¡Me estás tomando el pelo!", "Es pan comido"],
        a: "¡Me estás tomando el pelo!"
      }
    ]
  },
  {
    id: '6',
    expression: 'Estar como una cabra',
    meaning: 'Se utiliza para decir que alguien está loco o hace cosas muy extrañas.',
    example: 'Mi abuelo se bañó en el río en pleno invierno, ¡está como una cabra!',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Qué significa que una persona 'está como una cabra'?",
        options: ["Que tiene hambre", "Que está loca o hace cosas raras", "Que es lenta"],
        a: "Que está loca o hace cosas raras"
      }
    ]
  },
  {
    id: '7',
    expression: 'Llover a cántaros',
    meaning: 'Se utiliza cuando la lluvia es muy intensa y abundante.',
    example: 'No podemos ir al parque ahora, está lloviendo a cántaros.',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0',
    category: 'Naturaleza',
    exercises: [
      {
        q: "¿Qué clima hace si 'llueve a cántaros'?",
        options: ["Hace mucho sol", "Lluvia fina", "Lluvia muy fuerte"],
        a: "Lluvia muy fuerte"
      }
    ]
  },
  {
    id: '8',
    expression: 'Ponerse las pilas',
    meaning: 'Empezar a esforzarse o actuar con energía y rapidez.',
    example: 'Si quieres aprobar, tienes que ponerte las pilas y estudiar ya.',
    imageUrl: 'https://images.unsplash.com/photo-1619641634305-677a5bc690ab',
    category: 'Motivación',
    exercises: [
      {
        q: "¿Qué significa 'Ponerse las pilas'?",
        options: ["Comprar baterías", "Trabajar con energía", "Irse a dormir"],
        a: "Trabajar con energía"
      }
    ]
  },
  {
    id: '9',
    expression: 'Quedarse de piedra',
    meaning: 'Sentir una sorpresa tan fuerte que no puedes reaccionar.',
    example: 'Cuando me dijo que se mudaba mañana mismo, me quedé de piedra.',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente una persona que 'se queda de piedra'?",
        options: ["Cansada", "Extremadamente sorprendida", "Enfadada"],
        a: "Extremadamente sorprendida"
      }
    ]
  },
  {
    id: '10',
    expression: 'Echar leña al fuego',
    meaning: 'Hacer o decir algo que empeora una situación conflictiva.',
    example: 'Ellos ya están discutiendo; por favor, no eches leña al fuego.',
    imageUrl: 'https://images.unsplash.com/photo-1545147986-a9d6f210df77',
    category: 'Social',
    exercises: [
      {
        q: "¿Cuál es el resultado de 'echar leña al fuego'?",
        options: ["La discusión termina", "El conflicto se agrava", "Se piden perdón"],
        a: "El conflicto se agrava"
      }
    ]
  },
  {
    id: '11',
    expression: 'Tener mala leche',
    meaning: 'Tener mal carácter, mala intención o mala suerte.',
    example: 'Ten cuidado con el jefe hoy; ha venido con muy mala leche.',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Qué significa que una persona 'tiene mala leche'?",
        options: ["Le gusta la leche", "Tiene mal carácter", "Es divertida"],
        a: "Tiene mal carácter"
      }
    ]
  },
  {
    id: '12',
    expression: 'Consultar con la almohada',
    meaning: 'Tomar tiempo para pensar antes de tomar una decisión importante.',
    example: 'Es una buena oferta, pero necesito consultarlo con la almohada.',
    imageUrl: 'https://images.unsplash.com/photo-1520206115501-d70d3f023821',
    category: 'Decisiones',
    exercises: [
      {
        q: "¿Qué hace alguien que 'consulta con la almohada'?",
        options: ["Compra una almohada", "Espera al día siguiente para decidir", "Duerme mucho"],
        a: "Espera al día siguiente para decidir"
      }
    ]
  },
  {
    id: '13',
    expression: 'Ser un trozo de pan',
    meaning: 'Describe a una persona que es extremadamente buena y generosa.',
    example: 'Mi abuela ayuda a todos los vecinos; es un trozo de pan.',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Cómo es una persona que es 'un trozo de pan'?",
        options: ["Tiene hambre", "Es muy bondadosa", "Cocina muy bien"],
        a: "Es muy bondadosa"
      }
    ]
  },
  {
    id: '14',
    expression: 'Matar dos pájaros de un tiro',
    meaning: 'Lograr dos objetivos con una sola acción.',
    example: 'Ya que voy al banco, compraré el pan; así mato dos pájaros de un tiro.',
    imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890',
    category: 'Eficiencia',
    exercises: [
      {
        q: "¿Qué significa realmente 'matar dos pájaros de un tiro'?",
        options: ["Cazar", "Resolver dos asuntos con una acción", "Cometer dos errores"],
        a: "Resolver dos asuntos con una acción"
      }
    ]
  },
  {
    id: '15',
    expression: 'Tirar la casa por la ventana',
    meaning: 'Derrochar mucho dinero en una ocasión especial.',
    example: 'Para la boda de su hija, decidieron tirar la casa por la ventana.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    category: 'Dinero',
    exercises: [
      {
        q: "¿Qué significa 'tirar la casa por la ventana'?",
        options: ["Mudarse", "Gastar mucho dinero en una fiesta", "Limpiar la casa"],
        a: "Gastar mucho dinero en una fiesta"
      }
    ]
  },
  {
    id: '16',
    expression: 'Estar sin blanca',
    meaning: 'No tener nada de dinero en un momento determinado.',
    example: 'Me encantaría ir al cine, pero me he quedado sin blanca.',
    imageUrl: 'https://images.unsplash.com/photo-1628527304948-06157ee3c8a6',
    category: 'Dinero',
    exercises: [
      {
        q: "¿Cuál describe a alguien 'sin blanca'?",
        options: ["Comprar una casa al contado", "Pedir prestado para el bus", "Ganar la lotería"],
        a: "Pedir prestado para el bus"
      }
    ]
  },
  {
    id: '17',
    expression: 'Echar un cable',
    meaning: 'Ayudar a alguien en una situación difícil o con mucho trabajo.',
    example: 'Si quieres voy esta tarde para echarte un cable con las cajas.',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente 'echar un cable'?",
        options: ["Comprar cables", "Ayudar a una persona", "Estar enfadado"],
        a: "Ayudar a una persona"
      }
    ]
  },
  {
    id: '18',
    expression: 'Ir al grano',
    meaning: 'Hablar de lo más importante directamente, sin rodeos.',
    example: 'No tenemos tiempo, así que, por favor, ve al grano.',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44',
    category: 'Comunicación',
    exercises: [
      {
        q: "¿Qué significa 'ir al grano'?",
        options: ["Comprar cereales", "Hablar de lo importante directamente", "Contar cuentos"],
        a: "Hablar de lo importante directamente"
      }
    ]
  },
  {
    id: '19',
    expression: 'Dar en el clavo',
    meaning: 'Acertar plenamente o encontrar la solución exacta a un problema.',
    example: 'Cuando dijiste que el problema era el cable, diste en el clavo.',
    imageUrl: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c',
    category: 'Éxito',
    exercises: [
      {
        q: "¿Qué significa 'dar en el clavo'?",
        options: ["Golpearse", "Acertar la solución exacta", "Olvidar algo"],
        a: "Acertar la solución exacta"
      }
    ]
  },
  {
    id: '20',
    expression: 'Estar hecho un ají',
    meaning: 'Estar muy enojado, furioso o irritado.',
    example: 'Cuando vio el coche rayado, se puso hecho un ají.',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente alguien 'hecho un ají'?",
        options: ["Tiene frío", "Está muy furioso", "Tiene hambre"],
        a: "Está muy furioso"
      }
    ]
  },
  {
    id: '21',
    expression: 'Hablar a la pared',
    meaning: 'Intentar hablar con alguien que no te presta atención.',
    example: 'Le digo que ordene su cuarto, pero es como hablar a la pared.',
    imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2',
    category: 'Comunicación',
    exercises: [
      {
        q: "¿Qué significa 'hablar a la pared'?",
        options: ["Pared delgada", "La otra persona te ignora", "Hablar solo"],
        a: "La otra persona te ignora"
      }
    ]
  },
  {
    id: '22',
    expression: 'Dar gato por liebre',
    meaning: 'Engañar a alguien dándole algo de menor calidad de lo acordado.',
    example: 'El teléfono no funciona; me han dado gato por liebre.',
    imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6',
    category: 'Dinero',
    exercises: [
      {
        q: "¿Qué sucede cuando te 'dan gato por liebre'?",
        options: ["Regalo nuevo", "Engaño con la calidad", "Descuento"],
        a: "Engaño con la calidad"
      }
    ]
  },
  {
    id: '23',
    expression: 'Poner los puntos sobre las íes',
    meaning: 'Aclarar las cosas con detalle para que no haya dudas.',
    example: 'Vamos a poner los puntos sobre las íes para saber qué hacer.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    category: 'Comunicación',
    exercises: [
      {
        q: "¿Qué haces al 'poner los puntos sobre las íes'?",
        options: ["Buena caligrafía", "Dejar las cosas claras", "Error gramatical"],
        a: "Dejar las cosas claras"
      }
    ]
  },
  {
    id: '24',
    expression: 'Estar como pez en el agua',
    meaning: 'Sentirse muy cómodo y seguro en un lugar o actividad.',
    example: 'En la piscina, María está como pez en el agua.',
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente alguien 'como pez en el agua'?",
        options: ["Cómodo y feliz", "Con frío", "Confundido"],
        a: "Cómodo y feliz"
      }
    ]
  },
  {
    id: '25',
    expression: 'Buscarle tres pies al gato',
    meaning: 'Complicar algo sencillo o buscar problemas donde no los hay.',
    example: 'No intentes buscarle tres pies al gato; es muy simple.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    category: 'Psicología',
    exercises: [
      {
        q: "¿Qué hace quien 'busca tres pies al gato'?",
        options: ["Ayuda animales", "Complica las cosas", "Va al grano"],
        a: "Complica las cosas"
      },
      {
        q: "¿En qué situación se usa?",
        options: ["Ver significados secretos donde no los hay", "Echar un cable", "Estar sin blanca"],
        a: "Ver significados secretos donde no los hay"
      }
    ]
  },
    {
  id: '26',
  expression: 'No hay mal que dure cien años',
  meaning: 'Las situaciones malas no son infinitas; siempre terminan tarde o temprano.',
  example: 'Sé que estás triste por tu trabajo, pero ten paciencia, no hay mal que dure cien años.',
  imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94', // Imagen de un amanecer tras la tormenta
  category: 'Psicología',
  exercises: [
    {
      q: "¿Cuándo usamos esta expresión?",
      options: [
        "Para celebrar un éxito",
        "Para consolar a alguien con un problema",
        "Para ir al grano rápido"
      ],
      a: "Para consolar a alguien con un problema"
    },
    {
      q: "Completa el refrán: «No hay ______ que dure cien años».",
      options: [
        "bien",
        "mal",
        "tiempo"
      ],
      a: "mal"
    },
    {
      q: "¿Cuál es el mensaje principal de este refrán?",
      options: [
        "La vida es muy corta",
        "Los problemas siempre terminan",
        "La salud dura un siglo"
      ],
      a: "Los problemas siempre terminan"
    },
    {
      q: "Si un amigo tiene una semana terrible, ¿qué le dirías para tranquilizarlo?",
      options: [
        "No le busques tres pies al gato",
        "Ánimo, no hay mal que dure cien años",
        "Estás como pez en el agua"
      ],
      a: "Ánimo, no hay mal que dure cien años"
    }
  ]
},{
  id: '27',
  expression: 'Ser del año de la pera',
  meaning: 'Algo que es muy antiguo, viejo o que está pasado de moda.',
  example: 'Mira ese ordenador, no tiene ni internet; debe de ser del año de la pera.',
  imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03', // Imagen de una radio o cámara antigua
  category: 'Tiempo',
  exercises: [
    {
      q: "¿A qué se refiere alguien cuando dice que algo es 'del año de la pera'?",
      options: [
        "A una fruta muy rica",
        "A algo muy viejo o antiguo",
        "A algo muy moderno"
      ],
      a: "A algo muy viejo o antiguo"
    },
    {
      q: "Esa chaqueta es del año de la ________, ya no se lleva nada.",
      options: [
        "manzana",
        "pera",
        "uva"
      ],
      a: "pera"
    },
    {
      q: "¿En qué situación usarías esta expresión?",
      options: [
        "Al ver una película que se estrenó ayer",
        "Al encontrar el coche de tu abuelo que tiene 50 años",
        "Al hablar de un amigo bondadoso"
      ],
      a: "Al encontrar el coche de tu abuelo que tiene 50 años"
    },
    {
      q: "¿Cuál sería el opuesto de algo que es 'del año de la pera'?",
      options: [
        "Algo que cuesta un ojo de la cara",
        "Algo de última generación",
        "Algo que es pan comido"
      ],
      a: "Algo de última generación"
    }
  ]
},{
  id: '28',
  expression: 'Estar hasta las narices',
  meaning: 'Estar muy cansado de algo o de alguien; no tener más paciencia.',
  example: 'Llevo tres horas esperando y el tren no llega; estoy hasta las narices.',
  imageUrl: 'https://images.unsplash.com/photo-15423938818e1-b113f5121887', // Imagen de alguien frustrado/cansado
  category: 'Emociones',
  exercises: [
    {
      q: "¿Cómo se siente una persona que está 'hasta las narices'?",
      options: [
        "Muy feliz",
        "Muy harta o cansada",
        "Tiene mucha hambre"
      ],
      a: "Muy harta o cansada"
    },
    {
      q: "No quiero oír más excusas, estoy hasta las ________ de tus mentiras.",
      options: [
        "orejas",
        "manos",
        "narices"
      ],
      a: "narices"
    },
    {
      q: "¿En qué situación es más probable decir esta frase?",
      options: [
        "Cuando estás como pez en el agua",
        "Cuando el vecino pone la música alta todas las noches",
        "Cuando un amigo te echa un cable"
      ],
      a: "Cuando el vecino pone la música alta todas las noches"
    },
    {
      q: "Si alguien está 'hasta las narices', ¿cuál es el siguiente estado si el problema sigue?",
      options: [
        "Ser un trozo de pan",
        "Estar hecho un ají",
        "Consultar con la almohada"
      ],
      a: "Estar hecho un ají"
    }
  ]
},{
  id: '29',
  expression: 'Dejar plantado a alguien',
  meaning: 'No ir a una cita o encuentro planeado con otra persona, sin avisar.',
  example: 'Ayer estuve esperando a Luis en el café durante una hora, pero no vino; me dejó plantado.',
  imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff', // Imagen de una silla vacía en una mesa para dos
  category: 'Social',
  exercises: [
    {
      q: "¿Qué sucede si alguien te 'deja plantado'?",
      options: [
        "Te regala una planta",
        "Llega tarde pero avisa",
        "Tú vas a la cita, pero la otra persona no aparece"
      ],
      a: "Tú vas a la cita, pero la otra persona no aparece"
    },
    {
      q: "Fui al cine a las ocho, pero mi novia no vino. Ella ______ dejó plantado.",
      options: [
        "le",
        "me",
        "se"
      ],
      a: "me"
    },
    {
      q: "¿Cuál es la reacción más normal de alguien a quien han 'dejado plantado'?",
      options: [
        "Estar como pez en el agua",
        "Estar hasta las narices o hecho un ají",
        "Estar en las nubes"
      ],
      a: "Estar hasta las narices o hecho un ají"
    },
    {
      q: "¿Cómo dirías coloquialmente: 'Juan no vino a nuestra cita y no me avisó'?",
      options: [
        "Juan me echó un cable",
        "Juan me dejó plantado",
        "Juan dio en el clavo"
      ],
      a: "Juan me dejó plantado"
    }
  ]
},{
  id: '30',
  expression: 'Estar de mala uva',
  meaning: 'Estar de mal humor, enfadado o irritable en un momento específico.',
  example: 'No le pidas nada ahora a tu padre, que está de mala uva porque su equipo ha perdido.',
  imageUrl: 'https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d', // Imagen de alguien con gesto irritado
  category: 'Emociones',
  exercises: [
    {
      q: "¿Qué significa que alguien 'está de mala uva'?",
      options: [
        "Ha comprado fruta en mal estado",
        "Está de mal humor",
        "Tiene muchas ganas de trabajar"
      ],
      a: "Está de mal humor"
    },
    {
      q: "Hoy mejor no hables con el jefe, parece que está de mala ______.",
      options: [
        "manzana",
        "pera",
        "uva"
      ],
      a: "uva"
    },
    {
      q: "¿Cuál es la diferencia entre 'Tener mala leche' y 'Estar de mala uva'?",
      options: [
        "Son exactamente iguales",
        "Mala leche es personalidad; mala uva es un estado temporal",
        "Estar de mala uva solo se usa con el hambre"
      ],
      a: "Mala leche es personalidad; mala uva es un estado temporal"
    },
    {
      q: "Si te han 'dejado plantado' y has perdido las llaves, lo más normal es que...",
      options: [
        "Estés como pez en el agua",
        "Seas un trozo de pan",
        "Estés de mala uva"
      ],
      a: "Estés de mala uva"
    }
  ]
},{
  id: '31',
  expression: 'No tener ni pies ni cabeza',
  meaning: 'Algo que no tiene sentido, es absurdo o no tiene lógica.',
  example: 'Esa película que vimos ayer era malísima; la historia no tenía ni pies ni cabeza.',
  imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd48a57a1', // Imagen abstracta o confusa
  category: 'Psicología',
  exercises: [
    {
      q: "¿Qué significa que una explicación 'no tiene ni pies ni cabeza'?",
      options: [
        "Que es corta y directa",
        "Que no tiene lógica y es difícil de entender",
        "Que la persona es muy baja"
      ],
      a: "Que no tiene lógica y es difícil de entender"
    },
    {
      q: "Lo que dices es absurdo, tu argumento no tiene ni ________ ni ________.",
      options: [
        "manos / pies",
        "ojos / orejas",
        "pies / cabeza"
      ],
      a: "pies / cabeza"
    },
    {
      q: "¿En qué situación usarías esta expresión?",
      options: [
        "Cuando alguien da en el clavo",
        "Cuando el final de un libro no tiene relación con el principio",
        "Cuando estás como pez en el agua"
      ],
      a: "Cuando el final de un libro no tiene relación con el principio"
    }
  ]
},{
  id: '32',
  expression: 'Pedir peras al olmo',
  meaning: 'Esperar algo imposible de una persona o cosa que no tiene esa capacidad.',
  example: 'No pretendas que tu hermano pequeño guarde un secreto; eso es pedir peras al olmo.',
  imageUrl: 'https://images.unsplash.com/photo-1511210041123-018247072559', // Imagen de un árbol frondoso o frutas mezcladas
  category: 'Psicología',
  exercises: [
    {
      q: "Si un amigo te dice que 'estás pidiendo peras al olmo', ¿qué intenta decirte?",
      options: [
        "Que eres una persona ambiciosa",
        "Que lo que esperas es imposible",
        "Que deberías comer más fruta",
        "Que tienes que ser más paciente"
      ],
      a: "Que lo que esperas es imposible"
    },
    {
      q: "— Quiero que mi perro hable español este fin de semana. — Pero hombre, ¡eso es pedirle ______ al olmo!",
      options: [
        "manzanas",
        "ayuda",
        "peras",
        "tiempo"
      ],
      a: "peras"
    },
    {
      q: "¿En cuál de estas situaciones se aplica mejor la expresión?",
      options: [
        "Pedir un aumento tras trabajar duro",
        "Pedir que llueva en una ciudad lluviosa",
        "Pedir que alguien sin conocimientos técnicos arregle un ordenador",
        "Pedir mesa en un restaurante vacío"
      ],
      a: "Pedir que alguien sin conocimientos técnicos arregle un ordenador"
    },
    {
      q: "¿Por qué la expresión usa 'peras' y 'olmo'?",
      options: [
        "Porque las peras del olmo son amargas",
        "Porque el olmo no da frutos; es imposible obtener peras de él",
        "Porque los olmos son sagrados",
        "Porque las peras eran más baratas"
      ],
      a: "Porque el olmo no da frutos; es imposible obtener peras de él"
    }
  ]
},{
  id: '33',
  expression: 'Ser la media naranja',
  meaning: 'Ser la pareja ideal o la persona que complementa perfectamente a otra.',
  example: 'Llevan diez años casados y son muy felices; él dice que ella es su media naranja.',
  imageUrl: 'https://images.unsplash.com/photo-1551008475-4533d141425b', // Imagen de dos mitades de naranja que encajan
  category: 'Social',
  exercises: [
    {
      q: "Si alguien dice que ha encontrado a su 'media naranja', ¿qué significa?",
      options: [
        "Ha ido al supermercado",
        "Ha encontrado a su persona ideal",
        "Solo tiene la mitad de lo que necesita"
      ],
      a: "Ha encontrado a su persona ideal"
    },
    {
      q: "Desde que conoció a Luis, ella dice que por fin ha encontrado a su media ________.",
      options: [
        "manzana",
        "naranja",
        "pera"
      ],
      a: "naranja"
    },
    {
      q: "¿En qué situación usarías esta expresión de forma más adecuada?",
      options: [
        "En una entrevista de trabajo",
        "En una boda, durante el brindis",
        "Cuando te dejan plantado"
      ],
      a: "En una boda, durante el brindis"
    },
    {
      q: "¿Por qué se usa una 'naranja' en esta expresión?",
      options: [
        "Es la fruta favorita en España",
        "Solo su otra mitad encaja perfectamente para formar el círculo",
        "El color naranja simboliza la amistad"
      ],
      a: "Solo su otra mitad encaja perfectamente para formar el círculo"
    }
  ]
},{
  id: '34',
  expression: 'Hablar por los codos',
  meaning: 'Hablar muchísimo, de forma constante y sin parar.',
  example: 'Me gusta tomar café con Elena, pero es agotador porque habla por los codos y no me deja decir nada.',
  imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', // Imagen de personas conversando animadamente
  category: 'Social',
  exercises: [
    {
      q: "¿Qué hace una persona que 'habla por los codos'?",
      options: [
        "Habla muy bajito",
        "Habla demasiado y sin parar",
        "No le gusta hablar con desconocidos",
        "Le duelen los brazos"
      ],
      a: "Habla demasiado y sin parar"
    },
    {
      q: "¡Madre mía! Tu hermano no calla nunca, habla por los ________.",
      options: [
        "pies",
        "ojos",
        "codos",
        "dedos"
      ],
      a: "codos"
    },
    {
      q: "¿En qué situación es más probable usar esta frase?",
      options: [
        "Cuando alguien te deja plantado",
        "Cuando tu amigo no para de hablar durante una película",
        "En un examen de silencio"
      ],
      a: "Cuando tu amigo no para de hablar durante una película"
    },
    {
      q: "Si una persona 'habla por los codos', lo opuesto sería alguien que...",
      options: [
        "No tiene ni pies ni cabeza",
        "Es muy callado o de pocas palabras",
        "Es su media naranja"
      ],
      a: "Es muy callado o de pocas palabras"
    }
  ]
},{
  id: '35',
  expression: 'Estar en el quinto pino',
  meaning: 'Estar en un lugar muy lejano o de difícil acceso.',
  example: 'No quiero ir a esa fiesta, su casa está en el quinto pino y tardo dos horas en llegar.',
  imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9', // Imagen de un pino solitario a lo lejos
  category: 'Lugar/Tiempo',
  exercises: [
    {
      q: "Si un lugar está 'en el quinto pino', ¿qué significa?",
      options: [
        "Hay cinco árboles en la puerta",
        "Es un lugar natural",
        "Está muy lejos de donde estás"
      ],
      a: "Está muy lejos de donde estás"
    },
    {
      q: "Tengo que coger tres autobuses para ir a verte porque vives en el ________ pino.",
      options: [
        "tercer",
        "quinto",
        "primer"
      ],
      a: "quinto"
    },
    {
      q: "¿Cuál de estas situaciones describe mejor la expresión?",
      options: [
        "Tu oficina está a dos minutos andando",
        "El súper está en otro pueblo y no tienes coche",
        "Estás en una cita romántica"
      ],
      a: "El súper está en otro pueblo y no tienes coche"
    },
    {
      q: "Si alguien te invita a un bar 'en el quinto pino' y estás de mala uva, ¿qué dirías?",
      options: [
        "¡Qué bien! Me encanta caminar",
        "Ni hablar, no voy a ir tan lejos ahora mismo",
        "Eso es pedirle peras al olmo"
      ],
      a: "Ni hablar, no voy a ir tan lejos ahora mismo"
    }
  ]
},{
  id: '36',
  expression: 'A otra cosa, mariposa',
  meaning: 'Dar por terminado un tema o tarea para pasar inmediatamente a lo siguiente.',
  example: 'Ya hemos hablado mucho del tráfico. A otra cosa, mariposa: ¿qué película vamos a ver?',
  imageUrl: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd', // Imagen de una mariposa volando hacia otra flor
  category: 'Social/Comunicación',
  exercises: [
    {
      q: "¿Cuál es el objetivo principal de usar esta expresión?",
      options: [
        "Describir la naturaleza",
        "Cambiar el tema de conversación",
        "Pedir perdón"
      ],
      a: "Cambiar el tema de conversación"
    },
    {
      q: "Ya hemos terminado de discutir por el dinero. ¡A otra ________, mariposa!",
      options: [
        "casa",
        "persona",
        "cosa"
      ],
      a: "cosa"
    },
    {
      q: "Quieres que tu equipo deje de hablar de un problema pasado y se concentre en el futuro. ¿Qué dices?",
      options: [
        "Esto no tiene ni pies ni cabeza",
        "Bueno, a otra cosa mariposa. Veamos los planes nuevos",
        "Estoy hasta las narices"
      ],
      a: "Bueno, a otra cosa mariposa. Veamos los planes nuevos"
    },
    {
      q: "Cuando alguien dice 'a otra cosa, mariposa', suele ser porque:",
      options: [
        "El tema actual ya está agotado o no es productivo",
        "Quiere empezar una pelea",
        "No ha entendido nada"
      ],
      a: "El tema actual ya está agotado o no es productivo"
    }
  ]
},{
  id: '37',
  expression: 'Ser de carne y hueso',
  meaning: 'Ser una persona real, con sentimientos, defectos y debilidades.',
  example: 'A veces olvidamos que los presidentes también sufren; al final, todos somos de carne y hueso.',
  imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18', // Imagen de personas abrazándose o mostrando emoción
  category: 'Psicología',
  exercises: [
    {
      q: "¿Qué significa que una persona es 'de carne y hueso'?",
      options: [
        "Le gusta mucho la carne",
        "Es un ser humano con sentimientos y errores",
        "Es muy fuerte y nunca se cansa"
      ],
      a: "Es un ser humano con sentimientos y errores"
    },
    {
      q: "No esperes que sea perfecto siempre; recuerda que soy de carne y ________.",
      options: [
        "pelo",
        "mano",
        "hueso"
      ],
      a: "hueso"
    },
    {
      q: "¿En qué situación es más adecuado usar esta expresión?",
      options: [
        "Al ver a un robot trabajando",
        "Cuando un deportista famoso llora al perder",
        "En la carnicería comprando comida"
      ],
      a: "Cuando un deportista famoso llora al perder"
    },
    {
      q: "Si un empleado dice 'Perdone, soy de carne y hueso', ¿qué quiere decir?",
      options: [
        "Que errar es humano y puede equivocarse",
        "Que necesita comer más",
        "Que se ha roto un hueso"
      ],
      a: "Que errar es humano y puede equivocarse"
    }
  ]
},{
  id: '38',
  expression: 'Tirar la toalla',
  meaning: 'Rendirse ante una situación difícil o dejar de intentar algo.',
  example: 'He intentado aprender piano meses, pero es muy difícil; estoy a punto de tirar la toalla.',
  imageUrl: 'https://images.unsplash.com/photo-1584735174914-6b1272458e3e', // Imagen de una toalla en el suelo o un ring
  category: 'Psicología/Deportes',
  exercises: [
    {
      q: "¿Qué hace una persona que 'tira la toalla'?",
      options: [
        "Se va a la piscina",
        "Empieza un proyecto nuevo",
        "Deja de intentar algo porque se rinde"
      ],
      a: "Deja de intentar algo porque se rinde"
    },
    {
      q: "Sé que el examen es difícil, pero no puedes ________ la toalla ahora.",
      options: [
        "comprar",
        "tirar",
        "limpiar"
      ],
      a: "tirar"
    },
    {
      q: "¿En cuál de estos casos sería más lógico usar la expresión?",
      options: [
        "Ganar una medalla de oro",
        "Abandonar la carrera en el último año",
        "Comprar toallas nuevas"
      ],
      a: "Abandonar la carrera en el último año"
    },
    {
      q: "¿Qué significa en el boxeo que el entrenador tire la toalla?",
      options: [
        "Admite que su boxeador no puede seguir",
        "Que ya es muy tarde",
        "Que el boxeador necesita secarse el sudor"
      ],
      a: "Admite que su boxeador no puede seguir"
    }
  ]
},{
  id: '39',
  expression: 'Más vale tarde que nunca',
  meaning: 'Es preferible que algo bueno suceda con retraso a que no suceda en absoluto.',
  example: 'Perdona por no llamarte ayer por tu cumpleaños, ¡pero felicidades! Más vale tarde que nunca.',
  imageUrl: 'https://images.unsplash.com/photo-1508962850731-15b044d22635', // Imagen de un reloj antiguo o alguien llegando feliz
  category: 'Filosofía/Tiempo',
  exercises: [
    {
      q: "¿Cuándo usamos esta expresión?",
      options: [
        "Cuando alguien llega puntual",
        "Cuando algo positivo ocurre con retraso",
        "Cuando decidimos no hacer algo"
      ],
      a: "Cuando algo positivo ocurre con retraso"
    },
    {
      q: "Sé que te debía este dinero desde el año pasado, aquí tienes. Más vale tarde que ________.",
      options: [
        "siempre",
        "ayer",
        "nunca"
      ],
      a: "nunca"
    },
    {
      q: "¿En qué situación es más adecuado usar esta frase?",
      options: [
        "Un tren que llega con adelanto",
        "Una persona que aprende a conducir a los 70 años",
        "Alguien que olvida una tarea y no la hace"
      ],
      a: "Una persona que aprende a conducir a los 70 años"
    },
    {
      q: "Si alguien envía un regalo tarde y dice esta frase, ¿qué intenta?",
      options: [
        "Justificar el retraso dando importancia al detalle",
        "Presumir de su dinero",
        "Quejarse del servicio de correos"
      ],
      a: "Justificar el retraso dando importancia al detalle"
    }
  ]
},{
  id: '40',
  expression: 'Estar al pie del cañón',
  meaning: 'Mantenerse firme en un trabajo o situación difícil sin rendirse.',
  example: 'Aunque la empresa pasa por un mal momento, los empleados siguen ahí, al pie del cañón.',
  imageUrl: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37', // Imagen de un faro en una tormenta o alguien trabajando con esfuerzo
  category: 'Trabajo/Actitud',
  exercises: [
    {
      q: "¿Qué hace una persona que está 'al pie del cañón'?",
      options: [
        "Le gusta la historia militar",
        "Busca excusas para no trabajar",
        "Cumple su deber y se mantiene firme ante problemas"
      ],
      a: "Cumple su deber y se mantiene firme ante problemas"
    },
    {
      q: "Mi madre siempre ha estado al ________ del cañón para ayudar a la familia.",
      options: [
        "lado",
        "pie",
        "final"
      ],
      a: "pie"
    },
    {
      q: "¿En qué escenario usarías esta expresión?",
      options: [
        "Un estudiante que se va de vacaciones antes de un examen",
        "Un médico trabajando horas extra en una emergencia",
        "Alguien que llega tarde y no se disculpa"
      ],
      a: "Un médico trabajando horas extra en una emergencia"
    },
    {
      q: "Si alguien te dice: 'Gracias por estar al pie del cañón', ¿qué significa?",
      options: [
        "Agradece tu lealtad y esfuerzo constante",
        "Cree que eres una persona agresiva",
        "Quiere que te vayas a descansar"
      ],
      a: "Agradece tu lealtad y esfuerzo constante"
    }
  ]
},{
  id: '41',
  expression: 'Irse el santo al cielo',
  meaning: 'Olvidar de repente lo que se iba a decir o hacer, o distraerse mucho.',
  example: 'Entré en la cocina, pero me puse a mirar el móvil y se me fue el santo al cielo; ya no recuerdo a qué venía.',
  imageUrl: 'https://images.unsplash.com/photo-1508349132032-44161a4c8402', // Imagen de alguien mirando al horizonte distraído
  category: 'Psicología/Atención',
  exercises: [
    {
      q: "¿Qué sucede cuando a alguien 'se le va el santo al cielo'?",
      options: [
        "Ha tenido una idea brillante",
        "Se ha distraído u olvidado lo que hacía",
        "Tiene muchas ganas de dormir"
      ],
      a: "Se ha distraído u olvidado lo que hacía"
    },
    {
      q: "Perdona, me quedé mirando por la ventana y se me ha ido el ________ al cielo.",
      options: [
        "ángel",
        "santo",
        "pájaro"
      ],
      a: "santo"
    },
    {
      q: "¿En qué situación es más probable usar esta frase?",
      options: [
        "Llegar puntual a una reunión",
        "Cuando se te quema la comida por estar leyendo",
        "Explicar una dirección detalladamente"
      ],
      a: "Cuando se te quema la comida por estar leyendo"
    },
    {
      q: "Si dices: 'Espera, se me ha ido el santo al cielo' mientras hablas, ¿qué quieres decir?",
      options: [
        "Has perdido el hilo y no recuerdas qué ibas a decir",
        "Tienes que irte a la iglesia",
        "Estás muy enfadado con tu amigo"
      ],
      a: "Has perdido el hilo y no recuerdas qué ibas a decir"
    }
  ]
},{
  id: '42',
  expression: 'Hacer la vista gorda',
  meaning: 'Fingir que no se ha visto algo (un error o falta) para evitar problemas o favorecer a alguien.',
  example: 'El profesor vio que el alumno usaba el móvil, pero hizo la vista gorda porque era el último día.',
  imageUrl: 'https://images.unsplash.com/photo-1590595906931-81f04f0ccebb', // Imagen de alguien tapándose un ojo o mirando a otro lado
  category: 'Social/Ética',
  exercises: [
    {
      q: "¿Qué hace una persona que 'hace la vista gorda'?",
      options: [
        "Va al oculista",
        "Decide ignorar una mala acción a propósito",
        "Limpia sus gafas"
      ],
      a: "Decide ignorar una mala acción a propósito"
    },
    {
      q: "A veces los padres hacen la ________ gorda cuando sus hijos se acuestan tarde.",
      options: [
        "cara",
        "mano",
        "vista"
      ],
      a: "vista"
    },
    {
      q: "¿En qué situación es más común usar esta frase?",
      options: [
        "Un árbitro muy estricto",
        "Un guardia que deja pasar a un amigo sin entrada",
        "Alguien mirándose al espejo"
      ],
      a: "Un guardia que deja pasar a un amigo sin entrada"
    },
    {
      q: "Si el jefe 'hace la vista gorda' con los retrasos de Juan, ¿qué significa?",
      options: [
        "El jefe lo sabe pero decide no castigarlo",
        "El jefe no se ha enterado",
        "El jefe ha despedido a Juan"
      ],
      a: "El jefe lo sabe pero decide no castigarlo"
    }
  ]
},{
  id: '43',
  expression: 'Pasar de algo / de alguien',
  meaning: 'No tener interés en una cosa o ignorar a una persona a propósito.',
  example: 'Mis amigos quieren ir a la discoteca, pero yo paso de salir hoy; prefiero quedarme en casa.',
  imageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70', // Imagen de alguien con auriculares ignorando el entorno
  category: 'Social/Interés',
  exercises: [
    {
      q: "Si alguien dice 'paso de este tema', ¿qué quiere decir?",
      options: [
        "Le parece fascinante",
        "No le interesa y no quiere hablar de ello",
        "Ha estudiado mucho el tema"
      ],
      a: "No le interesa y no quiere hablar de ello"
    },
    {
      q: "No le hagas caso a lo que dicen, tú ________ de sus comentarios.",
      options: [
        "por",
        "a",
        "pasa"
      ],
      a: "pasa"
    },
    {
      q: "¿En qué situación es más común usar esta frase?",
      options: [
        "En una carta formal al banco",
        "Cuando un amigo te invita a algo aburrido",
        "Pidiendo comida en un restaurante elegante"
      ],
      a: "Cuando un amigo te invita a algo aburrido"
    },
    {
      q: "Si una persona dice 'Juan pasa de mí', ¿cómo se siente?",
      options: [
        "Se siente ignorada por Juan",
        "Cree que Juan está enamorado",
        "Piensa que Juan es muy puntual"
      ],
      a: "Se siente ignorada por Juan"
    }
  ]
},{
  id: '44',
  expression: 'Estar de mala leche',
  meaning: 'Estar de muy mal humor, irritable o tener malas intenciones.',
  example: 'No le preguntes nada ahora a tu hermano, que está de mala leche porque ha perdido su equipo.',
  imageUrl: 'https://images.unsplash.com/photo-1594499468121-f45e83e30df4', // Imagen de alguien con gesto muy enfadado o un rayo
  category: 'Emociones',
  exercises: [
    {
      q: "¿Cómo se siente alguien que 'está de mala leche'?",
      options: [
        "Feliz y con ganas de bromear",
        "Irritable, enfadado o molesto",
        "Con mucha hambre"
      ],
      a: "Irritable, enfadado o molesto"
    },
    {
      q: "Hoy mi jefe está de mala ________, mejor hablamos con él mañana.",
      options: [
        "uva",
        "leche",
        "fruta"
      ],
      a: "leche"
    },
    {
      q: "¿En qué situación es más probable usar esta frase?",
      options: [
        "Al recibir una noticia excelente",
        "Cuando alguien te contesta de forma borde por un mal día",
        "Relajado en la playa"
      ],
      a: "Cuando alguien te contesta de forma borde por un mal día"
    },
    {
      q: "Si una broma 'está hecha con mala leche', ¿qué significa?",
      options: [
        "Tiene la intención de herir o molestar",
        "Es muy graciosa",
        "Trata sobre productos lácteos"
      ],
      a: "Tiene la intención de herir o molestar"
    }
  ]
},{
  id: '45',
  expression: 'A quien madruga, Dios le ayuda',
  meaning: 'Las personas que se esfuerzan y empiezan sus tareas pronto tienen más probabilidades de éxito.',
  example: 'Mañana me levantaré a las seis para estudiar antes del examen; ya sabes que a quien madruga, Dios le ayuda.',
  imageUrl: 'https://images.unsplash.com/photo-1470252649358-96962407e946', // Imagen de un amanecer o alguien despertando con energía
  category: 'Sabiduría Popular',
  exercises: [
    {
      q: "¿Cuál es el mensaje principal de este refrán?",
      options: [
        "Es necesario ir a la iglesia muy temprano",
        "Ser trabajador y empezar pronto trae beneficios",
        "Dormir mucho es bueno para la salud"
      ],
      a: "Ser trabajador y empezar pronto trae beneficios"
    },
    {
      q: "No dejes el trabajo para la tarde. Recuerda que a quien ________, Dios le ayuda.",
      options: [
        "corre",
        "duerme",
        "madruga"
      ],
      a: "madruga"
    },
    {
      q: "¿En qué situación sería más adecuado usar este refrán?",
      options: [
        "Cuando alguien llega tarde a una cita",
        "Cuando un emprendedor abre su negocio muy temprano",
        "Cuando decides cancelar planes por sueño"
      ],
      a: "Cuando un emprendedor abre su negocio muy temprano"
    },
    {
      q: "En este refrán, el verbo 'madrugar' también implica...",
      options: [
        "Actuar con rapidez y anticipación ante un deber",
        "Despertarse cansado tras una fiesta",
        "Soñar con cosas positivas"
      ],
      a: "Actuar con rapidez y anticipación ante un deber"
    }
  ]
},{
  id: '46',
  expression: 'Ser un cero a la izquierda',
  meaning: 'Sentirse o ser alguien que no tiene ninguna influencia o cuya opinión no es valorada.',
  example: 'En las reuniones de vecinos siento que soy un cero a la izquierda, nadie escucha mis propuestas.',
  imageUrl: 'https://images.unsplash.com/photo-1590595601323-999330999017', // Imagen minimalista con un cero o alguien apartado
  category: 'Social/Sentimientos',
  exercises: [
    {
      q: "Si alguien dice que es 'un cero a la izquierda', ¿cómo se siente?",
      options: [
        "La persona más importante del grupo",
        "Que su presencia u opinión no tienen valor",
        "Que es muy bueno en matemáticas"
      ],
      a: "Que su presencia u opinión no tienen valor"
    },
    {
      q: "Desde que llegó el nuevo jefe, me ignoran; parece que soy un ________ a la izquierda.",
      options: [
        "cero",
        "uno",
        "diez"
      ],
      a: "cero"
    },
    {
      q: "¿En qué situación es más común usar esta frase?",
      options: [
        "Cuando ganas un premio",
        "Cuando tus amigos organizan un viaje y no te preguntan",
        "Cuando eres el director de una empresa"
      ],
      a: "Cuando tus amigos organizan un viaje y no te preguntan"
    },
    {
      q: "¿Por qué se dice 'a la izquierda'?",
      options: [
        "Porque el lado izquierdo es siempre negativo",
        "Porque un cero a la izquierda no cambia el valor de un número entero",
        "Porque la mayoría de las personas son diestras"
      ],
      a: "Porque un cero a la izquierda no cambia el valor de un número entero"
    }
  ]
},{
  id: '47',
  expression: 'Irse de copas',
  meaning: 'Salir por la noche con amigos para tomar bebidas y socializar en bares o pubs.',
  example: 'Hoy es viernes y por fin he terminado el proyecto; ¿nos vamos de copas para celebrar?',
  imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', // Imagen de cócteles o ambiente de pub nocturno
  category: 'Social/Ocio',
  exercises: [
    {
      q: "¿Qué significa que un grupo de amigos se va 'de copas'?",
      options: [
        "Van a comprar vajilla nueva",
        "Salen a divertirse y tomar algo en bares",
        "Participan en un torneo deportivo"
      ],
      a: "Salen a divertirse y tomar algo en bares"
    },
    {
      q: "Después de la cena, nos fuimos de ________ por el centro de la ciudad.",
      options: [
        "vasos",
        "copas",
        "platos"
      ],
      a: "copas"
    },
    {
      q: "¿En qué contexto es más probable escuchar esta expresión?",
      options: [
        "En una reunión formal a las 8 AM",
        "Hablando con compañeros al final de la semana",
        "En una biblioteca pública"
      ],
      a: "Hablando con compañeros al final de la semana"
    },
    {
      q: "A diferencia de 'ir de cañas', 'irse de copas' suele implicar:",
      options: [
        "Horario más nocturno y ambiente de fiesta",
        "Que solo se beben zumos",
        "Ropa obligatoria de deporte"
      ],
      a: "Horario más nocturno y ambiente de fiesta"
    }
  ]
},{
  id: '48',
  expression: 'Dormir a pierna suelta',
  meaning: 'Dormir muy profundamente, con total tranquilidad y sin interrupciones.',
  example: 'Como ayer terminé todos mis exámenes, anoche pude dormir a pierna suelta por fin.',
  imageUrl: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487', // Imagen de alguien durmiendo plácidamente
  category: 'Salud/Bienestar',
  exercises: [
    {
      q: "¿Cómo duerme una persona que lo hace 'a pierna suelta'?",
      options: [
        "Con mucha ropa y calor",
        "Profundamente y de forma muy relajada",
        "Solo un par de horas y se despierta cansado"
      ],
      a: "Profundamente y de forma muy relajada"
    },
    {
      q: "Después de caminar 20 kilómetros por el monte, llegué a casa y dormí a ________ suelta.",
      options: [
        "mano",
        "pierna",
        "cabeza"
      ],
      a: "pierna"
    },
    {
      q: "¿En qué situación es más lógico usar esta frase?",
      options: [
        "Cuando tienes mucha cafeína y no puedes cerrar los ojos",
        "Cuando estás de vacaciones en un sitio silencioso y descansas maravillosamente",
        "Cuando estás preocupado y das vueltas en la cama"
      ],
      a: "Cuando estás de vacaciones en un sitio silencioso y descansas maravillosamente"
    },
    {
      q: "Si alguien te dice 'anoche dormí a pierna suelta', te transmite que:",
      options: [
        "Su calidad de sueño fue excelente y se siente renovado",
        "Tuvo pesadillas durante toda la noche",
        "Se cayó de la cama mientras dormía"
      ],
      a: "Su calidad de sueño fue excelente y se siente renovado"
    }
  ]
}
];
