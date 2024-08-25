import { convertToSlug } from "@/utils/strings"
import Link from "next/link"


export const TemaCard = ({ id,name }) => {
  return (
    <Link href={`/tema/${convertToSlug(`${name}-${id}`)}`} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center border border-gray-50">
      <h3 className="text-lg text-center text-gray-800">{name}</h3>
    </Link>
  )
}
