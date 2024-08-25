import { TemaCard } from "@/components"


export const TemasGrid = ({ temas }) => {
  return (
    <div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
    {temas.map((tema, index) => (
      <TemaCard
        key={index} 
        id={tema.id}
        name={tema.nombre} 
      />
    ))}
  </div></div>
  )
}