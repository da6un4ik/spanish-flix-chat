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
    imageUrl: "/idioms/estar_nubes.jpg",
    videoUrl: '/videos/estar_en_las_nubes.mp4',
    category: 'Estado mental',
    exercises: [
      {
        q: 'Completa la frase: «Ana no escuchó la explicación del profesor porque estaba ________.»',
        options: ['en el sol', 'en las nubes', 'bajo la tierra'],
        a: 'en las nubes',
      },
      {
        q: 'Pedro mira por la ventana en la reunión y no sabe de qué hablan. ¿Qué le sucede?',
        options: ['Está muy concentrado', 'Está en las nubes', 'Está de mal humor'],
        a: 'Está en las nubes',
      },
      {
        q: "¿Cuál de estas frases significa lo mismo que 'Estar en las nubes'?",
        options: ['Estar muy feliz', 'Estar despistado y no enterarse', 'Viajar en un avión'],
        a: 'Estar despistado y no enterarse',
      },
    ],
  },
  {
    id: '2',
    expression: 'Ser pan comido',
    meaning: 'Describe una tarea o actividad que es extremadamente fácil de realizar.',
    example: 'No te preocupes por el examen de conducir; para ti va a ser pan comido.',
    imageUrl: "/idioms/pan_comido.jpg",
    videoUrl: '/videos/pan_comido.mp4',
    category: 'Dificultad',
    exercises: [
      {
        q: "¿Qué significa realmente cuando alguien dice que una tarea 'es pan comido'?",
        options: ['Que es muy aburrida', 'Que es muy fácil de hacer', 'Que es imposible'],
        a: 'Que es muy fácil de hacer',
      },
      {
        q: 'Completa la frase: «El rompecabezas de 10 piezas para el niño ________ pan comido».',
        options: ['está', 'fue', 'tiene'],
        a: 'fue',
      },
      {
        q: '¿En qué escenario usarías esta expresión?',
        options: ['Comprar una manzana', 'Arreglar un virus informático pequeño', 'Recibir un descuento'],
        a: 'Arreglar un virus informático pequeño',
      },
    ],
  },
  {
    id: '3',
    expression: 'Costar un ojo de la cara',
    meaning: 'Se utiliza para decir que algo es extremadamente caro.',
    example: 'Me encanta ese coche deportivo, pero debe costar un ojo de la cara.',
    imageUrl: "/idioms/ojo_cara.jpg",
    videoUrl: '/videos/ojo_cara.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: "Si un reloj 'cuesta un ojo de la cara', ¿qué podemos decir del reloj?",
        options: ['Que es muy antiguo', 'Que el precio es muy elevado', 'Que está roto'],
        a: 'Que el precio es muy elevado',
      },
      {
        q: 'Completa: «El viaje a Japón fue increíble, pero los billetes me ________ un ojo de la cara».',
        options: ['valieron', 'costaron', 'gastaron'],
        a: 'costaron',
      },
      {
        q: "¿Qué frase es lo OPUESTO a 'Costar un ojo de la cara'?",
        options: ['Ser muy difícil', 'Ser muy barato', 'Ser pan comido'],
        a: 'Ser muy barato',
      },
      {
        q: '¿En qué escenario usarías esta expresión?',
        options: ['Comprar una manzana', 'Ver el precio de una mansión', 'Recibir un descuento'],
        a: 'Ver el precio de una mansión',
      },
    ],
  },
  {
    id: '4',
    expression: 'Meter la pata',
    meaning: 'Cometer un error o decir algo inoportuno en una situación social.',
    example:
      '¡Uy, metí la pata! Le pregunté a Laura por su novio, pero se habían separado.',
    imageUrl: "/idioms/meter_pata.jpg",
    videoUrl: '/videos/meter_pata.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente la expresión 'Meter la pata'?",
        options: [
          'Poner el pie en un lugar peligroso',
          'Comprar algo caro',
          'Cometer un error',
        ],
        a: 'Cometer un error',
      },
      {
        q: 'Completa con la forma correcta: «¡Qué vergüenza! Yo siempre ________ la pata con mi jefe».',
        options: ['metes', 'metemos', 'meto'],
        a: 'meto',
      },
      {
        q: "¿En qué situación es más probable que alguien 'metiera la pata'?",
        options: ['Al sacar un 10', 'Al revelar un secreto por accidente', 'Al cocinar bien'],
        a: 'Al revelar un secreto por accidente',
      },
      {
        q: "¿Cuál de estas expresiones es similar a 'Meter la pata'?",
        options: ['Hacerlo muy bien', 'Cometer una equivocación', 'Estar en las nubes'],
        a: 'Cometer una equivocación',
      },
    ],
  },
  {
    id: '5',
    expression: 'Tomar el pelo',
    meaning:
      'Burlarse de alguien de manera amistosa o intentar engañarle con una broma.',
    example: '¿De verdad ganaste la lotería? ¡No me tomes el pelo!',
    imageUrl: "/idioms/tomar_pelo.jpg",
    videoUrl: '/videos/tomar_pelo.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente 'Tomar el pelo' a alguien?",
        options: ['Lavarle el cabello', 'Hacerle una broma o engañarle', 'Cortarle el pelo'],
        a: 'Hacerle una broma o engañarle',
      },
      {
        q: 'Completa: «¿Me estás diciendo que el examen es hoy? ¡No me ________ el pelo!»',
        options: ['tomes', 'comes', 'metas'],
        a: 'tomes',
      },
      {
        q: 'Si un amigo te dice algo increíble y no le crees, ¿qué le dices?',
        options: ['Estás en las nubes', '¡Me estás tomando el pelo!', 'Es pan comido'],
        a: '¡Me estás tomando el pelo!',
      },
    ],
  },
  {
    id: '6',
    expression: 'Estar como una cabra',
    meaning:
      'Se utiliza para decir que alguien está loco o hace cosas muy extrañas.',
    example:
      'Mi abuelo se bañó en el río en pleno invierno, ¡está como una cabra!',
    imageUrl: "/idioms/estar_cabra.jpg",
    videoUrl: '/videos/cabra.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Qué significa que una persona 'está como una cabra'?",
        options: [
          'Que tiene mucha hambre',
          'Que está loca o hace cosas raras',
          'Que es muy lenta',
        ],
        a: 'Que está loca o hace cosas raras',
      },
      {
        q: 'Elige el verbo adecuado: «¿Has visto lo que hizo Marta? Realmente ________ como una cabra».',
        options: ['es', 'está', 'tiene'],
        a: 'está',
      },
      {
        q: '¿En qué situación usarías esta expresión?',
        options: [
          'Alguien que estudia mucho',
          'Alguien que salta en paracaídas vestido de dinosaurio',
          'Alguien que llega temprano',
        ],
        a: 'Alguien que salta en paracaídas vestido de dinosaurio',
      },
      {
        q: "¿Cuál es el significado más cercano a 'Estar como una cabra'?",
        options: ['Estar cansado', 'Estar loco', 'Estar enfadado'],
        a: 'Estar loco',
      },
      {
        q: '— ¡Mi vecino empezó a cantar ópera a las tres de la mañana! \n— ¡Ese hombre ________!',
        options: ['está como una cabra', 'es pan comido', 'está en las nubes'],
        a: 'está como una cabra',
      },
    ],
  },
  {
    id: '7',
    expression: 'Llover a cántaros',
    meaning: 'Se utiliza cuando la lluvia es muy intensa y abundante.',
    example: 'No podemos ir al parque ahora, está lloviendo a cántaros.',
    imageUrl: "/idioms/llover.jpg",
    videoUrl: '/videos/llover.mp4',
    category: 'Naturaleza',
    exercises: [
      {
        q: "¿Qué clima hace si 'llueve a cántaros'?",
        options: ['Hace mucho sol', 'Hay una lluvia muy fina', 'Hay una lluvia muy fuerte'],
        a: 'Hay una lluvia muy fuerte',
      },
      {
        q: 'Completa la expresión: «¡Busca un paraguas! Está lloviendo a ________».',
        options: ['cubos', 'cántaros', 'nubes'],
        a: 'cántaros',
      },
      {
        q: "¿Qué accesorio necesitas imperativamente si está 'lloviendo a cántaros'?",
        options: ['Unas gafas de sol', 'Un paraguas grande', 'Una crema solar'],
        a: 'Un paraguas grande',
      },
      {
        q: '¿Cuál de estas frases describe mejor la intensidad de \'Llover a cántaros\'?',
        options: ['Llover muchísimo', 'No llover nada', 'Empezar a llover'],
        a: 'Llover muchísimo',
      },
    ],
  },
  {
    id: '8',
    expression: 'Ponerse las pilas',
    meaning: 'Empezar a esforzarse o actuar con energía y rapidez.',
    example: 'Si quieres aprobar, tienes que ponerte las pilas y estudiar ya.',
    imageUrl: "/idioms/pilas.jpg",
    videoUrl: '/videos/pilas.mp4',
    category: 'Motivación',
    exercises: [
      {
        q: "¿Qué significa realmente la expresión 'Ponerse las pilas'?",
        options: [
          'Comprar baterías nuevas',
          'Trabajar o estudiar con energía',
          'Irse a dormir temprano',
        ],
        a: 'Trabajar o estudiar con energía',
      },
      {
        q: 'Un entrenador le dice a su equipo: «¡Vamos, chicos! ¡________ las pilas si queremos ganar!».',
        options: ['Ponéis', 'Poneos', 'Ponía'],
        a: 'Poneos',
      },
      {
        q: '¿En qué momento es más apropiado usar esta expresión?',
        options: [
          'Cuando alguien está de vacaciones',
          'Cuando alguien está distraído y tiene tareas',
          'Cuando alguien ya terminó su trabajo',
        ],
        a: 'Cuando alguien está distraído y tiene tareas',
      },
      {
        q: "¿Cuál de estas frases es un sinónimo cercano de 'Ponerse las pilas'?",
        options: ['Estar en las nubes', 'Esforzarse y activarse', 'Tomar el pelo'],
        a: 'Esforzarse y activarse',
      },
    ],
  },
  {
    id: '9',
    expression: 'Quedarse de piedra',
    meaning: 'Sentir una sorpresa tan fuerte que no puedes reaccionar.',
    example:
      'Cuando me dijo que se mudaba mañana mismo, me quedé de piedra.',
    imageUrl: "/idioms/piedra.jpg",
    videoUrl: '/videos/piedra.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente una persona que 'se queda de piedra'?",
        options: [
          'Se siente muy cansada',
          'Está extremadamente sorprendida',
          'Está muy enfadada',
        ],
        a: 'Está extremadamente sorprendida',
      },
      {
        q: 'Completa la frase: «Cuando vi el precio de la casa, me ________ de piedra».',
        options: ['quedamos', 'quedé', 'quedas'],
        a: 'quedé',
      },
      {
        q: "¿En qué situación es más probable que alguien 'se quede de piedra'?",
        options: [
          'Al ver una película repetida',
          'Al descubrir que ganó la lotería',
          'Al beber un vaso de agua',
        ],
        a: 'Al descubrir que ganó la lotería',
      },
      {
        q: "¿Cuál de estas expresiones significa lo mismo que 'Quedarse de piedra'?",
        options: ['Ponerse las pilas', 'Quedarse muy asombrado', 'Ser pan comido'],
        a: 'Quedarse muy asombrado',
      },
    ],
  },
  {
    id: '10',
    expression: 'Echar leña al fuego',
    meaning: 'Hacer o decir algo que empeora una situación conflictiva.',
    example: 'Ellos ya están discutiendo; por favor, no eches leña al fuego.',
    imageUrl: "/idioms/fuego.jpg",
    videoUrl: '/videos/fuego.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Cuál es el resultado de 'echar leña al fuego' en una conversación?",
        options: [
          'La discusión se termina rápido',
          'El conflicto se vuelve más grave',
          'Las personas se piden perdón',
        ],
        a: 'El conflicto se vuelve más grave',
      },
      {
        q: 'Completa la frase: «Sé que estás enfadado, pero no quiero echar ________ al fuego ahora».',
        options: ['agua', 'leña', 'aire'],
        a: 'leña',
      },
      {
        q: '¿En cuál de estas situaciones se usa CORRECTAMENTE la expresión?',
        options: [
          'Mi amigo me ayudó mucho',
          'Mi hermana insulta a mi hermano que ya está gritando',
          'Hace frío y voy a calentar la casa',
        ],
        a: 'Mi hermana insulta a mi hermano que ya está gritando',
      },
      {
        q: "¿Qué verbo describe mejor el sentido de 'echar leña al fuego'?",
        options: ['Solucionar', 'Empeorar', 'Olvidar'],
        a: 'Empeorar',
      },
    ],
  },
  {
    id: '11',
    expression: 'Tener mala leche',
    meaning: 'Tener mal carácter, mala intención o mala suerte.',
    example: 'Ten cuidado con el jefe hoy; ha venido con muy mala leche.',
    imageUrl: "/idioms/tener_leche.jpg",
    videoUrl: '/videos/tener_mala_leche.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Qué significa que una persona 'tiene mala leche'?",
        options: [
          'Que le gusta mucho la leche',
          'Que tiene mal carácter o mala intención',
          'Que es una persona muy divertida',
        ],
        a: 'Que tiene mal carácter o mala intención',
      },
      {
        q: 'Completa: «¡Qué ________ leche tengo! He perdido el autobús por solo diez segundos».',
        options: ['buena', 'poca', 'mala'],
        a: 'mala',
      },
      {
        q: '¿A quién describirías con esta expresión?',
        options: [
          'A un camarero que te regala un café',
          'A alguien que responde de forma antipática',
          'A un niño que está durmiendo',
        ],
        a: 'A alguien que responde de forma antipática',
      },
      {
        q: "¿Cuál es un sinónimo de 'Tener mala leche' (referido al carácter)?",
        options: ['Ser generoso', 'Tener mal genio', 'Estar en las nubes'],
        a: 'Tener mal genio',
      },
    ],
  },
  {
    id: '12',
    expression: 'Consultar con la almohada',
    meaning: 'Tomar tiempo para pensar antes de tomar una decisión importante.',
    example: 'Es una buena oferta, pero necesito consultarlo con la almohada.',
    imageUrl: "/idioms/almohada.jpg",
    videoUrl: '/videos/almohada.mp4',
    category: 'Decisiones',
    exercises: [
      {
        q: "¿Qué hace una persona que 'consulta algo con la almohada'?",
        options: [
          'Compra una almohada nueva',
          'Espera al día siguiente para decidir',
          'Habla en voz alta mientras duerme',
        ],
        a: 'Espera al día siguiente para decidir',
      },
      {
        q: 'Completa la frase: «Es una decisión difícil. Antes de aceptar, prefiero consultarlo con la ________».',
        options: ['noche', 'almohada', 'cama'],
        a: 'almohada',
      },
      {
        q: '¿En qué momento usarías esta expresión?',
        options: [
          'Para elegir un sabor de helado',
          'Ante una oferta de trabajo importante',
          'Cuando tienes mucha prisa',
        ],
        a: 'Ante una oferta de trabajo importante',
      },
      {
        q: "¿Cuál es la intención de alguien que 'consulta con la almohada'?",
        options: ['Reflexionar con calma', 'Ponerse las pilas', 'Meter la pata'],
        a: 'Reflexionar con calma',
      },
    ],
  },
  {
    id: '13',
    expression: 'Ser un trozo de pan',
    meaning: 'Describe a una persona que es extremadamente buena y generosa.',
    example: 'Mi abuela ayuda a todos los vecinos; es un trozo de pan.',
    imageUrl: "/idioms/trozo.jpg",
    videoUrl: '/videos/trozo.mp4',
    category: 'Personalidad',
    exercises: [
      {
        q: "¿Cómo es una persona que es 'un trozo de pan'?",
        options: [
          'Alguien que siempre tiene hambre',
          'Una persona muy buena y bondadosa',
          'Alguien que cocina muy bien',
        ],
        a: 'Una persona muy buena y bondadosa',
      },
      {
        q: 'Completa: «Mi hermano nunca se enfada y siempre ayuda. Él ________ un trozo de pan».',
        options: ['está', 'es', 'tiene'],
        a: 'es',
      },
      {
        q: "¿A cuál de estas personas describirías como 'un trozo de pan'?",
        options: [
          'A un vendedor que intenta engañarte',
          'A un amigo que te cuida cuando estás enfermo',
          'A alguien que está como una cabra',
        ],
        a: 'A un amigo que te cuida cuando estás enfermo',
      },
      {
        q: "¿Cuál de estas palabras describe mejor a un 'trozo de pan'?",
        options: ['Distraído', 'Bondadoso', 'Enojado'],
        a: 'Bondadoso',
      },
    ],
  },
  {
    id: '14',
    expression: 'Matar dos pájaros de un tiro',
    meaning: 'Lograr dos objetivos con una sola acción.',
    example:
      'Ya que voy al banco, compraré el pan; así mato dos pájaros de un tiro.',
    imageUrl: "/idioms/pajaros.jpg",
    videoUrl: '/videos/pajaros.mp4',
    category: 'Eficiencia',
    exercises: [
      {
        q: "¿Qué significa realmente 'matar dos pájaros de un tiro'?",
        options: [
          'Que te gusta la caza',
          'Resolver dos problemas con una acción',
          'Cometer dos errores el mismo día',
        ],
        a: 'Resolver dos problemas con una acción',
      },
      {
        q: 'Completa: «Si estudiamos juntos, aprendemos y nos divertimos; así matamos dos ________ de un ________».',
        options: ['perros / salto', 'pájaros / tiro', 'aviones / vuelo'],
        a: 'pájaros / tiro',
      },
      {
        q: "¿En qué situación estás 'matando dos pájaros de un tiro'?",
        options: [
          'Cuando olvidas las llaves en casa',
          'Caminar al trabajo para hacer ejercicio y llegar a tiempo',
          'Quedarse de piedra por una noticia',
        ],
        a: 'Caminar al trabajo para hacer ejercicio y llegar a tiempo',
      },
      {
        q: '¿Cuál de estas palabras describe mejor esta expresión?',
        options: ['Pereza', 'Eficiencia', 'Mala leche'],
        a: 'Eficiencia',
      },
    ],
  },
  {
    id: '15',
    expression: 'Tirar la casa por la ventana',
    meaning: 'Derrochar mucho dinero en una ocasión especial.',
    example:
      'Para la boda de su hija, decidieron tirar la casa por la ventana.',
    imageUrl: "/idioms/tirar_casa.jpg",
    videoUrl: '/videos/ventana.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: 'Los García celebraron sus bodas de oro en el hotel más caro y con un jet privado. ¿Qué hicieron?',
        options: [
          'Están ahorrando dinero',
          'Han decidido tirar la casa por la ventana',
          'Consideran que la fiesta es pan comido',
        ],
        a: 'Han decidido tirar la casa por la ventana',
      },
      {
        q: '¿Cuál de estas oraciones utiliza la expresión de forma natural?',
        options: [
          'Tiramos la ventana por la casa',
          'No todos los días se cumplen 18 años, vamos a tirar la casa por la ventana',
          'Juan tiró la casa por la ventana porque no tenía dinero',
        ],
        a: 'No todos los días se cumplen 18 años, vamos a tirar la casa por la ventana',
      },
      {
        q: '¿En cuál de estas situaciones NO sería apropiado usar esta expresión?',
        options: [
          'Una empresa gasta millones en su aniversario',
          'Unos padres compran regalos carísimos en Navidad',
          'Una persona paga su factura de luz mensual con retraso',
        ],
        a: 'Una persona paga su factura de luz mensual con retraso',
      },
      {
        q: "¿Qué frase significa lo mismo que: 'El ayuntamiento no reparó en gastos con los fuegos'?",
        options: [
          'Decidió tirar la casa por la ventana',
          'Decidió ponerse las pilas',
          'Decidió consultar con la almohada',
        ],
        a: 'Decidió tirar la casa por la ventana',
      },
    ],
  },
  {
    id: '16',
    expression: 'Estar sin blanca',
    meaning: 'No tener nada de dinero en un momento determinado.',
    example: 'Me encantaría ir al cine, pero me he quedado sin blanca.',
    imageUrl: "/idioms/blanca.jpg",
    videoUrl: '/videos/blanca.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: "¿Cuál de estas situaciones describe a alguien que 'está sin blanca'?",
        options: [
          'Sergio va a comprar una casa al contado',
          'Lola pidió prestado para el bus tras pagar el alquiler',
          'Felipe acaba de ganar la lotería',
        ],
        a: 'Lola pidió prestado para el bus tras pagar el alquiler',
      },
      {
        q: 'Si seguimos gastando así en vacaciones, para el miércoles ________ sin blanca.',
        options: ['habremos estado', 'nos quedaremos', 'somos'],
        a: 'nos quedaremos',
      },
      {
        q: "Si alguien decide 'tirar la casa por la ventana', ¿qué le pasará después?",
        options: ['Se quedará de piedra', 'Se quedará sin blanca', 'Estará como una cabra'],
        a: 'Se quedará sin blanca',
      },
      {
        q: "Transforma a lenguaje coloquial: 'Carezco totalmente de fondos líquidos'.",
        options: ['Estoy en las nubes', 'Estoy sin blanca', 'Tengo mala leche'],
        a: 'Estoy sin blanca',
      },
    ],
  },
  {
    id: '17',
    expression: 'Echar un cable',
    meaning:
      'Ayudar a alguien en una situación difícil o con mucho trabajo.',
    example: 'Si quieres voy esta tarde para echarte un cable con las cajas.',
    imageUrl: "/idioms/cable.jpg",
    videoUrl: '/videos/cable.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué significa realmente 'echar un cable'?",
        options: [
          'Comprar cables para la televisión',
          'Ayudar a una persona',
          'Estar muy enfadado',
        ],
        a: 'Ayudar a una persona',
      },
      {
        q: 'Tengo muchos problemas con la tarea de matemáticas, ¿puedes ______ un cable?',
        options: ['darme', 'hacerme', 'echarme'],
        a: 'echarme',
      },
      {
        q: "¿Cómo dirías 'Mi hermano me ayudó con el proyecto' usando el modismo?",
        options: [
          'Mi hermano me echó un cable con el proyecto',
          'Mi hermano tiró la casa por la ventana',
          'Mi hermano se puso las pilas',
        ],
        a: 'Mi hermano me echó un cable con el proyecto',
      },
      {
        q: 'Selecciona la situación donde es LÓGICO usar esta expresión:',
        options: [
          'Cuando alguien está durmiendo profundamente',
          'Cuando ves a un amigo cargando bolsas pesadas',
          'Cuando estás solo viendo la tele',
        ],
        a: 'Cuando ves a un amigo cargando bolsas pesadas',
      },
    ],
  },
  {
    id: '18',
    expression: 'Ir al grano',
    meaning: 'Hablar de lo más importante directamente, sin rodeos.',
    example: 'No tenemos tiempo, así que, por favor, ve al grano.',
    imageUrl: "/idioms/grano.jpg",
    videoUrl: '/videos/grano.mp4',
    category: 'Comunicación',
    exercises: [
      {
        q: "¿Qué significa cuando alguien te pide 'ir al grano'?",
        options: [
          'Ir a comprar cereales',
          'Hablar directamente de lo más importante',
          'Contar una historia larga',
        ],
        a: 'Hablar directamente de lo más importante',
      },
      {
        q: 'Deja de dar rodeos y ________ al grano, ¿cuánto cuesta el coche?',
        options: ['vas', 'va', 've'],
        a: 've',
      },
      {
        q: "¿En qué situación es más apropiado decir 'Vamos al grano'?",
        options: [
          'En una primera cita romántica',
          'En una reunión de trabajo que dura demasiado sin resultados',
          'Contando un cuento infantil',
        ],
        a: 'En una reunión de trabajo que dura demasiado sin resultados',
      },
      {
        q: "¿Cuál de estas expresiones es lo OPUESTO a 'Ir al grano'?",
        options: ['Andarse por las ramas', 'Ponerse las pilas', 'Echar un cable'],
        a: 'Andarse por las ramas',
      },
    ],
  },
  {
    id: '19',
    expression: 'Dar en el clavo',
    meaning: 'Acertar plenamente o encontrar la solución exacta a un problema.',
    example: 'Cuando dijiste que el problema era el cable, diste en el clavo.',
    imageUrl: "/idioms/clavo.jpg",
    videoUrl: '/videos/clavo.mp4',
    category: 'Éxito',
    exercises: [
      {
        q: "¿Qué significa 'dar en el clavo'?",
        options: [
          'Golpearse con un martillo',
          'Acertar o encontrar la solución exacta',
          'Olvidar una cita importante',
        ],
        a: 'Acertar o encontrar la solución exacta',
      },
      {
        q: '¡Exacto! Esa es la respuesta correcta. ________ en el clavo.',
        options: ['Damos', 'Has dado', 'Dabas'],
        a: 'Has dado',
      },
      {
        q: '¿En cuál de estas situaciones se usa correctamente la expresión?',
        options: [
          'Alguien que se pierde buscando una dirección',
          'Un detective que descubre al culpable con una sola pista',
          'Una persona que está en las nubes',
        ],
        a: 'Un detective que descubre al culpable con una sola pista',
      },
      {
        q: "¿Cuál de estas frases es un sinónimo de 'dar en el clavo'?",
        options: ['Meter la pata', 'Ir al grano', 'Dar en el blanco'],
        a: 'Dar en el blanco',
      },
    ],
  },
  {
    id: '20',
    expression: 'Estar hecho un ají',
    meaning: 'Estar muy enojado, furioso o irritado.',
    example: 'Cuando vio el coche rayado, se puso hecho un ají.',
    imageUrl: "/idioms/aji.jpg",
    videoUrl: '/videos/aji.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente una persona que 'está hecha un ají'?",
        options: [
          'Tiene mucho frío',
          'Está muy enfadada o furiosa',
          'Tiene mucha hambre',
        ],
        a: 'Está muy enfadada o furiosa',
      },
      {
        q: 'Elige la forma correcta para una mujer: «Marta está ________ un ají porque cancelaron su vuelo».',
        options: ['hecho', 'hecha', 'haciendo'],
        a: 'hecha',
      },
      {
        q: "¿Cuál de estas expresiones significa lo mismo que 'Estar hecho un ají'?",
        options: [
          'Estar en las nubes',
          'Estar hecho una furia',
          'Estar como una cabra',
        ],
        a: 'Estar hecho una furia',
      },
      {
        q: "Si alguien está 'hecho un ají', ¿qué es lo mejor que puedes hacer?",
        options: [
          'Echar leña al fuego',
          'Dejar que se calme un poco',
          'Tomarle el pelo',
        ],
        a: 'Dejar que se calme un poco',
      },
    ],
  },
  {
    id: '21',
    expression: 'Hablar a la pared',
    meaning: 'Intentar hablar con alguien que no te presta atención.',
    example:
      'Le digo que ordene su cuarto, pero es como hablar a la pared.',
    imageUrl: "/idioms/pared.jpg",
    videoUrl: '/videos/pared.mp4',
    category: 'Comunicación',
    exercises: [
      {
        q: "¿Qué significa que una situación es 'como hablar a la pared'?",
        options: [
          'Que la pared es muy delgada',
          'Que la otra persona te ignora y no te escucha',
          'Que te gusta hablar solo',
        ],
        a: 'Que la otra persona te ignora y no te escucha',
      },
      {
        q: '«¡Qué frustrante! Intento explicarte el problema, pero parece que le ________ a la pared».',
        options: ['digo', 'hablo', 'miro'],
        a: 'hablo',
      },
      {
        q: '¿En qué contexto usarías esta expresión con más frecuencia?',
        options: [
          'Con un amigo que siempre te ayuda',
          'Con un adolescente que no sigue ninguna instrucción',
          'Con un médico que da en el clavo',
        ],
        a: 'Con un adolescente que no sigue ninguna instrucción',
      },
      {
        q: "¿Cómo se siente una persona cuando siente que está 'hablando a la pared'?",
        options: ['Satisfecha y alegre', 'Frustrada e ignorada', 'Como un trozo de pan'],
        a: 'Frustrada e ignorada',
      },
    ],
  },
  {
    id: '22',
    expression: 'Dar gato por liebre',
    meaning:
      'Engañar a alguien dándole algo de menor calidad de lo acordado.',
    example: 'El teléfono no funciona; me han dado gato por liebre.',
    imageUrl: "/idioms/liebre.jpg",
    videoUrl: '/videos/liebre.mp4',
    category: 'Dinero',
    exercises: [
      {
        q: "¿Qué sucede cuando te 'dan gato por liebre'?",
        options: [
          'Te regalan una mascota nueva',
          'Te engañan con la calidad de algo que compraste',
          'Recibes un descuento inesperado',
        ],
        a: 'Te engañan con la calidad de algo que compraste',
      },
      {
        q: 'Ten cuidado al comprar en ese mercado, a veces intentan dar ______ por ______.',
        options: ['perro / gato', 'gato / liebre', 'vaca / pollo'],
        a: 'gato / liebre',
      },
      {
        q: '¿En cuál de estas situaciones se aplica mejor esta expresión?',
        options: [
          'Un restaurante te sirve comida deliciosa y barata',
          'Pagas por un hotel de lujo y es una pensión sucia',
          'Un amigo te echa un cable',
        ],
        a: 'Pagas por un hotel de lujo y es una pensión sucia',
      },
      {
        q: "Si alguien intenta 'darte gato por liebre', esa persona está intentando...",
        options: ['Dar en el clavo', 'Tomarte el pelo', 'Ser un trozo de pan'],
        a: 'Tomarte el pelo',
      },
    ],
  },
  {
    id: '23',
    expression: 'Poner los puntos sobre las íes',
    meaning: 'Aclarar las cosas con detalle para que no haya dudas.',
    example: 'Vamos a poner los puntos sobre las íes para saber qué hacer.',
    imageUrl: "/idioms/ies.jpg",
    videoUrl: '/videos/ies.mp4',
    category: 'Comunicación',
    exercises: [
      {
        q: "¿Qué significa 'poner los puntos sobre las íes'?",
        options: [
          'Andarse por las ramas',
          'Ir al grano и ser preciso',
          'Estar en las nubes',
        ],
        a: 'Ir al grano и ser preciso',
      },
    ],
  },
  {
    id: '24',
    expression: 'Estar como pez en el agua',
    meaning: 'Sentirse muy cómodo y seguro en un lugar o actividad.',
    example: 'En la piscina, María está como pez en el agua.',
    imageUrl: "/idioms/pez.jpg",
    videoUrl: '/videos/pez.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente una persona que está 'como pez en el agua'?",
        options: [
          'Tiene mucho frío',
          'Se siente muy cómoda y feliz',
          'No sabe qué hacer',
        ],
        a: 'Se siente muy cómoda y feliz',
      },
      {
        q: 'A mi hermano le gusta mucho hablar en público; él está como ______ en el agua.',
        options: ['Gato', 'Pez', 'Perro'],
        a: 'Pez',
      },
      {
        q: "¿Quién está 'como pez en el agua'?",
        options: [
          'Un futbolista en un estadio de fútbol',
          'Una persona con miedo a volar en un avión',
          'Alguien sin blanca en una tienda cara',
        ],
        a: 'Un futbolista en un estadio de fútbol',
      },
      {
        q: "Si una persona está muy nerviosa en una fiesta, ¿está 'como pez en el agua'?",
        options: ['Verdadero', 'Falso'],
        a: 'Falso',
      },
    ],
  },
  {
    id: '25',
    expression: 'Buscarle tres pies al gato',
    meaning: 'Complicar algo sencillo o buscar problemas donde no los hay.',
    example: 'No intentes buscarle tres pies al gato; es muy simple.',
    imageUrl: "/idioms/pies.jpg",
    videoUrl: '/videos/pies.mp4',
    category: 'Psicología',
    exercises: [
      {
        q: "¿Qué hace una persona que le 'busca tres pies al gato'?",
        options: [
          'Ayuda a los animales',
          'Complica las cosas sin necesidad',
          'Va al grano muy rápido',
        ],
        a: 'Complica las cosas sin necesidad',
      },
      {
        q: 'No seas tan complicado, no le busques ______ pies al gato.',
        options: ['cuatro', 'tres', 'cinco'],
        a: 'tres',
      },
      {
        q: '¿En qué situación usarías esta expresión?',
        options: [
          'Cuando alguien te da gato por liebre',
          "Cuando un amigo cree que un 'Hola' tiene un significado secreto y malvado",
          'Cuando necesitas echar un cable',
        ],
        a: "Cuando un amigo cree que un 'Hola' tiene un significado secreto y malvado",
      },
      {
        q: "¿Cuál es la intención de alguien que le 'busca tres pies al gato'?",
        options: [
          'Ver problemas donde todo es simple',
          'Poner los puntos sobre las íes',
          'Matar dos pájaros de un tiro',
        ],
        a: 'Ver problemas donde todo es simple',
      },
    ],
  },
  {
    id: '26',
    expression: 'No hay mal que dure cien años',
    meaning:
      'Las situaciones malas no son infinitas; siempre terminan tarde o temprano.',
    example:
      'Sé que estás triste por tu trabajo, pero ten paciencia, no hay mal que dure cien años.',
    imageUrl: "/idioms/cien.jpg",
    videoUrl: '/videos/cien.mp4',
    category: 'Psicología',
    exercises: [
      {
        q: '¿Cuándo usamos esta expresión?',
        options: [
          'Para celebrar un éxito',
          'Para consolar a alguien con un problema',
          'Para ir al grano rápido',
        ],
        a: 'Para consolar a alguien con un problema',
      },
      {
        q: 'Completa el refrán: «No hay ______ que dure cien años».',
        options: ['bien', 'mal', 'tiempo'],
        a: 'mal',
      },
      {
        q: '¿Cuál es el mensaje principal de este refrán?',
        options: [
          'La vida es muy corta',
          'Los problemas siempre terminan',
          'La salud dura un siglo',
        ],
        a: 'Los problemas siempre terminan',
      },
      {
        q: 'Si un amigo tiene una semana terrible, ¿qué le dirías para tranquilizarlo?',
        options: [
          'No le busques tres pies al gato',
          'Ánimo, no hay mal que dure cien años',
          'Estás como pez en el agua',
        ],
        a: 'Ánimo, no hay mal que dure cien años',
      },
    ],
  },
  {
    id: '27',
    expression: 'Ser del año de la pera',
    meaning:
      'Algo que es muy antiguo, viejo o que está pasado de moda.',
    example:
      'Mira ese ordenador, no tiene ni internet; debe de ser del año de la pera.',
    imageUrl: "/idioms/pera.jpg",
    videoUrl: '/videos/pera.mp4',
    category: 'Tiempo',
    exercises: [
      {
        q: "¿A qué se refiere alguien cuando dice que algo es 'del año de la pera'?",
        options: [
          'A una fruta muy rica',
          'A algo muy viejo o antiguo',
          'A algo muy moderno',
        ],
        a: 'A algo muy viejo o antiguo',
      },
      {
        q: 'Esa chaqueta es del año de la ________, ya no se lleva nada.',
        options: ['manzana', 'pera', 'uva'],
        a: 'pera',
      },
      {
        q: '¿En qué situación usarías esta expresión?',
        options: [
          'Al ver una película que se estrenó ayer',
          'Al encontrar el coche de tu abuelo que tiene 50 años',
          'Al hablar de un amigo bondadoso',
        ],
        a: 'Al encontrar el coche de tu abuelo que tiene 50 años',
      },
      {
        q: "¿Cuál sería el opuesto de algo que es 'del año de la pera'?",
        options: [
          'Algo que cuesta un ojo de la cara',
          'Algo de última generación',
          'Algo que es pan comido',
        ],
        a: 'Algo de última generación',
      },
    ],
  },
  {
    id: '28',
    expression: 'Estar hasta las narices',
    meaning:
      'Estar muy cansado de algo o de alguien; no tener más paciencia.',
    example:
      'Llevo tres horas esperando y el tren no llega; estoy hasta las narices.',
    imageUrl: "/idioms/narices.jpg",
    videoUrl: '/videos/narices.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente una persona que está 'hasta las narices'?",
        options: ['Muy feliz', 'Muy harta o cansada', 'Tiene mucha hambre'],
        a: 'Muy harta o cansada',
      },
      {
        q: 'No quiero oír más excusas, estoy hasta las ________ de tus mentiras.',
        options: ['orejas', 'manos', 'narices'],
        a: 'narices',
      },
      {
        q: '¿En qué situación es más probable decir esta frase?',
        options: [
          'Cuando estás como pez en el agua',
          'Cuando el vecino pone la música alta todas las noches',
          'Cuando un amigo te echa un cable',
        ],
        a: 'Cuando el vecino pone la música alta todas las noches',
      },
      {
        q: "Si alguien está 'hasta las narices', ¿cuál es el siguiente estado si el problema sigue?",
        options: ['Ser un trozo de pan', 'Estar hecho un ají', 'Consultar con la almohada'],
        a: 'Estar hecho un ají',
      },
    ],
  },
  {
    id: '29',
    expression: 'Dejar plantado a alguien',
    meaning:
      'No ir a una cita o encuentro planeado con otra persona, sin avisar.',
    example:
      'Ayer estuve esperando a Luis en el café durante una hora, pero no vino; me dejó plantado.',
    imageUrl: "/idioms/plantado.jpg",
    videoUrl: '/videos/plantado.mp4',
    category: 'Social',
    exercises: [
      {
        q: "¿Qué sucede si alguien te 'deja plantado'?",
        options: [
          'Te regala una planta',
          'Llega tarde pero avisa',
          'Tú vas a la cita, pero la otra persona no aparece',
        ],
        a: 'Tú vas a la cita, pero la otra persona no aparece',
      },
      {
        q: 'Fui al cine a las ocho, pero mi novia no vino. Ella ______ dejó plantado.',
        options: ['le', 'me', 'se'],
        a: 'me',
      },
      {
        q: "¿Cuál es la reacción más normal de alguien a quien han 'dejado plantado'?",
        options: [
          'Estar como pez en el agua',
          'Estar hasta las narices o hecho un ají',
          'Estar en las nubes',
        ],
        a: 'Estar hasta las narices o hecho un ají',
      },
      {
        q: "¿Cómo dirías coloquialmente: 'Juan no vino a nuestra cita y no me avisó'?",
        options: [
          'Juan me echó un cable',
          'Juan me dejó plantado',
          'Juan dio en el clavo',
        ],
        a: 'Juan me dejó plantado',
      },
    ],
  },
  {
    id: '30',
    expression: 'Estar de mala uva',
    meaning:
      'Estar de mal humor, enfadado o irritable en un momento específico.',
    example:
      'No le pidas nada ahora a tu padre, que está de mala uva porque su equipo ha perdido.',
    imageUrl: "/idioms/uva.jpg",
    videoUrl: '/videos/uva.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Qué significa que alguien 'está de mala uva'?",
        options: [
          'Ha comprado fruta en mal estado',
          'Está de mal humor',
          'Tiene muchas ganas de trabajar',
        ],
        a: 'Está de mal humor',
      },
      {
        q: 'Hoy mejor no hables con el jefe, parece que está de mala ______.',
        options: ['manzana', 'pera', 'uva'],
        a: 'uva',
      },
      {
        q: "¿Cuál es la diferencia entre 'Tener mala leche' y 'Estar de mala uva'?",
        options: [
          'Son exactamente iguales',
          'Mala leche es personalidad; mala uva es un estado temporal',
          'Estar de mala uva solo se usa con el hambre',
        ],
        a: 'Mala leche es personalidad; mala uva es un estado temporal',
      },
      {
        q: "Si te han 'dejado plantado' y has perdido las llaves, lo más normal es que...",
        options: [
          'Estés como pez en el agua',
          'Seas un trozo de pan',
          'Estés de mala uva',
        ],
        a: 'Estés de mala uva',
      },
    ],
  },
  {
    id: '31',
    expression: 'No tener ni pies ni cabeza',
    meaning: 'Algo que no tiene sentido, es absurdo o no tiene lógica.',
    example:
      'Esa película que vimos ayer era malísima; la historia no tenía ni pies ni cabeza.',
    imageUrl: "/idioms/ni.jpg",
    videoUrl: '/videos/ni.mp4',
    category: 'Psicología',
    exercises: [
      {
        q: "¿Qué significa que una explicación 'no tiene ni pies ni cabeza'?",
        options: [
          'Que es corta y directa',
          'Que no tiene lógica y es difícil de entender',
          'Que la persona es muy baja',
        ],
        a: 'Que no tiene lógica y es difícil de entender',
      },
      {
        q: 'Lo que dices es absurdo, tu argumento no tiene ni ________ ni ________.',
        options: ['manos / pies', 'ojos / orejas', 'pies / cabeza'],
        a: 'pies / cabeza',
      },
      {
        q: '¿En qué situación usarías esta expresión?',
        options: [
          'Cuando alguien da en el clavo',
          'Cuando el final de un libro no tiene relación con el principio',
          'Cuando estás como pez en el agua',
        ],
        a: 'Cuando el final de un libro no tiene relación con el principio',
      },
    ],
  },
  {
    id: '32',
    expression: 'Pedir peras al olmo',
    meaning:
      'Esperar algo imposible de una persona o cosa que no tiene esa capacidad.',
    example:
      'No pretendas que tu hermano pequeño guarde un secreto; eso es pedir peras al olmo.',
    imageUrl: "/idioms/peras.jpg",
    videoUrl: '/videos/peras.mp4',
    category: 'Psicología',
    exercises: [
      {
        q: "Si un amigo te dice que 'estás pidiendo peras al olmo', ¿qué intenta decirte?",
        options: [
          'Que eres una persona ambiciosa',
          'Que lo que esperas es imposible',
          'Que deberías comer más fruta',
          'Que tienes que ser más paciente',
        ],
        a: 'Que lo que esperas es imposible',
      },
      {
        q: '— Quiero que mi perro hable español este fin de semana. — Pero hombre, ¡eso es pedirle ______ al olmo!',
        options: ['manzanas', 'ayuda', 'peras', 'tiempo'],
        a: 'peras',
      },
      {
        q: '¿En cuál de estas situaciones se aplica mejor la expresión?',
        options: [
          'Pedir un aumento tras trabajar duro',
          'Pedir que llueva en una ciudad lluviosa',
          'Pedir que alguien sin conocimientos técnicos arregle un ordenador',
          'Pedir mesa en un restaurante vacío',
        ],
        a: 'Pedir que alguien sin conocimientos técnicos arregle un ordenador',
      },
      {
        q: "¿Por qué la expresión usa 'peras' y 'olmo'?",
        options: [
          'Porque las peras del olmo son amargas',
          'Porque el olmo no da frutos; es imposible obtener peras de él',
          'Porque los olmos son sagrados',
          'Porque las peras eran más baratas',
        ],
        a: 'Porque el olmo no da frutos; es imposible obtener peras de él',
      },
    ],
  },
  {
    id: '33',
    expression: 'Ser la media naranja',
    meaning:
      'Ser la pareja ideal o la persona que complementa perfectamente a otra.',
    example:
      'Llevan diez años casados y son muy felices; él dice que ella es su media naranja.',
    imageUrl: "/idioms/naranja.jpg",
    videoUrl: '/videos/naranja.mp4',
    category: 'Social',
    exercises: [
      {
        q: "Si alguien dice que ha encontrado a su 'media naranja', ¿qué significa?",
        options: [
          'Ha ido al supermercado',
          'Ha encontrado a su persona ideal',
          'Solo tiene la mitad de lo que necesita',
        ],
        a: 'Ha encontrado a su persona ideal',
      },
      {
        q: 'Desde que conoció a Luis, ella dice que por fin ha encontrado a su media ________.',
        options: ['manzana', 'naranja', 'pera'],
        a: 'naranja',
      },
      {
        q: '¿En qué situación usarías esta expresión de forma más adecuada?',
        options: [
          'En una entrevista de trabajo',
          'En una boda, durante el brindis',
          'Cuando te dejan plantado',
        ],
        a: 'En una boda, durante el brindis',
      },
      {
        q: "¿Por qué se usa una 'naranja' en esta expresión?",
        options: [
          'Es la fruta favorita en España',
          'Solo su otra mitad encaja perfectamente para formar el círculo',
          'El color naranja simboliza la amistad',
        ],
        a: 'Solo su otra mitad encaja perfectamente para formar el círculo',
      },
    ],
  },
  {
    id: '34',
    expression: 'Hablar por los codos',
    meaning: 'Hablar muchísimo y sin parar.',
    example:
      'Mi tía no me dejó decir nada en toda la tarde; ¡habla por los codos!',
    imageUrl: "/idioms/codos.jpg",
    videoUrl: '/videos/codos.mp4',
    category: 'Comunicación',
    exercises: [
      {
        q: "¿Qué hace alguien que 'habla por los codos'?",
        options: ['Habla muy poco', 'Habla de forma muy ruidosa', 'Habla demasiado'],
        a: 'Habla demasiado',
      },
      {
        q: "Si una persona 'habla por los codos', lo opuesto sería alguien que...",
        options: [
          'No tiene ni pies ni cabeza',
          'Es muy callado o de pocas palabras',
          'Es su media naranja',
        ],
        a: 'Es muy callado o de pocas palabras',
      },
    ],
  },
  {
    id: '35',
    expression: 'Estar en el quinto pino',
    meaning: 'Estar en un lugar muy lejano o de difícil acceso.',
    example:
      'No quiero ir a esa fiesta, su casa está en el quinto pino y tardo dos horas en llegar.',
    imageUrl: "/idioms/pino.jpg",
    videoUrl: '/videos/pino.mp4',
    category: 'Lugar/Tiempo',
    exercises: [
      {
        q: "Si un lugar está 'en el quinto pino', ¿qué significa?",
        options: [
          'Hay cinco árboles en la puerta',
          'Es un lugar natural',
          'Está muy lejos de donde estás',
        ],
        a: 'Está muy lejos de donde estás',
      },
      {
        q: 'Tengo que coger tres autobuses para ir a verte porque vives en el ________ pino.',
        options: ['tercer', 'quinto', 'primer'],
        a: 'quinto',
      },
      {
        q: '¿Cuál de estas situaciones describe mejor la expresión?',
        options: [
          'Tu oficina está a dos minutos andando',
          'El súper está en otro pueblo y no tienes coche',
          'Estás en una cita romántica',
        ],
        a: 'El súper está en otro pueblo y no tienes coche',
      },
      {
        q: "Si alguien te invita a un bar 'en el quinto pino' y estás de mala uva, ¿qué dirías?",
        options: [
          '¡Qué bien! Me encanta caminar',
          'Ni hablar, no voy a ir tan lejos ahora mismo',
          'Eso es pedirle peras al olmo',
        ],
        a: 'Ni hablar, no voy a ir tan lejos ahora mismo',
      },
    ],
  },
  {
    id: '36',
    expression: 'A otra cosa, mariposa',
    meaning:
      'Dar por terminado un tema o tarea para pasar inmediatamente a lo siguiente.',
    example:
      'Ya hemos hablado mucho del tráfico. A otra cosa, mariposa: ¿qué película vamos a ver?',
    imageUrl: "/idioms/mariposa.jpg",
    videoUrl: '/videos/mariposa.mp4',
    category: 'Social/Comunicación',
    exercises: [
      {
        q: '¿Cuál es el objetivo principal de usar esta expresión?',
        options: [
          'Describir la naturaleza',
          'Cambiar el tema de conversación',
          'Pedir perdón',
        ],
        a: 'Cambiar el tema de conversación',
      },
      {
        q: 'Ya hemos terminado de discutir por el dinero. ¡A otra ________, mariposa!',
        options: ['casa', 'persona', 'cosa'],
        a: 'cosa',
      },
      {
        q: 'Quieres que tu equipo deje de hablar de un problema pasado y se concentre en el futuro. ¿Qué dices?',
        options: [
          'Esto no tiene ni pies ni cabeza',
          'Bueno, a otra cosa mariposa. Veamos los planes nuevos',
          'Estoy hasta las narices',
        ],
        a: 'Bueno, a otra cosa mariposa. Veamos los planes nuevos',
      },
      {
        q: "Cuando alguien dice 'a otra cosa, mariposa', suele ser porque:",
        options: [
          'El tema actual ya está agotado o no es productivo',
          'Quiere empezar una pelea',
          'No ha entendido nada',
        ],
        a: 'El tema actual ya está agotado o no es productivo',
      },
    ],
  },
  {
    id: '37',
    expression: 'Ser de carne y hueso',
    meaning:
      'Ser una persona real, con sentimientos, defectos y debilidades.',
    example:
      'A veces olvidamos que los presidentes también sufren; al final, todos somos de carne y hueso.',
    imageUrl: "/idioms/carne.jpg",
    videoUrl: '/videos/carne.mp4',
    category: 'Psicología',
    exercises: [
      {
        q: "¿Qué significa que una persona es 'de carne y hueso'?",
        options: [
          'Le gusta mucho la carne',
          'Es un ser humano con sentimientos y errores',
          'Es muy fuerte y nunca se cansa',
        ],
        a: 'Es un ser humano con sentimientos y errores',
      },
      {
        q: 'No esperes que sea perfecto siempre; recuerda que soy de carne y ________.',
        options: ['pelo', 'mano', 'hueso'],
        a: 'hueso',
      },
      {
        q: '¿En qué situación es más adecuado usar esta expresión?',
        options: [
          'Al ver a un robot trabajando',
          'Cuando un deportista famoso llora al perder',
          'En la carnicería comprando comida',
        ],
        a: 'Cuando un deportista famoso llora al perder',
      },
      {
        q: "Si un empleado dice 'Perdone, soy de carne y hueso', ¿qué quiere decir?",
        options: [
          'Que errar es humano y puede equivocarse',
          'Que necesita comer más',
          'Que se ha roto un hueso',
        ],
        a: 'Que errar es humano y puede equivocarse',
      },
    ],
  },
  {
    id: '38',
    expression: 'Tirar la toalla',
    meaning:
      'Rendirse ante una situación difícil o dejar de intentar algo.',
    example:
      'He intentado aprender piano meses, pero es muy difícil; estoy a punto de tirar la toalla.',
    imageUrl: "/idioms/toalla.jpg",
    videoUrl: '/videos/toalla.mp4',
    category: 'Psicología/Deportes',
    exercises: [
      {
        q: "¿Qué hace una persona que 'tira la toalla'?",
        options: [
          'Se va a la piscina',
          'Empieza un proyecto nuevo',
          'Deja de intentar algo porque se rinde',
        ],
        a: 'Deja de intentar algo porque se rinde',
      },
      {
        q: 'Sé que el examen es difícil, pero no puedes ________ la toalla ahora.',
        options: ['comprar', 'tirar', 'limpiar'],
        a: 'tirar',
      },
      {
        q: '¿En cuál de estos casos sería más lógico usar la expresión?',
        options: [
          'Ganar una medalla de oro',
          'Abandonar la carrera en el último año',
          'Comprar toallas nuevas',
        ],
        a: 'Abandonar la carrera en el último año',
      },
      {
        q: '¿Qué significa en el boxeo que el entrenador tire la toalla?',
        options: [
          'Admite que su boxeador no puede seguir',
          'Que ya es muy tarde',
          'Que el boxeador necesita secarse el sudor',
        ],
        a: 'Admite que su boxeador no puede seguir',
      },
    ],
  },
  {
    id: '39',
    expression: 'Más vale tarde que nunca',
    meaning:
      'Es preferible que algo bueno suceda con retraso a que no suceda en absoluto.',
    example:
      'Perdona por no llamarte ayer por tu cumpleaños, ¡pero felicidades! Más vale tarde que nunca.',
    imageUrl: "/idioms/nunca.jpg",
    videoUrl: '/videos/nunca.mp4',
    category: 'Filosofía/Tiempo',
    exercises: [
      {
        q: '¿Cuándo usamos esta expresión?',
        options: [
          'Cuando alguien llega puntual',
          'Cuando algo positivo ocurre con retraso',
          'Cuando decidimos no hacer algo',
        ],
        a: 'Cuando algo positivo ocurre con retraso',
      },
      {
        q: 'Sé que te debía este dinero desde el año pasado, aquí tienes. Más vale tarde que ________.',
        options: ['siempre', 'ayer', 'nunca'],
        a: 'nunca',
      },
      {
        q: '¿En qué situación es más adecuado usar esta frase?',
        options: [
          'Un tren que llega con adelanto',
          'Una persona que aprende a conducir a los 70 años',
          'Alguien que olvida una tarea y no la hace',
        ],
        a: 'Una persona que aprende a conducir a los 70 años',
      },
      {
        q: 'Si alguien envía un regalo tarde y dice esta frase, ¿qué intenta?',
        options: [
          'Justificar el retraso dando importancia al detalle',
          'Presumir de su dinero',
          'Quejarse del servicio de correos',
        ],
        a: 'Justificar el retraso dando importancia al detalle',
      },
    ],
  },
  {
    id: '40',
    expression: 'Estar al pie del cañón',
    meaning:
      'Mantenerse firme en un trabajo o situación difícil sin rendirse.',
    example:
      'Aunque la empresa pasa por un mal momento, los empleados siguen ahí, al pie del cañón.',
    imageUrl: "/idioms/canon.jpg",
    videoUrl: '/videos/canon.mp4',
    category: 'Trabajo/Actitud',
    exercises: [
      {
        q: "¿Qué hace una persona que está 'al pie del cañón'?",
        options: [
          'Le gusta la historia militar',
          'Busca excusas para no trabajar',
          'Cumple su deber y se mantiene firme ante problemas',
        ],
        a: 'Cumple su deber y se mantiene firme ante problemas',
      },
      {
        q: 'Mi madre siempre ha estado al ________ del cañón para ayudar a la familia.',
        options: ['lado', 'pie', 'final'],
        a: 'pie',
      },
      {
        q: '¿En qué escenario usarías esta expresión?',
        options: [
          'Un estudiante que se va de vacaciones antes de un examen',
          'Un médico trabajando horas extra en una emergencia',
          'Alguien que llega tarde y no se disculpa',
        ],
        a: 'Un médico trabajando horas extra en una emergencia',
      },
      {
        q: "Si alguien te dice: 'Gracias por estar al pie del cañón', ¿qué significa?",
        options: [
          'Agradece tu lealtad y esfuerzo constante',
          'Cree que eres una persona agresiva',
          'Quiere que te vayas a descansar',
        ],
        a: 'Agradece tu lealtad y esfuerzo constante',
      },
    ],
  },
  {
    id: '41',
    expression: 'Irse el santo al cielo',
    meaning:
      'Olvidar de repente lo que se iba a decir o hacer, o distraerse mucho.',
    example:
      'Entré en la cocina, pero me puse a mirar el móvil y se me fue el santo al cielo; ya no recuerdo a qué venía.',
    imageUrl: "/idioms/cielo.jpg",
    videoUrl: '/videos/cielo.mp4',
    category: 'Psicología/Atención',
    exercises: [
      {
        q: "¿Qué sucede cuando a alguien 'se le va el santo al cielo'?",
        options: [
          'Ha tenido una idea brillante',
          'Se ha distraído u olvidado lo que hacía',
          'Tiene muchas ganas de dormir',
        ],
        a: 'Se ha distraído u olvidado lo que hacía',
      },
      {
        q: 'Perdona, me quedé mirando por la ventana y se me ha ido el ________ al cielo.',
        options: ['ángel', 'santo', 'pájaro'],
        a: 'santo',
      },
      {
        q: '¿En qué situación es más probable usar esta frase?',
        options: [
          'Llegar puntual a una reunión',
          'Cuando se te quema la comida por estar leyendo',
          'Explicar una dirección detalladamente',
        ],
        a: 'Cuando se te quema la comida por estar leyendo',
      },
      {
        q: "Si dices: 'Espera, se me ha ido el santo al cielo' mientras hablas, ¿qué quieres decir?",
        options: [
          'Has perdido el hilo y no recuerdas qué ibas a decir',
          'Tienes que irte a la iglesia',
          'Estás muy enfadado con tu amigo',
        ],
        a: 'Has perdido el hilo y no recuerdas qué ibas a decir',
      },
    ],
  },
  {
    id: '42',
    expression: 'Hacer la vista gorda',
    meaning:
      'Fingir que no se ha visto algo (un error o falta) para evitar problemas o favorecer a alguien.',
    example:
      'El profesor vio que el alumno usaba el móvil, pero hizo la vista gorda porque era el último día.',
    imageUrl: "/idioms/gorda.jpg",
    videoUrl: '/videos/gorda.mp4',
    category: 'Social/Ética',
    exercises: [
      {
        q: "¿Qué hace una persona que 'hace la vista gorda'?",
        options: [
          'Va al oculista',
          'Decide ignorar una mala acción a propósito',
          'Limpia sus gafas',
        ],
        a: 'Decide ignorar una mala acción a propósito',
      },
      {
        q: 'A veces los padres hacen la ________ gorda cuando sus hijos se acuestan tarde.',
        options: ['cara', 'mano', 'vista'],
        a: 'vista',
      },
      {
        q: '¿En qué situación es más común usar esta frase?',
        options: [
          'Un árbitro muy estricto',
          'Un guardia que deja pasar a un amigo sin entrada',
          'Alguien mirándose al espejo',
        ],
        a: 'Un guardia que deja pasar a un amigo sin entrada',
      },
      {
        q: "Si el jefe 'hace la vista gorda' con los retrasos de Juan, ¿qué significa?",
        options: [
          'El jefe lo sabe pero decide no castigarlo',
          'El jefe no se ha enterado',
          'El jefe ha despedido a Juan',
        ],
        a: 'El jefe lo sabe pero decide no castigarlo',
      },
    ],
  },
  {
    id: '43',
    expression: 'Pasar de algo / de alguien',
    meaning:
      'No tener interés en una cosa o ignorar a una persona a propósito.',
    example:
      'Mis amigos quieren ir a la discoteca, pero yo paso de salir hoy; prefiero quedarme en casa.',
    imageUrl: "/idioms/pasar.jpg",
    videoUrl: '/videos/pasar.mp4',
    category: 'Social/Interés',
    exercises: [
      {
        q: "Si alguien dice 'paso de este tema', ¿qué quiere decir?",
        options: [
          'Le parece fascinante',
          'No le interesa y no quiere hablar de ello',
          'Ha estudiado mucho el tema',
        ],
        a: 'No le interesa y no quiere hablar de ello',
      },
      {
        q: 'No le hagas caso a lo que dicen, tú ________ de sus comentarios.',
        options: ['por', 'a', 'pasa'],
        a: 'pasa',
      },
      {
        q: '¿En qué situación es más común usar esta frase?',
        options: [
          'En una carta formal al banco',
          'Cuando un amigo te invita a algo aburrido',
          'Pidiendo comida en un restaurante elegante',
        ],
        a: 'Cuando un amigo te invita a algo aburrido',
      },
      {
        q: "Si una persona dice 'Juan pasa de mí', ¿cómo se siente?",
        options: [
          'Se siente ignorada por Juan',
          'Cree que Juan está enamorado',
          'Piensa que Juan es muy puntual',
        ],
        a: 'Se siente ignorada por Juan',
      },
    ],
  },
  {
    id: '44',
    expression: 'Estar de mala leche',
    meaning:
      'Estar de muy mal humor, irritable o tener malas intenciones.',
    example:
      'No le preguntes nada ahora a tu hermano, que está de mala leche porque ha perdido su equipo.',
    imageUrl: "/idioms/estar_leche.jpg",
    videoUrl: '/videos/estar_leche.mp4',
    category: 'Emociones',
    exercises: [
      {
        q: "¿Cómo se siente alguien que 'está de mala leche'?",
        options: [
          'Feliz y con ganas de bromear',
          'Irritable, enfadado o molesto',
          'Con mucha hambre',
        ],
        a: 'Irritable, enfadado o molesto',
      },
      {
        q: 'Hoy mi jefe está de mala ________, mejor hablamos con él mañana.',
        options: ['uva', 'leche', 'fruta'],
        a: 'leche',
      },
      {
        q: '¿En qué situación es más probable usar esta frase?',
        options: [
          'Al recibir una noticia excelente',
          'Cuando alguien te contesta de forma borde por un mal día',
          'Relajado en la playa',
        ],
        a: 'Cuando alguien te contesta de forma borde por un mal día',
      },
      {
        q: "Si una broma 'está hecha con mala leche', ¿qué significa?",
        options: [
          'Tiene la intención de herir o molestar',
          'Es muy graciosa',
          'Trata sobre productos lácteos',
        ],
        a: 'Tiene la intención de herir o molestar',
      },
    ],
  },
  {
    id: '45',
    expression: 'A quien madruga, Dios le ayuda',
    meaning:
      'Las personas que se esfuerzan y empiezan sus tareas pronto tienen más probabilidades de éxito.',
    example:
      'Mañana me levantaré a las seis para estudiar antes del examen; ya sabes que a quien madruga, Dios le ayuda.',
    imageUrl: "/idioms/madruga.jpg",
    videoUrl: '/videos/madruga.mp4',
    category: 'Sabiduría Popular',
    exercises: [
      {
        q: '¿Cuál es el mensaje principal de este refrán?',
        options: [
          'Es necesario ir a la iglesia muy temprano',
          'Ser trabajador y empezar pronto trae beneficios',
          'Dormir mucho es bueno para la salud',
        ],
        a: 'Ser trabajador y empezar pronto trae beneficios',
      },
      {
        q: 'No dejes el trabajo para la tarde. Recuerda que a quien ________, Dios le ayuda.',
        options: ['corre', 'duerme', 'madruga'],
        a: 'madruga',
      },
      {
        q: '¿En qué situación sería más adecuado usar este refrán?',
        options: [
          'Cuando alguien llega tarde a una cita',
          'Cuando un emprendedor abre su negocio muy temprano',
          'Cuando decides cancelar planes por sueño',
        ],
        a: 'Cuando un emprendedor abre su negocio muy temprano',
      },
      {
        q: "En este refrán, el verbo 'madrugar' también implica...",
        options: [
          'Actuar con rapidez y anticipación ante un deber',
          'Despertarse cansado tras una fiesta',
          'Soñar con cosas positivas',
        ],
        a: 'Actuar con rapidez y anticipación ante un deber',
      },
    ],
  },
  {
    id: '46',
    expression: 'Ser un cero a la izquierda',
    meaning:
      'Sentirse o ser alguien que no tiene ninguna influencia o cuya opinión no es valorada.',
    example:
      'En las reuniones de vecinos siento que soy un cero a la izquierda, nadie escucha mis propuestas.',
    imageUrl: "/idioms/cero.jpg",
    videoUrl: '/videos/cero.mp4',
    category: 'Social/Sentimientos',
    exercises: [
      {
        q: "Si alguien dice que es 'un cero a la izquierda', ¿cómo se siente?",
        options: [
          'La persona más importante del grupo',
          'Que su presencia u opinión no tienen valor',
          'Que es muy bueno en matemáticas',
        ],
        a: 'Que su presencia u opinión no tienen valor',
      },
      {
        q: 'Desde que llegó el nuevo jefe, me ignoran; parece que soy un ________ a la izquierda.',
        options: ['cero', 'uno', 'diez'],
        a: 'cero',
      },
      {
        q: '¿En qué situación es más común usar esta frase?',
        options: [
          'Cuando ganas un premio',
          'Cuando tus amigos organizan un viaje y no te preguntan',
          'Cuando eres el director de una empresa',
        ],
        a: 'Cuando tus amigos organizan un viaje y no te preguntan',
      },
      {
        q: "¿Por qué se dice 'a la izquierda'?",
        options: [
          'Porque el lado izquierdo es siempre negativo',
          'Porque un cero a la izquierda no cambia el valor de un número entero',
          'Porque la mayoría de las personas son diestras',
        ],
        a: 'Porque un cero a la izquierda no cambia el valor de un número entero',
      },
    ],
  },
  {
    id: '47',
    expression: 'Irse de copas',
    meaning:
      'Salir por la noche con amigos para tomar bebidas y socializar en bares o pubs.',
    example:
      'Hoy es viernes y por fin he terminado el proyecto; ¿nos vamos de copas para celebrar?',
    imageUrl: "/idioms/copas.jpg",
    videoUrl: '/videos/copas.mp4',
    category: 'Social/Ocio',
    exercises: [
      {
        q: "¿Qué significa que un grupo de amigos se va 'de copas'?",
        options: [
          'Van a comprar vajilla nueva',
          'Salen a divertirse y tomar algo en bares',
          'Participan en un torneo deportivo',
        ],
        a: 'Salen a divertirse y tomar algo en bares',
      },
      {
        q: 'Después de la cena, nos fuimos de ________ por el centro de la ciudad.',
        options: ['vasos', 'copas', 'platos'],
        a: 'copas',
      },
      {
        q: '¿En qué contexto es más probable escuchar esta expresión?',
        options: [
          'En una reunión formal a las 8 AM',
          'Hablando con compañeros al final de la semana',
          'En una biblioteca pública',
        ],
        a: 'Hablando con compañeros al final de la semana',
      },
      {
        q: "A diferencia de 'ir de cañas', 'irse de copas' suele implicar:",
        options: [
          'Horario más nocturno y ambiente de fiesta',
          'Que solo se beben zumos',
          'Ropa obligatoria de deporte',
        ],
        a: 'Horario más nocturno y ambiente de fiesta',
      },
    ],
  },
  {
    id: '48',
    expression: 'Dormir a pierna suelta',
    meaning:
      'Dormir muy profundamente, con total tranquilidad y sin interrupciones.',
    example:
      'Como ayer terminé todos mis exámenes, anoche pude dormir a pierna suelta por fin.',
    imageUrl: "/idioms/suelta.jpg",
    videoUrl: '/videos/suelta.mp4',
    category: 'Salud/Bienestar',
    exercises: [
      {
        q: "¿Cómo duerme una persona que lo hace 'a pierna suelta'?",
        options: [
          'Con mucha ropa y calor',
          'Profundamente y de forma muy relajada',
          'Solo un par de horas y se despierta cansado',
        ],
        a: 'Profundamente y de forma muy relajada',
      },
      {
        q: 'Después de caminar 20 kilómetros por el monte, llegué a casa y dormí a ________ suelta.',
        options: ['mano', 'pierna', 'cabeza'],
        a: 'pierna',
      },
      {
        q: '¿En qué situación es más lógico usar esta frase?',
        options: [
          'Cuando tienes mucha cafeína y no puedes cerrar los ojos',
          'Cuando estás de vacaciones en un sitio silencioso y descansas maravillosamente',
          'Cuando estás preocupado y das vueltas en la cama',
        ],
        a: 'Cuando estás de vacaciones en un sitio silencioso y descansas maravillosamente',
      },
      {
        q: "Si alguien te dice 'anoche dormí a pierna suelta', te transmite que:",
        options: [
          'Su calidad de sueño fue excelente y se siente renovado',
          'Tuvo pesadillas durante toda la noche',
          'Se cayó de la cama mientras dormía',
        ],
        a: 'Su calidad de sueño fue excelente y se siente renovado',
      },
    ],
  },{
  id: '50',
  expression: 'Pensar en las musarañas',
  meaning:
    'Estar distraído o absorto en pensamientos ajenos a lo que se está haciendo o diciendo.',
  example:
    '¡Oye, préstame atención! Te estoy explicando algo importante y parece que estás pensando en las musarañas.',
  imageUrl: "/idioms/musaranas.jpg",
  videoUrl: '/videos/musaranas.mp4',
  category: 'Mente/Atención',
  exercises: [
    {
      q: "¿Qué significa realmente que alguien está 'pensando en las musarañas'?",
      options: [
        'Que está muy concentrado en su trabajo',
        'Que está distraído o en las nubes',
        'Que está estudiando sobre animales pequeños',
      ],
      a: 'Que está distraído o en las nubes',
    },
    {
      q: 'El profesor se enfadó conmigo porque mientras explicaba la lección, yo estaba pensando en las ________.',
      options: ['musarañas', 'hormigas', 'estrellas'],
      a: 'musarañas',
    },
    {
      q: '¿En qué situación usarías esta expresión?',
      options: [
        'Cuando un amigo no te escucha porque está mirando fijamente a la nada',
        'Cuando estás planificando tus metas de forma muy seria',
        'Cuando te duele la cabeza por estudiar demasiado',
      ],
      a: 'Cuando un amigo no te escucha porque está mirando fijamente a la nada',
    },
    {
      q: "Si un jefe le dice a su empleado 'deja de pensar en las musarañas', le está pidiendo que:",
      options: [
        'Se tome un descanso y se relaje',
        'Se concentre en la tarea que tiene delante',
        'Sea más creativo e imagine cosas nuevas',
      ],
      a: 'Se concentre en la tarea que tiene delante',
    },
  ],
},

{
  id: '52',
  expression: 'Lo que faltaba',
  meaning:
    'Se usa para expresar que una situación ya era mala y acaba de ocurrir algo nuevo que la empeora aún más.',
  example:
    'Llego tarde al trabajo, está lloviendo y ahora me doy cuenta de que no tengo las llaves del coche. ¡Lo que faltaba!',
  imageUrl: "/idioms/faltaba.jpg",
  videoUrl: '/videos/faltaba.mp4',
  category: 'Reacción/Ironía',
  exercises: [
    {
      q: "¿En qué tono se suele decir '¡Lo que faltaba!'?",
      options: [
        'En tono de alegría y sorpresa positiva',
        'En tono irónico, con frustración o resignación',
        'En tono de duda o pregunta',
      ],
      a: 'En tono irónico, con frustración o resignación',
    },
    {
      q: 'Se ha ido la luz y tengo que terminar el informe para mañana. ¡Lo que ________!',
      options: ['sobraba', 'quería', 'faltaba'],
      a: 'faltaba',
    },
    {
      q: '¿En qué situación es más adecuado usar esta frase?',
      options: [
        'Cuando recibes un regalo inesperado que te encanta',
        'Cuando después de un día agotador, llegas a casa y descubres que se ha roto la calefacción',
        'Cuando encuentras un billete de cinco euros en el bolsillo',
      ],
      a: 'Cuando después de un día agotador, llegas a casa y descubres que se ha roto la calefacción',
    },
    {
      q: "Al decir esta expresión, el hablante implica que:",
      options: [
        'Su paciencia está al límite porque los problemas se acumulan',
        'Le falta información para entender lo que está pasando',
        'Necesita comprar algo que ha olvidado en la tienda',
      ],
      a: 'Su paciencia está al límite porque los problemas se acumulan',
    },
  ],
},

{
  id: '55',
  expression: 'Estar al día',
  meaning:
    'Быть в курсе последних новостей или событий, либо полностью закрыть текущие дела или платежи.',
  example:
    'Me gusta leer el periódico cada mañana para estar al día de lo que pasa en el mundo.',
  imageUrl: "/idioms/aldia.jpg",
  videoUrl: '/videos/aldia.mp4',
  category: 'Trabajo/Información',
  exercises: [
    {
      q: "¿Qué significa 'estar al día'?",
      options: [
        'Tener mucho sueño durante el día',
        'Estar actualizado o informado sobre algo',
        'Esperar a que salga el sol',
      ],
      a: 'Estar actualizado o informado sobre algo',
    },
    {
      q: 'No he visto las noticias esta semana, así que no estoy muy ________ día.',
      options: ['al', 'en el', 'del'],
      a: 'al',
    },
    {
      q: '¿En qué situación usarías esta frase?',
      options: [
        'Cuando has pagado todas tus facturas y no debes nada',
        'Cuando olvidas qué día de la semana es',
        'Cuando decides irte a dormir muy temprano',
      ],
      a: 'Cuando has pagado todas tus facturas y no debes nada',
    },
    {
      q: "Si tu jefe te pide 'ponerte al día', te está diciendo que:",
      options: [
        'Vayas a trabajar solo por el día',
        'Te actualices con el trabajo pendiente o las nuevas noticias',
        'Compres un calendario nuevo',
      ],
      a: 'Te actualices con el trabajo pendiente o las nuevas noticias',
    },
  ],
},

{
  id: '57',
  expression: 'No tener dónde caerse muerto',
  meaning:
    'Ser extremadamente pobre o carecer por completo de bienes, dinero o recursos.',
  example:
    'Gasta todo su dinero en ropa de marca, pero la realidad es que no tiene dónde caerse muerto.',
  imageUrl: "/idioms/caerse.jpg",
  videoUrl: '/videos/caerse.mp4',
  category: 'Sociedad/Dinero',
  exercises: [
    {
      q: "¿Qué significa que alguien 'no tiene dónde caerse muerto'?",
      options: [
        'Que es una persona muy solitaria',
        'Que no tiene dinero ni posesiones, es muy pobre',
        'Que tiene miedo a la muerte',
      ],
      a: 'Que no tiene dinero ni posesiones, es muy pobre',
    },
    {
      q: 'A pesar de trabajar tanto, dice que sigue sin tener dónde ________ muerto.',
      options: ['tirarse', 'quedarse', 'caerse'],
      a: 'caerse',
    },
    {
      q: '¿En qué contexto usarías esta frase?',
      options: [
        'Para hablar de alguien que ha perdido toda su fortuna y propiedades',
        'Para describir a alguien que siempre llega tarde',
        'Para hablar de una persona que es muy generosa',
      ],
      a: 'Para hablar de alguien que ha perdido toda su fortuna y propiedades',
    },
    {
      q: "Si decimos que un negocio 'no tiene dónde caerse muerto', queremos decir que:",
      options: [
        'Es un negocio que vende ataúdes',
        'Es un negocio que no tiene clientes ni capital, está arruinado',
        'Es un local muy grande pero vacío',
      ],
      a: 'Es un negocio que no tiene clientes ni capital, está arruinado',
    },
  ],
},

{
  id: '58',
  expression: 'Andar con pies de plomo',
  meaning:
    'Actuar con muchísima cautela, prudencia o precaución para evitar cometer un error o caer en un peligro.',
  example:
    'El negocio parece bueno, pero el mercado está muy inestable, así que hay que andar con pies de plomo.',
  imageUrl: "/idioms/plomo.jpg",
  videoUrl: '/videos/plomo.mp4',
  category: 'Comportamiento/Prudencia',
  exercises: [
    {
      q: "¿Qué significa 'andar con pies de plomo'?",
      options: [
        'Caminar muy rápido porque tienes prisa',
        'Actuar con mucha cautela y precaución',
        'Llevar zapatos muy pesados para hacer ejercicio',
      ],
      a: 'Actuar con mucha cautela y precaución',
    },
    {
      q: 'Es una situación delicada, te sugiero que ________ con pies de plomo.',
      options: ['vayas', 'andes', 'corras'],
      a: 'andes',
    },
    {
      q: '¿En qué situación usarías esta frase?',
      options: [
        'Cuando estás en una negociación difícil y no quieres arriesgarte',
        'Cuando estás bailando en una fiesta muy animada',
        'Cuando tienes total confianza en que nada puede salir mal',
      ],
      a: 'Cuando estás en una negociación difícil y no quieres arriesgarte',
    },
    {
      q: "Si alguien te dice 'anda con pies de plomo', te está aconsejando que:",
      options: [
        'No seas tan lento al tomar decisiones',
        'Tengas mucho cuidado con lo que haces o dices',
        'Compres zapatos de mejor calidad',
      ],
      a: 'Tengas mucho cuidado con lo que haces o dices',
    },
  ],
},

];
export default idioms;

