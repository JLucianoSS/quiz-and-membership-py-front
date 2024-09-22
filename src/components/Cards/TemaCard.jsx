import { convertToSlug } from "@/utils/strings";
import Link from "next/link";


export const TemaCard = ({id, name }) => {
  return (
    <Link href={`/inicio/tema/${convertToSlug(`${name}-${id}`)}`} className="bg-white shadow-md rounded-lg p-3 flex items-center justify-center border border-gray-50">
      <h3 className="text-base text-center text-gray-800">{name}</h3>
    </Link>
  );
};


