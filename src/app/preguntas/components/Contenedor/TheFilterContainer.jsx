"use client";

import { HeaderQuiz } from "@/components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ViewQuiz } from "..";

export const TheFilterContainer = ({ page, user }) => {
  const searchParams = useSearchParams();
  const [subtemas, setSubtemas] = useState("");

  const preguntas = JSON.parse(localStorage.getItem("questions")) ?? [];

  useEffect(() => {
    // Obtener los subtemas desde la query string
    const subtemasQuery = searchParams.get("values");
    setSubtemas(subtemasQuery);
  }, [searchParams]);

  return (
    <div className="relative">
      <HeaderQuiz
        titulo={subtemas}
        IdFavoriteQuestion={
          preguntas.length > 0
            ? preguntas[parseInt(page - 1)].id_pregunta
            : null
        }
        user={user.data}
      />
      <ViewQuiz
        preguntas={preguntas}
        // slugTema={slugSubtema}
        page={page}
        user={user}
      />
    </div>
  );
};
