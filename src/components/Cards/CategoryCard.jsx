import { convertToSlug } from "@/utils/strings";
import Image from "next/image";
import Link from "next/link";


export const CategoryCard = ({ id, name, image }) => (
  <Link href={`/inicio/modulo/${convertToSlug(`${name}-${id}`)}`} className="flex flex-col items-center justify-between p-3 border border-gray-200 rounded-lg bg-white max-h-[350px]">
    <Image 
      src={image || "/imgs/no-module-img.png"} 
      width={300} height={300} 
      alt={name} 
      className="w-full h-auto max-w-[300px] max-h-[300px] rounded-md object-cover" 
    />
    <h3 className="mt-2 text-lg font-semibold text-center">{name}</h3>
  </Link>
);