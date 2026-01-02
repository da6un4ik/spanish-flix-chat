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
        q: "Completa: «¿Me estás diciendo que el examen es hoy? ¡No me ________ el pelo!»",
        options: ["tomes", "comes", "metas"],
        a: "tomes"
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
    meaning: 'Se utiliza para decir que alguien está loco o hace cosas muy extrañas y excéntricas.',
    example: 'Mi abuelo se bañó en el río en pleno invierno, ¡está como una cabra!',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881',
    videoUrl: '/videos/cabra.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Qué significa que una persona 'está como una cabra'?",
        options: ["Que tiene mucha hambre", "Que está loca o hace cosas raras", "Que es muy lenta"],
        a: "Que está loca o hace cosas raras"
      },
      {
        q: "Elige el verbo adecuado: «¿Has visto lo que hizo Marta? Realmente ________ como una cabra».",
        options: ["es", "está", "tiene"],
        a: "está"
      },
      {
        q: "¿En qué situación usarías esta expresión?",
        options: ["Alguien que estudia mucho", "Alguien que salta en paracaídas vestido de dinosaurio", "Alguien que llega temprano"],
        a: "Alguien que salta en paracaídas vestido de dinosaurio"
      },
      {
        q: "¿Cuál es el significado más cercano a 'Estar como una cabra'?",
        options: ["Estar cansado", "Estar loco", "Estar enfadado"],
        a: "Estar loco"
      }
    ]
  },
  {
    id: '7',
    expression: 'Llover a cántaros',
    meaning: 'Se utiliza cuando la lluvia es muy intensa, fuerte y abundante.',
    example: 'No podemos ir al parque ahora, está lloviendo a cántaros y nos vamos a mojar.',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0',
    videoUrl: '/videos/llover_cantaros.mp4',
    category: 'Naturaleza',
    exercises: [
      {
        q: "¿Qué clima hace si 'llueve a cántaros'?",
        options: ["Hace mucho sol", "Hay una lluvia muy fina", "Hay una lluvia muy fuerte"],
        a: "Hay una lluvia muy fuerte"
      },
      {
        q: "Completa la expresión: «¡Busca un paraguas! Está lloviendo a ________».",
        options: ["cubos", "cántaros", "nubes"],
        a: "cántaros"
      },
      {
        q: "¿Qué accesorio necesitas imperativamente si está 'lloviendo a cántaros'?",
        options: ["Unas gafas de sol", "Un paraguas grande", "Una crema solar"],
        a: "Un paraguas grande"
      }
    ]
  },
  {
    id: '8',
    expression: 'Ponerse las pilas',
    meaning: 'Significa empezar a esforzarse, prestar más atención o actuar con energía y rapidez.',
    example: 'Si quieres aprobar el examen, tienes que ponerte las pilas y empezar a estudiar ya.',
    imageUrl: 'https://images.unsplash.com/photo-1619641634305-677a5bc690ab',
    videoUrl: '/videos/ponerse_pilas.mp4',
    category: 'Motivación',
    exercises: [
      {
        q: "¿Qué significa realmente la expresión 'Ponerse las pilas'?",
        options: ["Comprar baterías nuevas", "Trabajar o estudiar con energía", "Irse a dormir temprano"],
        a: "Trabajar o estudiar con energía"
      },
      {
        q: "Un entrenador le dice a su equipo: «¡Vamos, chicos! ¡________ las pilas si queremos ganar!».",
        options: ["Ponéis", "Poneos", "Ponía"],
        a: "Poneos"
      },
      {
        q: "¿En qué momento es más apropiado usar esta expresión?",
        options: ["Cuando alguien está de vacaciones", "Cuando alguien está distraído y tiene tareas", "Cuando alguien ya terminó su trabajo"],
        a: "Cuando alguien está distraído y tiene tareas"
      }
    ]
  },
  {
    id: '9',
    expression: 'Quedarse de piedra',
    meaning: 'Sentir una impresión tan fuerte (sorpresa o asombro) que la persona no puede reaccionar ni moverse.',
    example: 'Cuando me dijo que se mudaba a Australia mañana mismo, me quedé de piedra.',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642',
    videoUrl: '/videos/quedarse_piedra.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente una persona que 'se queda de piedra'?",
        options: ["Se siente muy cansada", "Está extremadamente sorprendida", "Está muy enfadada"],
        a: "Está extremadamente sorprendida"
      },
      {
        q: "Completa la frase: «Cuando vi el precio de la casa, me ________ de piedra».",
        options: ["quedamos", "quedé", "quedas"],
        a: "quedé"
      },
      {
        q: "¿En qué situación es más probable que alguien 'se quede de piedra'?",
        options: ["Al descubrir que ganó la lotería", "Al beber un vaso de agua", "Al ver una película repetida"],
        a: "Al descubrir que ganó la lotería"
      }
    ]
  },
  {
    id: '10',
    expression: 'Echar leña al fuego',
    meaning: 'Hacer o decir algo que empeora una situación conflictiva o una discusión.',
    example: 'Ellos ya están discutiendo; por favor, no digas nada más, no queremos echar leña al fuego.',
    imageUrl: 'https://images.unsplash.com/photo-1545147986-a9d6f210df77',
    videoUrl: '/videos/lena_fuego.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Cuál es el resultado de 'echar leña al fuego' en una conversación?",
        options: ["La discusión se termina rápido", "El conflicto se vuelve más grave", "Las personas se piden perdón"],
        a: "El conflicto se vuelve más grave"
      },
      {
        q: "Completa la frase: «Sé que estás enfadado, pero no quiero echar ________ al fuego ahora».",
        options: ["agua", "leña", "aire"],
        a: "leña"
      },
      {
        q: "¿Qué verbo describe mejor el sentido de 'echar leña al fuego'?",
        options: ["Solucionar", "Empeorar", "Olvidar"],
        a: "Empeorar"
      }
    ]
  },
  {
    id: '11',
    expression: 'Tener mala leche',
    meaning: 'Tener mal carácter, mala intención o, en algunos contextos, mala suerte.',
    example: 'Ten cuidado con el jefe hoy; ha venido con muy mala leche y se enfada por todo.',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    videoUrl: '/videos/mala_leche.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Qué significa que una persona 'tiene mala leche'?",
        options: ["Que le gusta mucho la leche", "Que tiene mal carácter o mala intención", "Que es una persona muy divertida"],
        a: "Que tiene mal carácter o mala intención"
      },
      {
        q: "Completa: «¡Qué ________ leche tengo! He perdido el autobús por solo diez segundos».",
        options: ["buena", "poca", "mala"],
        a: "mala"
      },
      {
        q: "¿Cuál es un sinónimo de 'Tener mala leche' (referido al carácter)?",
        options: ["Ser generoso", "Tener mal genio", "Estar en las nubes"],
        a: "Tener mal genio"
      }
    ]
  },
  {
    id: '12',
    expression: 'Consultar con la almohada',
    meaning: 'Tomar tiempo para pensar antes de tomar una decisión importante, generalmente esperando al día siguiente.',
    example: 'La oferta de trabajo es buena, pero antes de decir que sí necesito consultarlo con la almohada.',
    imageUrl: 'https://images.unsplash.com/photo-1520206115501-d70d3f023821',
    videoUrl: '/videos/almohada.mp4',
    category: 'Decisiones',
    exercises: [
      {
        q: "¿Qué hace una persona que 'consulta algo con la almohada'?",
        options: ["Compra una almohada nueva", "Espera al día siguiente para decidir", "Habla en voz alta mientras duerme"],
        a: "Espera al día siguiente para decidir"
      },
      {
        q: "Completa la frase: «Es una decisión difícil. Antes de aceptar, prefiero consultarlo con la ________».",
        options: ["noche", "almohada", "cama"],
        a: "almohada"
      },
      {
        q: "¿Cuál es la intención de alguien que 'consulta con la almohada'?",
        options: ["Reflexionar con calma", "Ponerse las pilas", "Meter la pata"],
        a: "Reflexionar con calma"
      }
    ]
  },
  {
    id: '13',
    expression: 'Ser un trozo de pan',
    meaning: 'Describe a una persona que es extremadamente buena, noble, generosa y de gran corazón.',
    example: 'Mi abuela siempre ayuda a todos los vecinos sin pedir nada a cambio; es un trozo de pan.',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73',
    videoUrl: '/videos/trozo_pan.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Cómo es una persona que es 'un trozo de pan'?",
        options: ["Alguien que siempre tiene hambre", "Una persona muy buena y bondadosa", "Alguien que cocina muy bien"],
        a: "Una persona muy buena y bondadosa"
      },
      {
        q: "Completa: «Mi hermano nunca se enfada y siempre ayuda. Él ________ un trozo de pan».",
        options: ["está", "es", "tiene"],
        a: "es"
      },
      {
        q: "¿Cuál de estas palabras describe mejor a un 'trozo de pan'?",
        options: ["Distraído", "Bondadoso", "Enojado"],
        a: "Bondadoso"
      }
    ]
  },
  {
    id: '14',
    expression: 'Matar dos pájaros de un tiro',
    meaning: 'Lograr dos objetivos o resolver dos asuntos diferentes al mismo tiempo con una sola acción.',
    example: 'Ya que voy al banco, compraré el pan al lado; así mato dos pájaros de un tiro.',
    imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890',
    videoUrl: '/videos/dos_pajaros.mp4',
    category: 'Eficiencia',
    exercises: [
      {
        q: "¿Qué significa realmente 'matar dos pájaros de un tiro'?",
        options: ["Que te gusta la caza", "Resolver dos problemas con una acción", "Cometer dos errores el mismo día"],
        a: "Resolver dos problemas con una acción"
      },
      {
        q: "Completa: «Si estudiamos juntos, aprendemos y nos divertimos; así matamos dos ________ de un ________».",
        options: ["perros / salto", "pájaros / tiro", "aviones / vuelo"],
        a: "pájaros / tiro"
      },
      {
        q: "¿Cuál de estas palabras describe mejor esta expresión?",
        options: ["Pereza", "Eficiencia", "Mala leche"],
        a: "Eficiencia"
      }
    ]
  },
  {
    id: '15',
    expression: 'Tirar la casa por la ventana',
    meaning: 'Derrochar recursos económicos en una ocasión especial, superando los límites normales del gasto.',
    example: 'Para la boda de su hija, decidieron tirar la casa por la ventana y alquilar un castillo.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    videoUrl: '/videos/casa_ventana.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: "Los García celebraron sus bodas de oro en el hotel más caro y con un jet privado. ¿Qué hicieron?",
        options: ["Están ahorrando dinero", "Han decidido tirar la casa por la ventana", "Consideran que la fiesta es pan comido"],
        a: "Han decidido tirar la casa por la ventana"
      },
      {
        q: "¿En cuál de estas situaciones NO sería apropiado usar esta expresión?",
        options: ["Una empresa gasta millones en su aniversario", "Unos padres compran regalos carísimos en Navidad", "Una persona paga su factura de luz mensual con retraso"],
        a: "Una persona paga su factura de luz mensual con retraso"
      },
      {
        q: "¿Qué frase significa lo mismo que: 'El ayuntamiento no reparó en gastos con los fuegos'?",
        options: ["Decidió tirar la casa por la ventana", "Decidió ponerse las pilas", "Decidió consultar con la almohada"],
        a: "Decidió tirar la casa por la ventana"
      }
    ]
  }
];
