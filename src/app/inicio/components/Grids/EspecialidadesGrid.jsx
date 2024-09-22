import { CategoryCard } from "@/components";

export const EspecialidadesGrid = ({ especialidades }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {especialidades.map((especialidad, index) => (
        <CategoryCard
          key={index} 
          id={especialidad.id_Modulo}
          name={especialidad.nombre_modulo} 
          image={especialidad.imagen} 
        />
      ))}
    </div>
  );
};

