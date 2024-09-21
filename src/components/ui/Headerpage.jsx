"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export const Headerpage = ({ titulo = "Titulo" }) => {
  const router = useRouter();
  return (
    <div className="flex gap-2 items-center py-6">

      <span
        className="text-primary hover:underline text-sm cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack size={25}/>
      </span>
        <h1 className="text-xl font-semibold text-gray-700">{titulo}</h1>
    </div>
  );
};
