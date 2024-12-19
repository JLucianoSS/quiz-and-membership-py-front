"use client"
import { convertToSlug } from "@/utils/strings"
import { useRouter } from "next/navigation"


export const SubTemaCard = ({ id,name }) => {

  const router = useRouter();

  const handleClic = () => {
    localStorage.removeItem('quiz_progress');
    router.push(`/preguntas/subtema/${convertToSlug(`${name}-${id}`)}/p/1`)
  }

  return (
    <button onClick={handleClic}  className="bg-white shadow-md rounded-lg p-3 flex items-center justify-center border border-gray-50">
      <h3 className="text-base text-center text-gray-800">{name}</h3>
    </button>
  )
}
