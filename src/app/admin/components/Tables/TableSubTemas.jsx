
"use client";
import { useRouter } from "next/navigation";

export const TableSubTemas = ({ subtemas, temas }) => {
  const router = useRouter();

  // Función para navegar cuando se clickea una fila
  const handleRowClick = (id) => {
    router.push(`/subtema/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Tema</th>
          </tr>
        </thead>
        <tbody>
          {subtemas.map((subtema) => {
            const tema = temas.find((tem) => tem.id_Tema === subtema.id_Tema);
            return (
              <tr
                key={subtema.id_Subtema}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(subtema.id_Subtema)}
              >
                <td className="border border-gray-300 px-4 py-2">{subtema.id_Subtema}</td>
                <td className="border border-gray-300 px-4 py-2">{subtema.Subtema}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {tema ? tema.Nombre_Tema : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
