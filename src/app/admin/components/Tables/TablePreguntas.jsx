"use client";
import { useRouter } from "next/navigation";

export const TablePreguntas = ({ preguntas, temas }) => {
  const router = useRouter();

  // Función para navegar cuando se clickea una fila
  const handleRowClick = (id) => {
    router.push(`/preguntas/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Pregunta</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Subtema</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Año</th>
          </tr>
        </thead>
        <tbody>
          {preguntas.map((pregunta) => {
            const tema = temas.find((t) => t.id === pregunta.temaId);
            return (
              <tr
                key={pregunta.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(pregunta.id)}
              >
                <td className="border border-gray-300 px-4 py-2">{pregunta.id}</td>
                <td className="border border-gray-300 px-4 py-2">{pregunta.pregunta}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {tema ? tema.nombre : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{pregunta.año}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
