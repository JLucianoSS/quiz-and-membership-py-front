import { GaugeComponent } from "react-gauge-component";

export const PercentageGauge = ({ aciertos, totalRespuestas }) => {
  // Calcular el porcentaje de aciertos
  const porcentaje = totalRespuestas > 0 
    ? Math.round((aciertos / totalRespuestas) * 100) 
    : 0;

  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        subArcs: [
          {
            limit: 60,
            color: "#FF6E76",
            showTick: true,
            tooltip: {
              text: "Bajo rendimiento",
            },
          },
          {
            limit: 75,
            color: "#FDDD60",
            showTick: true,
            tooltip: {
              text: "Buen rendimiento",
            },
          },
          {
            limit: 88,
            color: "#55BF3B",
            showTick: true,
            tooltip: {
              text: "Muy buen rendimiento",
            },
          },
          {
            limit: 100,
            color: "#3B8EB5",
            showTick: true,
            tooltip: {
              text: "Excelente rendimiento",
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
          formatTextValue: (value) => `${value}%`,
        },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => `${value}%`,
            style: { 
              fontSize: 13,
            },
          },
        },
      }}
      value={porcentaje}
      minValue={0}
      maxValue={100}
    />
  );
};

