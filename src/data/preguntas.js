import { opciones } from "./opciones";

export function getOpcionesPorPregunta(idPregunta) {
  const preguntaOpciones = opciones.find(
    (item) => item.idPregunta === idPregunta
  );
  return preguntaOpciones ? preguntaOpciones.opciones : [];
}

export const preguntas = [
  // Preguntas para Neuroplasticidad
  {
    id: 1,
    pregunta: "¿Qué es la neuroplasticidad y cómo se manifiesta en el cerebro?",
    temaId: 1,
    año: 2023,
  },
  {
    id: 2,
    pregunta: "¿Cómo afecta la neuroplasticidad al aprendizaje y la memoria?",
    temaId: 1,
    año: 2023,
  },

  // Preguntas para Neurotransmisores
  {
    id: 3,
    pregunta:
      "¿Cuáles son los principales neurotransmisores y cuál es su función?",
    temaId: 2,
    año: 2023,
  },
  {
    id: 4,
    pregunta:
      "¿Cómo influye la dopamina en el sistema de recompensa del cerebro?",
    temaId: 2,
    año: 2023,
  },

  // Preguntas para Corteza Prefrontal
  {
    id: 5,
    pregunta: "¿Qué funciones cognitivas se asocian con la corteza prefrontal?",
    temaId: 3,
    año: 2023,
  },
  {
    id: 6,
    pregunta:
      "¿Cómo afecta el daño en la corteza prefrontal a la toma de decisiones?",
    temaId: 3,
    año: 2023,
  },

  // Preguntas para Sistema Límbico
  {
    id: 7,
    pregunta:
      "¿Cuál es el papel del sistema límbico en la regulación emocional?",
    temaId: 4,
    año: 2023,
  },
  {
    id: 8,
    pregunta:
      "¿Cómo interactúa el sistema límbico con otras áreas del cerebro?",
    temaId: 4,
    año: 2023,
  },

  // Preguntas para Neuroimagen
  {
    id: 9,
    pregunta:
      "¿Qué técnicas de neuroimagen se utilizan para estudiar el cerebro?",
    temaId: 5,
    año: 2023,
  },
  {
    id: 10,
    pregunta:
      "¿Cómo ha avanzado la neuroimagen en la detección de enfermedades neurológicas?",
    temaId: 5,
    año: 2023,
  },

  // Preguntas para Neurodesarrollo
  {
    id: 11,
    pregunta: "¿Qué factores influyen en el desarrollo neurológico temprano?",
    temaId: 6,
    año: 2023,
  },
  {
    id: 12,
    pregunta: "¿Cómo se manifiestan los trastornos del neurodesarrollo?",
    temaId: 6,
    año: 2023,
  },

  // Preguntas para Agujeros Negros
  {
    id: 13,
    pregunta: "¿Qué es un agujero negro y cómo se forma?",
    temaId: 7,
    año: 2023,
  },
  {
    id: 14,
    pregunta: "¿Qué efectos tiene un agujero negro en el espacio-tiempo?",
    temaId: 7,
    año: 2023,
  },

  // Preguntas para Teoría de la Relatividad
  {
    id: 15,
    pregunta:
      "¿Cuál es la relación entre la teoría de la relatividad y la gravedad?",
    temaId: 8,
    año: 2023,
  },
  {
    id: 16,
    pregunta:
      "¿Cómo afecta la teoría de la relatividad a nuestra comprensión del universo?",
    temaId: 8,
    año: 2023,
  },

  // Preguntas para Formación de Galaxias
  {
    id: 17,
    pregunta: "¿Qué procesos intervienen en la formación de galaxias?",
    temaId: 9,
    año: 2023,
  },
  {
    id: 18,
    pregunta:
      "¿Cómo influyen las colisiones galácticas en la evolución de las galaxias?",
    temaId: 9,
    año: 2023,
  },

  // Preguntas para Ingeniería Genética
  {
    id: 19,
    pregunta: "¿Qué técnicas se utilizan en la ingeniería genética?",
    temaId: 13,
    año: 2023,
  },
  {
    id: 20,
    pregunta:
      "¿Cuáles son las aplicaciones más importantes de la ingeniería genética?",
    temaId: 13,
    año: 2023,
  },

  // Preguntas para Cultivos Transgénicos
  {
    id: 21,
    pregunta: "¿Qué beneficios y riesgos presentan los cultivos transgénicos?",
    temaId: 14,
    año: 2023,
  },
  {
    id: 22,
    pregunta: "¿Cómo se desarrollan los cultivos transgénicos?",
    temaId: 14,
    año: 2023,
  },

  // Preguntas para Terapia Génica
  {
    id: 23,
    pregunta:
      "¿Cómo funciona la terapia génica y en qué enfermedades se aplica?",
    temaId: 15,
    año: 2023,
  },
  {
    id: 24,
    pregunta: "¿Cuáles son los avances recientes en la terapia génica?",
    temaId: 15,
    año: 2023,
  },

  // Preguntas para Clonación
  {
    id: 25,
    pregunta: "¿Qué es la clonación y cómo se realiza?",
    temaId: 16,
    año: 2023,
  },
  {
    id: 26,
    pregunta: "¿Cuáles son las implicaciones éticas de la clonación?",
    temaId: 16,
    año: 2023,
  },

  // Preguntas para Biotecnología Marina
  {
    id: 27,
    pregunta: "¿Qué aplicaciones tiene la biotecnología marina?",
    temaId: 17,
    año: 2023,
  },
  {
    id: 28,
    pregunta: "¿Cómo contribuye la biotecnología marina a la sostenibilidad?",
    temaId: 17,
    año: 2023,
  },

  // Preguntas para Biotecnología Ambiental
  {
    id: 29,
    pregunta: "¿Qué papel juega la biotecnología ambiental en la conservación?",
    temaId: 18,
    año: 2023,
  },
  {
    id: 30,
    pregunta:
      "¿Cuáles son los principales desafíos de la biotecnología ambiental?",
    temaId: 18,
    año: 2023,
  },

  // Preguntas para Historia Contemporánea
  {
    id: 31,
    pregunta:
      "¿Cuáles fueron las causas principales de la Primera Guerra Mundial?",
    temaId: 19,
    año: 2023,
  },
  {
    id: 32,
    pregunta:
      "¿Cómo afectó la Revolución Industrial al desarrollo económico global?",
    temaId: 20,
    año: 2023,
  },

  // Preguntas para Revolución Industrial
  {
    id: 33,
    pregunta: "¿Qué inventos fueron clave durante la Revolución Industrial?",
    temaId: 20,
    año: 2023,
  },
  {
    id: 34,
    pregunta:
      "¿Cómo impactó la Revolución Industrial en las condiciones laborales?",
    temaId: 20,
    año: 2023,
  },

  // Preguntas para Guerra Fría
  {
    id: 35,
    pregunta: "¿Cómo influyó la Guerra Fría en las relaciones internacionales?",
    temaId: 21,
    año: 2023,
  },
  {
    id: 36,
    pregunta: "¿Cuáles fueron los principales eventos de la Guerra Fría?",
    temaId: 21,
    año: 2023,
  },

  // Preguntas para Globalización
  {
    id: 37,
    pregunta: "¿Qué efectos ha tenido la globalización en la cultura?",
    temaId: 22,
    año: 2023,
  },
  {
    id: 38,
    pregunta: "¿Cómo ha afectado la globalización a las economías emergentes?",
    temaId: 22,
    año: 2023,
  },

  // Preguntas para Movimientos Sociales
  {
    id: 39,
    pregunta:
      "¿Cuáles son los movimientos sociales más importantes del siglo XX?",
    temaId: 23,
    año: 2023,
  },
  {
    id: 40,
    pregunta:
      "¿Cómo han cambiado los movimientos sociales con el uso de la tecnología?",
    temaId: 23,
    año: 2023,
  },

  // Preguntas para Descolonización
  {
    id: 41,
    pregunta: "¿Qué procesos caracterizan la descolonización en África?",
    temaId: 24,
    año: 2023,
  },
  {
    id: 42,
    pregunta: "¿Cuáles fueron las consecuencias de la descolonización en Asia?",
    temaId: 24,
    año: 2023,
  },

  // Preguntas para Angioplastia
  {
    id: 43,
    pregunta: "¿Qué es la angioplastia y cuándo se utiliza?",
    temaId: 25,
    año: 2023,
  },
  {
    id: 44,
    pregunta: "¿Cuáles son los riesgos asociados con la angioplastia?",
    temaId: 25,
    año: 2023,
  },

  // Preguntas para Colocación de Stents
  {
    id: 45,
    pregunta: "¿Cómo se colocan los stents y cuál es su función?",
    temaId: 26,
    año: 2023,
  },
  {
    id: 46,
    pregunta:
      "¿Cuáles son las complicaciones posibles después de la colocación de stents?",
    temaId: 26,
    año: 2023,
  },

  // Preguntas para Fibrilación Auricular
  {
    id: 47,
    pregunta: "¿Qué es la fibrilación auricular y cómo se trata?",
    temaId: 27,
    año: 2023,
  },
  {
    id: 48,
    pregunta: "¿Cuáles son las causas principales de la fibrilación auricular?",
    temaId: 27,
    año: 2023,
  },

  // Preguntas para Ablación
  {
    id: 49,
    pregunta: "¿Cómo se realiza la ablación cardíaca y cuándo está indicada?",
    temaId: 28,
    año: 2023,
  },
  {
    id: 50,
    pregunta: "¿Cuáles son los tipos de ablación cardíaca más comunes?",
    temaId: 28,
    año: 2023,
  },

  // Preguntas para Trombólisis
  {
    id: 51,
    pregunta: "¿Qué es la trombólisis y en qué situaciones se utiliza?",
    temaId: 29,
    año: 2023,
  },
  {
    id: 52,
    pregunta: "¿Cuáles son los riesgos y beneficios de la trombólisis?",
    temaId: 29,
    año: 2023,
  },

  // Preguntas para Ecocardiografía
  {
    id: 53,
    pregunta: "¿Qué información proporciona una ecocardiografía?",
    temaId: 30,
    año: 2023,
  },
  {
    id: 54,
    pregunta: "¿Cómo se interpreta una ecocardiografía normal?",
    temaId: 30,
    año: 2023,
  },

  // Preguntas para Diabetes Mellitus
  {
    id: 55,
    pregunta: "¿Cuáles son los síntomas más comunes de la diabetes mellitus?",
    temaId: 31,
    año: 2023,
  },
  {
    id: 56,
    pregunta: "¿Cómo se maneja la diabetes mellitus tipo 2?",
    temaId: 31,
    año: 2023,
  },

  // Preguntas para Tiroides
  {
    id: 57,
    pregunta: "¿Qué es el hipotiroidismo y cómo se trata?",
    temaId: 32,
    año: 2023,
  },
  {
    id: 58,
    pregunta:
      "¿Cuáles son las diferencias entre hipotiroidismo e hipertiroidismo?",
    temaId: 32,
    año: 2023,
  },

  // Preguntas para Enfermedad de Addison
  {
    id: 59,
    pregunta: "¿Qué causa la enfermedad de Addison y cuáles son sus síntomas?",
    temaId: 33,
    año: 2023,
  },
  {
    id: 60,
    pregunta: "¿Cómo se diagnostica y trata la enfermedad de Addison?",
    temaId: 33,
    año: 2023,
  },

  // Preguntas para Síndrome de Cushing
  {
    id: 61,
    pregunta: "¿Qué es el síndrome de Cushing y cómo se presenta?",
    temaId: 34,
    año: 2023,
  },
  {
    id: 62,
    pregunta:
      "¿Cuáles son las opciones de tratamiento para el síndrome de Cushing?",
    temaId: 34,
    año: 2023,
  },

  // Preguntas para Hormonas del Crecimiento
  {
    id: 63,
    pregunta: "¿Qué función cumplen las hormonas del crecimiento en el cuerpo?",
    temaId: 35,
    año: 2023,
  },
  {
    id: 64,
    pregunta:
      "¿Cómo se diagnostican los trastornos de la hormona del crecimiento?",
    temaId: 35,
    año: 2023,
  },

  // Preguntas para Metabolismo Óseo
  {
    id: 65,
    pregunta: "¿Qué factores afectan el metabolismo óseo?",
    temaId: 36,
    año: 2023,
  },
  {
    id: 66,
    pregunta: "¿Cómo se relaciona la osteoporosis con el metabolismo óseo?",
    temaId: 36,
    año: 2023,
  },

  // Preguntas para Egipto Antiguo
  {
    id: 67,
    pregunta:
      "¿Cuál fue el impacto de la religión en la vida diaria del antiguo Egipto?",
    temaId: 37,
    año: 2023,
  },
  {
    id: 68,
    pregunta: "¿Qué logros arquitectónicos caracterizan al antiguo Egipto?",
    temaId: 37,
    año: 2023,
  },

  // Preguntas para Imperio Romano
  {
    id: 69,
    pregunta:
      "¿Cómo contribuyó el Imperio Romano a la expansión del cristianismo?",
    temaId: 38,
    año: 2023,
  },
  {
    id: 70,
    pregunta: "¿Qué factores llevaron a la caída del Imperio Romano?",
    temaId: 38,
    año: 2023,
  },

  // Preguntas para Mesopotamia
  {
    id: 71,
    pregunta:
      "¿Cuáles son los principales logros de la civilización mesopotámica?",
    temaId: 39,
    año: 2023,
  },
  {
    id: 72,
    pregunta: "¿Qué papel jugó la escritura cuneiforme en la Mesopotamia?",
    temaId: 39,
    año: 2023,
  },

  // Preguntas para Grecia Clásica
  {
    id: 73,
    pregunta: "¿Cómo influyó la filosofía griega en el pensamiento occidental?",
    temaId: 40,
    año: 2023,
  },
  {
    id: 74,
    pregunta:
      "¿Qué aportes culturales realizó la Grecia clásica a la humanidad?",
    temaId: 40,
    año: 2023,
  },

  // Preguntas para Civilización China
  {
    id: 75,
    pregunta:
      "¿Cuáles fueron las dinastías más influyentes en la historia de China?",
    temaId: 41,
    año: 2023,
  },
  {
    id: 76,
    pregunta:
      "¿Cómo impactaron las rutas comerciales en la civilización china?",
    temaId: 41,
    año: 2023,
  },

  // Preguntas para Pueblos Bárbaros
  {
    id: 77,
    pregunta: "¿Qué impacto tuvieron las invasiones bárbaras en Europa?",
    temaId: 42,
    año: 2023,
  },
  {
    id: 78,
    pregunta:
      "¿Cómo contribuyeron los pueblos bárbaros a la caída del Imperio Romano?",
    temaId: 42,
    año: 2023,
  },

  // Preguntas para Hidrocarburos
  {
    id: 79,
    pregunta:
      "¿Cuál es la diferencia entre hidrocarburos saturados e insaturados?",
    temaId: 43,
    año: 2023,
  },
  {
    id: 80,
    pregunta: "¿Cómo se obtienen los hidrocarburos a partir del petróleo?",
    temaId: 43,
    año: 2023,
  },

  // Preguntas para Alcoholes
  {
    id: 81,
    pregunta: "¿Qué tipos de alcoholes existen y cuáles son sus usos?",
    temaId: 44,
    año: 2023,
  },
  {
    id: 82,
    pregunta: "¿Cómo se produce el etanol y qué aplicaciones tiene?",
    temaId: 44,
    año: 2023,
  },

  // Preguntas para Ácidos Carboxílicos
  {
    id: 83,
    pregunta:
      "¿Qué propiedades químicas caracterizan a los ácidos carboxílicos?",
    temaId: 45,
    año: 2023,
  },
  {
    id: 84,
    pregunta:
      "¿Cuáles son las reacciones más comunes de los ácidos carboxílicos?",
    temaId: 45,
    año: 2023,
  },

  // Preguntas para Aldehídos y Cetonas
  {
    id: 85,
    pregunta: "¿Qué diferencias existen entre aldehídos y cetonas?",
    temaId: 46,
    año: 2023,
  },
  {
    id: 86,
    pregunta: "¿Cómo se sintetizan los aldehídos y las cetonas?",
    temaId: 46,
    año: 2023,
  },

  // Preguntas para Aminas
  {
    id: 87,
    pregunta: "¿Qué son las aminas y cómo se clasifican?",
    temaId: 47,
    año: 2023,
  },
  {
    id: 88,
    pregunta: "¿Cómo se relacionan las aminas con los neurotransmisores?",
    temaId: 47,
    año: 2023,
  },

  // Preguntas para Polímeros
  {
    id: 89,
    pregunta: "¿Qué tipos de polímeros existen y cuáles son sus aplicaciones?",
    temaId: 48,
    año: 2023,
  },
  {
    id: 90,
    pregunta: "¿Cómo se fabrican los polímeros sintéticos?",
    temaId: 48,
    año: 2023,
  },

  // Preguntas para Cáncer de Mama
  {
    id: 91,
    pregunta: "¿Cuáles son los factores de riesgo del cáncer de mama?",
    temaId: 49,
    año: 2023,
  },
  {
    id: 92,
    pregunta: "¿Qué tratamientos están disponibles para el cáncer de mama?",
    temaId: 49,
    año: 2023,
  },

  // Preguntas para Cáncer de Pulmón
  {
    id: 93,
    pregunta: "¿Cómo se diagnostica el cáncer de pulmón?",
    temaId: 50,
    año: 2023,
  },
  {
    id: 94,
    pregunta: "¿Cuáles son los síntomas más comunes del cáncer de pulmón?",
    temaId: 50,
    año: 2023,
  },

  // Preguntas para Leucemia
  {
    id: 95,
    pregunta: "¿Qué es la leucemia y cómo se clasifica?",
    temaId: 51,
    año: 2023,
  },
  {
    id: 96,
    pregunta: "¿Cuáles son las opciones de tratamiento para la leucemia?",
    temaId: 51,
    año: 2023,
  },

  // Preguntas para Terapia Dirigida
  {
    id: 97,
    pregunta: "¿Qué es la terapia dirigida en el tratamiento del cáncer?",
    temaId: 52,
    año: 2023,
  },
  {
    id: 98,
    pregunta: "¿Cuáles son los beneficios de la terapia dirigida?",
    temaId: 52,
    año: 2023,
  },

  // Preguntas para Inmunoterapia
  {
    id: 99,
    pregunta: "¿Cómo funciona la inmunoterapia en el tratamiento del cáncer?",
    temaId: 53,
    año: 2023,
  },
  {
    id: 100,
    pregunta: "¿Cuáles son los efectos secundarios de la inmunoterapia?",
    temaId: 53,
    año: 2023,
  },

  // Preguntas para Carcinogénesis
  {
    id: 101,
    pregunta: "¿Qué procesos están involucrados en la carcinogénesis?",
    temaId: 54,
    año: 2023,
  },
  {
    id: 102,
    pregunta:
      "¿Cómo se relaciona la carcinogénesis con las mutaciones genéticas?",
    temaId: 54,
    año: 2023,
  },

  // Preguntas para Nanomateriales
  {
    id: 103,
    pregunta: "¿Qué son los nanomateriales y cómo se utilizan?",
    temaId: 55,
    año: 2023,
  },
  {
    id: 104,
    pregunta:
      "¿Cuáles son las aplicaciones de los nanomateriales en la industria?",
    temaId: 55,
    año: 2023,
  },

  // Preguntas para Nanomedicina
  {
    id: 105,
    pregunta:
      "¿Qué beneficios ofrece la nanomedicina en el tratamiento de enfermedades?",
    temaId: 56,
    año: 2023,
  },
  {
    id: 106,
    pregunta: "¿Cuáles son los riesgos asociados con la nanomedicina?",
    temaId: 56,
    año: 2023,
  },

  // Preguntas para Nanorobótica
  {
    id: 107,
    pregunta: "¿Cómo funcionan los nanorobots y cuáles son sus aplicaciones?",
    temaId: 57,
    año: 2023,
  },
  {
    id: 108,
    pregunta: "¿Cuáles son los avances recientes en la nanorobótica?",
    temaId: 57,
    año: 2023,
  },

  // Preguntas para Nanotubos de Carbono
  {
    id: 109,
    pregunta: "¿Qué propiedades tienen los nanotubos de carbono?",
    temaId: 58,
    año: 2023,
  },
  {
    id: 110,
    pregunta: "¿Cómo se producen y utilizan los nanotubos de carbono?",
    temaId: 58,
    año: 2023,
  },

  // Preguntas para Aplicaciones Industriales
  {
    id: 111,
    pregunta: "¿Qué aplicaciones industriales tienen los nanomateriales?",
    temaId: 59,
    año: 2023,
  },
  {
    id: 112,
    pregunta: "¿Cómo mejoran los nanomateriales los procesos industriales?",
    temaId: 59,
    año: 2023,
  },

  // Preguntas para Nanoelectrónica
  {
    id: 113,
    pregunta: "¿Qué es la nanoelectrónica y cómo ha evolucionado?",
    temaId: 60,
    año: 2023,
  },
  {
    id: 114,
    pregunta: "¿Cuáles son las aplicaciones más comunes de la nanoelectrónica?",
    temaId: 60,
    año: 2023,
  },

  // Preguntas para Cruzadas
  {
    id: 115,
    pregunta: "¿Cuáles fueron las principales causas de las Cruzadas?",
    temaId: 61,
    año: 2023,
  },
  {
    id: 116,
    pregunta: "¿Qué impacto tuvieron las Cruzadas en Europa y Oriente Medio?",
    temaId: 61,
    año: 2023,
  },

  // Preguntas para Feudalismo
  {
    id: 117,
    pregunta: "¿Qué características definieron el feudalismo en la Edad Media?",
    temaId: 62,
    año: 2023,
  },
  {
    id: 118,
    pregunta: "¿Cómo funcionaba el sistema feudal en la sociedad medieval?",
    temaId: 62,
    año: 2023,
  },

  // Preguntas para Peste Negra
  {
    id: 119,
    pregunta: "¿Qué efectos tuvo la Peste Negra en la población europea?",
    temaId: 63,
    año: 2023,
  },
  {
    id: 120,
    pregunta: "¿Cómo cambió la economía europea después de la Peste Negra?",
    temaId: 63,
    año: 2023,
  },

  // Preguntas para Renacimiento
  {
    id: 121,
    pregunta: "¿Qué factores dieron origen al Renacimiento en Europa?",
    temaId: 64,
    año: 2023,
  },
  {
    id: 122,
    pregunta: "¿Cómo influyó el Renacimiento en las artes y la ciencia?",
    temaId: 64,
    año: 2023,
  },

  // Preguntas para Inquisición
  {
    id: 123,
    pregunta: "¿Qué papel jugó la Inquisición en la Europa medieval?",
    temaId: 65,
    año: 2023,
  },
  {
    id: 124,
    pregunta: "¿Cuáles fueron las consecuencias sociales de la Inquisición?",
    temaId: 65,
    año: 2023,
  },

  // Preguntas para Imperio Bizantino
  {
    id: 125,
    pregunta:
      "¿Cómo contribuyó el Imperio Bizantino a la preservación de la cultura griega?",
    temaId: 66,
    año: 2023,
  },
  {
    id: 126,
    pregunta: "¿Qué factores llevaron a la caída del Imperio Bizantino?",
    temaId: 66,
    año: 2023,
  },

  // Preguntas para Brotes Epidémicos
  {
    id: 127,
    pregunta:
      "¿Qué estrategias se utilizan para controlar los brotes epidémicos?",
    temaId: 67,
    año: 2023,
  },
  {
    id: 128,
    pregunta: "¿Cómo se identifican y rastrean los brotes epidémicos?",
    temaId: 67,
    año: 2023,
  },

  // Preguntas para Estudios de Cohorte
  {
    id: 129,
    pregunta: "¿Cómo se diseñan y llevan a cabo los estudios de cohorte?",
    temaId: 68,
    año: 2023,
  },
  {
    id: 130,
    pregunta:
      "¿Cuáles son las ventajas y desventajas de los estudios de cohorte?",
    temaId: 68,
    año: 2023,
  },

  // Preguntas para Vigilancia Epidemiológica
  {
    id: 131,
    pregunta: "¿Qué es la vigilancia epidemiológica y cómo se implementa?",
    temaId: 69,
    año: 2023,
  },
  {
    id: 132,
    pregunta:
      "¿Cómo contribuye la vigilancia epidemiológica a la salud pública?",
    temaId: 69,
    año: 2023,
  },

  // Preguntas para Epidemiología Molecular
  {
    id: 133,
    pregunta:
      "¿Qué papel juega la epidemiología molecular en la investigación de enfermedades?",
    temaId: 70,
    año: 2023,
  },
  {
    id: 134,
    pregunta: "¿Cómo se aplican las técnicas moleculares en la epidemiología?",
    temaId: 70,
    año: 2023,
  },

  // Preguntas para Enfermedades Transmisibles
  {
    id: 135,
    pregunta:
      "¿Cómo se previenen las enfermedades transmisibles en la comunidad?",
    temaId: 71,
    año: 2023,
  },
  {
    id: 136,
    pregunta:
      "¿Cuáles son las enfermedades transmisibles más comunes y cómo se controlan?",
    temaId: 71,
    año: 2023,
  },

  // Preguntas para Salud Pública
  {
    id: 137,
    pregunta:
      "¿Qué estrategias de salud pública son efectivas para mejorar la salud comunitaria?",
    temaId: 72,
    año: 2023,
  },
  {
    id: 138,
    pregunta:
      "¿Cómo se implementan los programas de salud pública a nivel local?",
    temaId: 72,
    año: 2023,
  },

  // Preguntas para Independencia de América
  {
    id: 139,
    pregunta:
      "¿Cuáles fueron las causas principales de los movimientos de independencia en América?",
    temaId: 73,
    año: 2023,
  },
  {
    id: 140,
    pregunta:
      "¿Qué líderes fueron clave en las guerras de independencia americanas?",
    temaId: 73,
    año: 2023,
  },

  // Preguntas para Conquista de América
  {
    id: 141,
    pregunta:
      "¿Cómo impactó la conquista de América en las poblaciones indígenas?",
    temaId: 74,
    año: 2023,
  },
  {
    id: 142,
    pregunta:
      "¿Qué motivaciones llevaron a la conquista de América por parte de los europeos?",
    temaId: 74,
    año: 2023,
  },

  // Preguntas para Revolución Mexicana
  {
    id: 143,
    pregunta:
      "¿Qué causas sociales y económicas desencadenaron la Revolución Mexicana?",
    temaId: 75,
    año: 2023,
  },
  {
    id: 144,
    pregunta:
      "¿Cómo transformó la Revolución Mexicana el panorama político de México?",
    temaId: 75,
    año: 2023,
  },

  // Preguntas para Guerra Civil Americana
  {
    id: 145,
    pregunta:
      "¿Qué eventos clave marcaron el desarrollo de la Guerra Civil Americana?",
    temaId: 76,
    año: 2023,
  },
  {
    id: 146,
    pregunta:
      "¿Cuáles fueron las consecuencias sociales de la Guerra Civil Americana?",
    temaId: 76,
    año: 2023,
  },

  // Preguntas para Movimientos Indígenas
  {
    id: 147,
    pregunta:
      "¿Qué papel desempeñaron los movimientos indígenas en la historia de América Latina?",
    temaId: 77,
    año: 2023,
  },
  {
    id: 148,
    pregunta:
      "¿Cómo han evolucionado los movimientos indígenas en América Latina?",
    temaId: 77,
    año: 2023,
  },

  // Preguntas para Guerras de Independencia Sudamericanas
  {
    id: 149,
    pregunta:
      "¿Qué factores impulsaron las guerras de independencia en Sudamérica?",
    temaId: 78,
    año: 2023,
  },
  {
    id: 150,
    pregunta:
      "¿Cómo se desarrollaron las guerras de independencia en Sudamérica?",
    temaId: 79,
    año: 2023,
  },
];
