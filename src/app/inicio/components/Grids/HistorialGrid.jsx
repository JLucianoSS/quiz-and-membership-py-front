"use client";
import { useEffect, useState } from "react";
import { HistorialCard } from "..";
import { getPreguntaById, getUserById } from "@/actions";
import { CustomLoading } from "@/components";

export const HistorialGrid = ({ iduser }) => {
  const [user, setUser] = useState(null);
  const [preguntasConResultados, setPreguntasConResultados] = useState([]);
  const [loading, setLoading] = useState(true); // Se inicia con 'true' para mostrar el loading inicialmente
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const user = await getUserById(iduser);
        setUser(user.data);
        const resultados = user.data.resultados;
        const preguntasConResultados = await Promise.all(
          resultados.map(async (resultado) => {
            const pregunta = await getPreguntaById(resultado.id_pregunta);
            return {
              ...pregunta.data,
              ...resultado,
            };
          })
        );
        setPreguntasConResultados(
          preguntasConResultados.sort((a, b) => b.id_resultado - a.id_resultado)
        );
      } catch (error) {
        console.error("Error fetching resultados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, [reload]);

  console.log(preguntasConResultados);

  if (loading) {
    return (
      <CustomLoading
        color="#d9b16b"
        height={24}
        width={24}
        className=" flex justify-center items-center h-[50vh]"
      />
    );
  }

  return (
    <>
      {/* <div className="flex justify-end text-sm text-blue-400 hover:underline pb-2">
        <button onClick={() => setReload(!reload)}>Actualizar</button>
      </div> */}
      {preguntasConResultados.length > 0 ? (
        <div className="grid grid-cols-1  gap-3 mb-[150px]" style={{ gridAutoRows: 'minmax(100px, auto)' }}>
          {preguntasConResultados.map((resultado, index) => (
            <div key={index} className="">
                <HistorialCard key={index} user={user} {...resultado} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center border text-gray-400 border-gray-300 rounded-lg p-3 mb-[150px]">
          Aún no has respondido preguntas.
        </div>
      )}
    </>
  );
};
