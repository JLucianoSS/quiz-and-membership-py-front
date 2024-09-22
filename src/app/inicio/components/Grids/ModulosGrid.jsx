import { CategoryCard } from "@/components";

export const ModulosGrid = ({ modulos }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {modulos.map((modulo, index) => (
        <CategoryCard
          key={index} 
          id={modulo.id_Modulo}
          name={modulo.nombre_modulo} 
          image={modulo.imagen} 
        />
      ))}
    </div>
  );
};

