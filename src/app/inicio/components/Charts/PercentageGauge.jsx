import { GaugeComponent } from "react-gauge-component";

export const PercentageGauge = () => {
  return (
    <>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          subArcs: [
            {
              limit: 60, // Rango rojo (0-60)
              color: "#FF6E76",
              showTick: true,
              tooltip: {
                text: "Bajo",
              },
            },
            {
              limit: 75, // Rango amarillo (61-75)
              color: "#FDDD60",
              showTick: true,
              tooltip: {
                text: "Bueno",
              },
            },
            {
              limit: 88, // Rango verde (76-88)
              color: "#55BF3B",
              showTick: true,
              tooltip: {
                text: "Muy bueno",
              },
            },
            {
              limit: 100, // Rango azul (89-100)
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
          valueLabel: { formatTextValue: (value) => value + "",style: {
            // fill: "#e8cf9a",
          }, },
          
          tickLabels: {
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (value) => value + "",
              style: { fontSize: 13 },
            },
          },
        }}
        value={22.5}
        minValue={0}
        maxValue={100}
      />
    </>
  );
};
