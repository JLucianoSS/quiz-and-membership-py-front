import { GaugeComponent } from "react-gauge-component";

export const PercentageGauge = ({ aciertos, totalRespuestas }) => {
  // Calcular el rendimiento basado en la cantidad de aciertos
  let value = 0;

  if (aciertos <= 60) {
    value = aciertos; // Asignamos el valor directamente a los aciertos para el rango bajo
  } else if (aciertos <= 75) {
    value = aciertos; // Asignamos el valor directamente a los aciertos para el rango bueno
  } else if (aciertos <= 88) {
    value = aciertos; // Asignamos el valor directamente a los aciertos para el rango muy bueno
  } else {
    value = aciertos; // Asignamos el valor directamente a los aciertos para el rango excelente
  }

  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        subArcs: [
          {
            limit: 60, // Rango rojo (0-60 aciertos)
            color: "#FF6E76",
            showTick: true,
            tooltip: {
              text: "Bajo",
            },
          },
          {
            limit: 75, // Rango amarillo (61-75 aciertos)
            color: "#FDDD60",
            showTick: true,
            tooltip: {
              text: "Bueno",
            },
          },
          {
            limit: 88, // Rango verde (76-88 aciertos)
            color: "#55BF3B",
            showTick: true,
            tooltip: {
              text: "Muy bueno",
            },
          },
          {
            limit: 100, // Rango azul (89-100 aciertos)
            color: "#3B8EB5", // Azul más oscuro
            showTick: true,
            tooltip: {
              text: "Excelente",
            },
          },
        ],
      }}
      pointer={{
        color: "#345243",
        length: 0.8,
        width: 15,
      }}
      labels={{
        valueLabel: {
          formatTextValue: (value) => value + "",
          style: {},
        },

        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => value + "",
            style: { fontSize: 13 },
          },
        },
      }}
      value={value}
      minValue={0}
      maxValue={100}
    />
  );
};
