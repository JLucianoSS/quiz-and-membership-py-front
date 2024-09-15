import { SubEspecialidadCard } from "@/components";


export const SubEspecialidadesGrid = ({ subespecialidades }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-2">
        {subespecialidades.map((subespecialidad, index) => (
          <SubEspecialidadCard
            key={index} 
            id={subespecialidad.id}
            name={subespecialidad.nombre} 
          />
        ))}
      </div>
    </div>
  );
};


