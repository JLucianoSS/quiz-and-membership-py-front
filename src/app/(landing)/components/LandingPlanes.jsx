import { PlansGrid, PlansGridIntesive } from "@/components"

export const LandingPlanes = () => {
  return (
    <>
      <div className="py-12">
        <div className="mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Nuestros Planes</h2>
          <p className="text-gray-600 mt-4">Elige el plan que mejor se adapte a ti</p>
        </div>
        <PlansGrid/>
      </div>
      <div className="py-12">
        <div className="mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Planes Intesivos</h2>
          <p className="text-gray-600 mt-4">Un mes antes de cada parcial</p>
        </div>
        <PlansGridIntesive/>
      </div>
    </>
  )
}