import { opciones } from "./opciones";


export function getOpcionesPorPregunta(idPregunta) {
  const preguntaOpciones = opciones.find(
    (item) => item.idPregunta === idPregunta
  );
  return preguntaOpciones || null; // Retornar todo el objeto si existe o null si no se encuentra
}


// preguntas.js

export const Preguntas = [
  // Preguntas para "Músculos intercostales"
  {
    id: 1,
    pregunta: "¿Cuáles son las principales funciones de los músculos intercostales?",
    subtemaId: 1,
    año: 2023,
  },
  {
    id: 2,
    pregunta: "¿Cómo afectan los músculos intercostales a la respiración?",
    subtemaId: 1,
    año: 2023,
  },

  // Preguntas para "Diafragma"
  {
    id: 3,
    pregunta: "¿Cuál es el papel del diafragma en la respiración?",
    subtemaId: 2,
    año: 2023,
  },
  {
    id: 4,
    pregunta: "¿Qué consecuencias puede tener la disfunción del diafragma?",
    subtemaId: 2,
    año: 2023,
  },

  // Preguntas para "Músculos accesorios de la respiración"
  {
    id: 5,
    pregunta: "¿Cuáles son los músculos accesorios de la respiración y cuándo se activan?",
    subtemaId: 3,
    año: 2023,
  },
  {
    id: 6,
    pregunta: "¿Qué importancia tienen los músculos accesorios de la respiración en el ejercicio físico?",
    subtemaId: 3,
    año: 2023,
  },

  // Preguntas para "Corazón"
  {
    id: 7,
    pregunta: "¿Cómo se organiza la estructura del corazón humano?",
    subtemaId: 4,
    año: 2023,
  },
  {
    id: 8,
    pregunta: "¿Qué función cumplen las válvulas cardíacas en el sistema cardiovascular?",
    subtemaId: 4,
    año: 2023,
  },

  // Preguntas para "Arterias y venas del tórax"
  {
    id: 9,
    pregunta: "¿Cuáles son las principales arterias y venas del tórax?",
    subtemaId: 5,
    año: 2023,
  },
  {
    id: 10,
    pregunta: "¿Qué función cumplen las venas ácigos y su relación con la circulación?",
    subtemaId: 5,
    año: 2023,
  },

  // Preguntas para "Circulación pulmonar"
  {
    id: 11,
    pregunta: "¿Cómo funciona el intercambio de gases en la circulación pulmonar?",
    subtemaId: 6,
    año: 2023,
  },
  {
    id: 12,
    pregunta: "¿Cuál es la importancia de la circulación pulmonar en el transporte de oxígeno?",
    subtemaId: 6,
    año: 2023,
  },

  // Preguntas para "Arteria torácica interna"
  {
    id: 13,
    pregunta: "¿Qué áreas irriga la arteria torácica interna?",
    subtemaId: 7,
    año: 2023,
  },
  {
    id: 14,
    pregunta: "¿Qué complicaciones pueden surgir en una lesión de la arteria torácica interna?",
    subtemaId: 7,
    año: 2023,
  },

  // Preguntas para "Vena ácigos"
  {
    id: 15,
    pregunta: "¿Qué función cumple la vena ácigos en la circulación venosa del tórax?",
    subtemaId: 8,
    año: 2023,
  },
  {
    id: 16,
    pregunta: "¿Cómo se relaciona la vena ácigos con el retorno venoso al corazón?",
    subtemaId: 8,
    año: 2023,
  },

  // Preguntas para "Sistema linfático del tórax"
  {
    id: 17,
    pregunta: "¿Cómo funciona el sistema linfático en el tórax para la defensa inmunológica?",
    subtemaId: 9,
    año: 2023,
  },
  {
    id: 18,
    pregunta: "¿Qué rol juegan los ganglios linfáticos en la región torácica?",
    subtemaId: 9,
    año: 2023,
  },

  // Preguntas para "Húmero"
  {
    id: 19,
    pregunta: "¿Qué características distinguen al húmero de otros huesos del miembro superior?",
    subtemaId: 10,
    año: 2023,
  },
  {
    id: 20,
    pregunta: "¿Cuáles son las principales inserciones musculares en el húmero?",
    subtemaId: 10,
    año: 2023,
  },

  // Preguntas para "Escápula"
  {
    id: 21,
    pregunta: "¿Cuál es la función de la escápula en el movimiento del hombro?",
    subtemaId: 11,
    año: 2023,
  },
  {
    id: 22,
    pregunta: "¿Qué estructuras se articulan con la escápula?",
    subtemaId: 11,
    año: 2023,
  },

  // Preguntas para "Clavícula"
  {
    id: 23,
    pregunta: "¿Qué función biomecánica cumple la clavícula en el miembro superior?",
    subtemaId: 12,
    año: 2023,
  },
  {
    id: 24,
    pregunta: "¿Cómo se relaciona la clavícula con el sistema esquelético del hombro?",
    subtemaId: 12,
    año: 2023,
  },

  // Y así sucesivamente para el resto de los subtemas...
];
