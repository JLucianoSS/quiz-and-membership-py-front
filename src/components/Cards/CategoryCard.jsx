import { convertToSlug } from "@/utils/strings";
import Image from "next/image";
import Link from "next/link";


export const CategoryCard = ({id, name, image }) => {
  return (
    <Link href={`/especialidad/${convertToSlug(`${name}-${id}`)}`} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg bg-white">
      <Image src={image} width={500} height={500} alt={name} className="w-full h-auto rounded-md object-cover" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
    </Link>
  );
};

