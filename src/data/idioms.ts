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
  }
];
