"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export const FinalStep = () => {
  // limpia el local sotrage al llegar a esta pagina porque ya finalizp el quiz
  useEffect(() => {
    localStorage.removeItem("quiz_progress");


  }, []);

  return (
    <>
      <div className="w-[300px] mb-4">
        <Image
          src="/imgs/Done-pana.png"
          alt="Success"
          width={800}
          height={800}
          className=" object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        ¡Felicidades! 🎉
      </h1>
      <p className="text-sm sm:text-lg text-gray-600 mb-6 text-center">
        Has completado el cuestionario
        <br />
        ¡Veamos cómo te fue!
      </p>
      <Link
        href="/inicio/desempeno"
        className="px-6 py-3 bg-primary text-white font-medium text-lg rounded-lg"
      >
        Ver mi desempeño
      </Link>
    </>
  );
};
