import { SubTemaCard } from "@/components"


export const SubTemasGrid = ({ subtemas }) => {
  return (
    <div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-2">
    {subtemas.map((subtema, index) => (
      <SubTemaCard
        key={index} 
        id={subtema.id_subtema}
        name={subtema.nombre_subtema} 
      />
    ))}
  </div></div>
  )
}
