import { Station } from '../types';

export const STATIONS_DATA: Station[] = [
  {
    id: 'station1',
    name: 'Estación 1: El Taller de Gepeto',
    storyRelation: 'Pinocho despierta entre relojes de cuco y juguetes de madera tallados con mucho amor. Para demostrar que es un muñeco responsable y agradecido, debe ayudar a Gepeto a organizar el taller, leer las horas de los relojes y completar los patrones de juegos.',
    educationalObjective: 'Lectura del reloj analógico (horas en punto y horas y media) y completar series lógicas de juguetes.',
    materials: [
      'Reloj analógico de cartón con manecillas móviles.',
      'Fichas de juguetes recortables (tarta, tren, estrella, caballo).',
      'Plantilla de la secuencia lógica.'
    ],
    steps: [
      'El equipo se reúne en la mesa de Gepeto.',
      'Deben mirar las tres tarjetas de reloj de cuco y colocar las manecillas móviles en las horas indicadas para despertar los juguetes.',
      'Después, deben descubrir cuál es el juguete que falta en la cenefa lógica del taller.',
      'Por último, responderán al dilema de Gepeto sobre el cuidado y el esfuerzo antes de conseguir el Engranaje de Madera.'
    ],
    secretWord: 'SINCERIDAD',
    dilema: {
      question: 'Mientras ordenas el taller, ves un juguete que ha roto un compañero sin querer. Gepeto entra y pregunta qué ha pasado. ¿Qué haces?',
      options: [
        {
          text: 'Dices la verdad a Gepeto con amor para ayudar a arreglarlo entre todos.',
          isCorrect: true,
          feedback: '¡Excelente! Decir la verdad ayuda a que Gepeto confíe en ti y podáis reparar el juguete juntos.'
        },
        {
          text: 'Escondes el juguete roto debajo de la mesa para que nadie se meta en problemas.',
          isCorrect: false,
          feedback: 'Esconder los problemas no los soluciona, y Gepeto se pondrá triste si descubre que le ocultaste la verdad.'
        }
      ]
    }
  },
  {
    id: 'station2',
    name: 'Estación 2: El Camino de la Escuela',
    storyRelation: 'Pinocho sale feliz hacia el colegio con su abecedario nuevo, pero por el camino se encuentra con el travieso Gato y el astuto Zorro. Ellos le insisten para ir al País de los Juguetes a holgazanear. ¡Ayuda a Pinocho a resolver los desafíos matemáticos para no desviarse del camino y llegar a la escuela!',
    educationalObjective: 'Sumas sin llevadas y con llevadas hasta 99, restas sin llevadas y resolución de pequeños problemas matemáticos.',
    materials: [
      'Tarjetas numéricas del "Camino de Baldosas".',
      'Fichas de manzanas de colores.',
      'Lápiz y tabla para escribir operaciones.'
    ],
    steps: [
      'El equipo se sitúa en el camino dibujado en el suelo.',
      'Deben resolver una suma sin llevadas, otra con llevadas y una resta sin llevadas para avanzar por las baldosas seguras.',
      'Resolverán el pequeño problema de las manzanas de Pepito Grillo.',
      'Completarán el dilema del Grillo sobre el valor del esfuerzo en el colegio para abrir la valla de la escuela.'
    ],
    secretWord: 'ESFUERZO',
    dilema: {
      question: 'El Gato y el Zorro te prometen que en el País de los Juguetes no hay que hacer deberes ni esforzarse, solo jugar todo el día. ¿Qué decides?',
      options: [
        {
          text: 'Vas a la escuela porque sabes que estudiar te ayuda a aprender cosas maravillosas y ser útil.',
          isCorrect: true,
          feedback: '¡Estupendo! El estudio y el esfuerzo diario esculpen nuestra mente y nos hacen sabios y autónomos.'
        },
        {
          text: 'Te vas con el Gato y el Zorro a divertirte hoy, y ya irás a la escuela mañana si tienes tiempo.',
          isCorrect: false,
          feedback: '¡Cuidado! Si dejas las responsabilidades para mañana, tus orejas de burro de la pereza podrían empezar a crecer...'
        }
      ]
    }
  },
  {
    id: 'station3',
    name: 'Estación 3: El Teatro de Marionetas',
    storyRelation: '¡Oh no! Pinocho se ha desviado y ha acabado atrapado en el teatro de marionetas del codicioso titiritero Strómboli, quien lo ha encerrado en una jaula de hierro. Para rescatar a su amigo, Pepito Grillo y el Hada Azul deben clasificar el vocabulario mágico para abrir la cerradura del candado.',
    educationalObjective: 'Comprensión de plurales, distinción de género (masculino/femenino) y uso correcto de mayúsculas en nombres de personajes.',
    materials: [
      'Cerradura de cartón con letras de nombres propios.',
      'Tarjetas con palabras variadas para agrupar (marioneta, grillos, Gepeto, etc).',
      'Dashed-line de las marionetas.'
    ],
    steps: [
      'El grupo entra en el camerino del teatro.',
      'Deben clasificar las palabras en Femenino y Masculino de forma cooperativa.',
      'Deben escribir los plurales de los juguetes del cartelón de Strómboli.',
      'Descubrirán qué personajes llevan mayúsculas al principio de sus nombres.',
      'Responderán el dilema de la amistad de Pepito Grillo para conseguir la Llave de Plata.'
    ],
    secretWord: 'BONDAD',
    dilema: {
      question: 'Una de las marionetas del teatro está asustada y triste en la esquina del escenario porque se le ha roto un hilo. ¿Qué debes hacer?',
      options: [
        {
          text: 'Te acercas a darle un abrazo y pedir ayuda a un adulto para reparar su hilo roto.',
          isCorrect: true,
          feedback: '¡Precioso! La bondad y el compañerismo hacen que Pinocho esté mucho más cerca de tener un gran corazón.'
        },
        {
          text: 'Ignoras a la marioneta y corres a salvarte tú solo antes de que vuelva Strómboli.',
          isCorrect: false,
          feedback: 'Salvarse solo sin mirar atrás deja tristes a los demás. El Hada Azul valora la generosidad y el cuidado de los amigos.'
        }
      ]
    }
  },
  {
    id: 'station4',
    name: 'Estación 4: El Vientre de la Ballena',
    storyRelation: 'Gepeto naufragó buscando a su hijo y fue tragado entero por la terrible ballena gigante. ¡Pinocho se tira al mar para rescatar a su papá! El vientre está oscuro y frío. Para calentar a su viejecito padre, el equipo debe conseguir suficientes monedas para encender fuego y hacer estornudar al gigantesco monstruo marino.',
    educationalObjective: 'Lectura comprensiva breve adaptada a 1º, uso autónomo de monedas de euro (1€, 2€, 50c, 20c, 10c) y orden de frases.',
    materials: [
      'Monedas imprimibles o de plástico de 1€, 2€, 50c, 20c, 10c.',
      'Ficha de lectura breve de la ballena y sus preguntas de comprensión.',
      'Letras gigantes de madera para ordenar.'
    ],
    steps: [
      'El equipo se adentra al rincón oscuro de la ballena.',
      'Leerán el textito corto y responderán dos preguntas literales.',
      'Deben sacar del cofre la cantidad exacta de dinero requerida para comprar leña seca (3.50€).',
      'Desordenarán y reordenarán el mensaje flotante para formar la frase verdadera de rescate.',
      'Resolverán el dilema familiar antes de salir sanos y salvos por el soplo de la ballena.'
    ],
    secretWord: 'AMISTAD',
    dilema: {
      question: 'Gepeto está muy débil y tiene frío. No le quedan fuerzas para nadar. ¿Qué decide hacer Pinocho para ayudar a su padre?',
      options: [
        {
          text: 'Pinocho lo sube a sus hombros de madera y rema con todas sus fuerzas para sacarlo a flote.',
          isCorrect: true,
          feedback: '¡Maravilloso! El respeto y el amor filial a los abuelitos y padres es la mayor virtud de un niño de verdad.'
        },
        {
          text: 'Le dice a Gepeto que nade detrás de él lo más rápido que pueda porque él pesa menos.',
          isCorrect: false,
          feedback: 'Gepeto está viejito y cansado. El cuidado de las personas mayores requiere que nos esforcemos el doble por ellos.'
        }
      ]
    }
  }
];

export const GENERAL_RETO_FINAL = {
  description: '¡Felicidades, valientes! Habéis conseguido recuperar las 4 Llaves Mágicas de las Virtudes del Hada Azul en las 4 Estaciones de Juego. Ahora, los cuatro equipos debéis reuniros alrededor del Cofre Mágico del Hada Azul. Para romper el hechizo del títere de madera, debéis descifrar el mensaje combinando las cuatro palabras secretas que habéis ganado.',
  puzzleInstruction: 'Colocad las llaves en el orden correcto para completar el juramento de Pinocho:',
  magicPhrasePattern: '"Con la [SINCERIDAD] para no decir mentiras, el [ESFUERZO] para estudiar cada día, la [BONDAD] con mis compañeros y la [AMISTAD] para ayudar a quien lo necesite, ¡seré un niño de verdad!"',
  winningFormula: ['SINCERIDAD', 'ESFUERZO', 'BONDAD', 'AMISTAD'],
  fairyBlessing: '¡Mirad! El Hada Azul agita su varita mágica... ¡Pinocho se mueve, su nariz se acorta y ya no tiene hilos! ¡Es un niño de verdad gracias a vuestro gran trabajo en equipo y vuestro corazón sincero!'
};
