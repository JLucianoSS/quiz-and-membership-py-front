export const planes = [
  {
    id_plan: 1,
    nombre: "Plan Básico",
    descripcion:
      "Acceso desde el 1 de febrero hasta el día del primer examen parcial. -Material específico para el 1er Parcial, Banco completo de preguntas, Simulacros interactivos-",
    fecha_inicio: "2025-02-01",
    fecha_fin: "2025-03-15",
    precio: "179.000",
    tipo_de_plan: "Plan Básico",
  },
  {
    id_plan: 2,
    nombre: "Plan Invierno",
    descripcion:
      "Desde el 1 de febrero hasta el día del segundo examen parcial. -Todo el contenido del 1er y 2do Parcial, Banco completo de preguntas, Ideal para quienes buscan continuidad-",
    fecha_inicio: "2025-02-01",
    fecha_fin: "2025-06-15",
    precio: "329.000",
    tipo_de_plan: "Plan Básico",
  },
  {
    id_plan: 3,
    nombre: "Plan Completo 3x3",
    descripcion:
      "Desde el 1 de febrero hasta el día del tercer examen parcial. -Recursos para los 3 parciales, Banco completo de preguntas, Simulacros interactivos-",
    fecha_inicio: "2025-02-01",
    fecha_fin: "2025-09-15",
    precio: "439.000",
    tipo_de_plan: "Plan Básico",
  },
  {
    id_plan: 4,
    nombre: "Plan Premium Anual",
    descripcion:
      "Desde el 1 de febrero hasta el día del examen final. -Todo el contenido de los 3 parciales, Recursos exclusivos, Simulacros para el examen final-",
    fecha_inicio: "2025-02-01",
    fecha_fin: "2025-12-20",
    precio: "549.000",
    tipo_de_plan: "Plan Básico",
  },
  {
    id_plan: 5, // Cambié el id para hacerlo único
    nombre: "Int. 1er Parcial",
    descripcion:
      "Acceso: 15 días antes del primer parcial. -Preguntas clave del 1er Parcial con respuestas explicadas, Simulacros exclusivos de alta dificultad-",
    fecha_inicio: "2025-03-01",
    fecha_fin: "2025-03-15",
    precio: "99.000",
    tipo_de_plan: "Plan Intensivo",
  },
  {
    id_plan: 6, // Cambié el id para hacerlo único
    nombre: "Int. 2do Parcial",
    descripcion:
      "Acceso: 15 días antes del segundo parcial. -Enfocado en temas del 2do Parcial, Simulacros exclusivos de alta dificultad-",
    fecha_inicio: "2025-06-01",
    fecha_fin: "2025-06-15",
    precio: "99.000",
    tipo_de_plan: "Plan Intensivo",
  },
  {
    id_plan: 7, // Cambié el id para hacerlo único
    nombre: "Int. 3er Parcial",
    descripcion:
      "Acceso: 15 días antes del tercer parcial. -Preguntas clave del 3er Parcial, Simulacros exclusivos-",
    fecha_inicio: "2025-09-01",
    fecha_fin: "2025-09-15",
    precio: "99.000",
    tipo_de_plan: "Plan Intensivo",
  },
  {
    id_plan: 8, // Cambié el id para hacerlo único
    nombre: "Int. Final",
    descripcion:
      "Acceso: 15 días antes del examen final. -Preguntas frecuentes y simulacros exclusivos para el examen final-",
    fecha_inicio: "2025-12-05",
    fecha_fin: "2025-12-20",
    precio: "150.000",
    tipo_de_plan: "Plan Intensivo",
  },
];

export const buscarPlanPorId = (id) => {
  return planes.find((plan) => plan.id_plan === parseInt(id));
};
