

/* NOTA: SE SUPONE QUE CADA OPCION(QUE MAXIMO DEBERIAN SER 4) DEBERIA TENER EL MISMO ID DE LA PREGUNTA A LA QUE CORRECPONDE
    EJEM:
     idPregunta: 1,  idOpcion: 1, La capacidad del...
     idPregunta: 1,  idOpcion: 2, El proceso de envejecimiento...
     idPregunta: 1,  idOpcion: 3, La producción de nuevas...
     idPregunta: 1,  idOpcion: 5, La muerte programada de ...
     idPregunta: 2,  idOpcion: 5, Facilita la formación de...
     idPregunta: 2,  idOpcion: 6, Disminuye la capacidad de...
     idPregunta: 2,  idOpcion: 7, No tiene efecto en el aprendizaje...
     idPregunta: 2,  idOpcion: 8, Solo afecta al cerebro durante...
     ...
*/

export const opciones = [
    // Opciones para la pregunta 1
    { 
      idPregunta: 1,
      opciones: [
        {
          idOpcion: 1,
          textOpcion: "La capacidad del cerebro para formar nuevas conexiones neuronales",
          esCorrecta: true,
          explicacion: "Esta es la definición correcta de neuroplasticidad. Se refiere a la habilidad del cerebro para reorganizarse y formar nuevas conexiones neuronales a lo largo de la vida."
        },
        {
          idOpcion: 2,
          textOpcion: "El proceso de envejecimiento del cerebro",
          esCorrecta: false,
          explicacion: "Aunque el envejecimiento afecta al cerebro, no es la definición de neuroplasticidad. La neuroplasticidad es la capacidad del cerebro para cambiar y adaptarse."
        },
        {
          idOpcion: 3,
          textOpcion: "La producción de nuevas neuronas en el cerebro adulto",
          esCorrecta: false,
          explicacion: "Esto se refiere específicamente a la neurogénesis, que es un aspecto de la neuroplasticidad, pero no abarca todo el concepto."
        },
        {
          idOpcion: 4,
          textOpcion: "La muerte programada de células cerebrales",
          esCorrecta: false,
          explicacion: "Esto se refiere a la apoptosis neuronal, que es un proceso normal en el desarrollo cerebral, pero no está relacionado directamente con la neuroplasticidad."
        }
      ]
    },
    
    // Opciones para la pregunta 2
    {
      idPregunta: 2,
      opciones: [
        {
          idOpcion: 5,
          textOpcion: "Facilita la formación de nuevas memorias y habilidades",
          esCorrecta: true,
          explicacion: "La neuroplasticidad permite al cerebro formar nuevas conexiones y reforzar las existentes, lo que es fundamental para el aprendizaje y la formación de memorias."
        },
        {
          idOpcion: 6,
          textOpcion: "Disminuye la capacidad de aprendizaje con el tiempo",
          esCorrecta: false,
          explicacion: "Esto es incorrecto. La neuroplasticidad en realidad permite que el cerebro siga aprendiendo y adaptándose a lo largo de la vida."
        },
        {
          idOpcion: 7,
          textOpcion: "No tiene efecto en el aprendizaje o la memoria",
          esCorrecta: false,
          explicacion: "Esta afirmación es falsa. La neuroplasticidad es crucial para el aprendizaje y la memoria, permitiendo al cerebro cambiar y adaptarse."
        },
        {
          idOpcion: 8,
          textOpcion: "Solo afecta al cerebro durante la infancia",
          esCorrecta: false,
          explicacion: "Aunque la neuroplasticidad es más pronunciada en la infancia, continúa a lo largo de toda la vida, no se limita solo a la infancia."
        }
      ]
    },
  
    // Opciones para la pregunta 3
    {
      idPregunta: 3,
      opciones: [
        {
          idOpcion: 9,
          textOpcion: "Dopamina, serotonina, norepinefrina - regulan el estado de ánimo y la cognición",
          esCorrecta: true,
          explicacion: "Estos son algunos de los principales neurotransmisores y sus funciones están correctamente descritas. Juegan un papel crucial en la regulación del estado de ánimo, la cognición y otros procesos cerebrales."
        },
        {
          idOpcion: 10,
          textOpcion: "Insulina, glucagón, cortisol - regulan el metabolismo",
          esCorrecta: false,
          explicacion: "Aunque estas son hormonas importantes, no son neurotransmisores. Los neurotransmisores son específicos del sistema nervioso."
        },
        {
          idOpcion: 11,
          textOpcion: "Hemoglobina, fibrina, albúmina - transportan oxígeno en la sangre",
          esCorrecta: false,
          explicacion: "Estas son proteínas sanguíneas, no neurotransmisores. Los neurotransmisores son sustancias químicas que transmiten señales en el sistema nervioso."
        },
        {
          idOpcion: 12,
          textOpcion: "Adrenalina, testosterona, estrógeno - regulan las respuestas de estrés",
          esCorrecta: false,
          explicacion: "Aunque la adrenalina puede actuar como neurotransmisor, la testosterona y el estrógeno son hormonas. Esta lista no representa correctamente los principales neurotransmisores."
        }
      ]
    },
  
    // Continúa con el mismo patrón para las demás preguntas...
  ];