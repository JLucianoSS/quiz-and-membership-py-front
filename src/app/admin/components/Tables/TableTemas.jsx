
"use client";
import { useRouter } from "next/navigation";

export const TableTemas = ({ temas, subespecialidades }) => {
  const router = useRouter();

  // Función para navegar cuando se clickea una fila
  const handleRowClick = (id) => {
    router.push(`/temas/${id}`);
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
          {temas.map((tema) => {
            const subespecialidad = subespecialidades.find(
              (sub) => sub.id === tema.subespecialidadId
            );
            return (
              <tr
                key={tema.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(tema.id)}
              >
                <td className="border border-gray-300 px-4 py-2">{tema.id}</td>
                <td className="border border-gray-300 px-4 py-2">{tema.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {subespecialidad ? subespecialidad.nombre : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
