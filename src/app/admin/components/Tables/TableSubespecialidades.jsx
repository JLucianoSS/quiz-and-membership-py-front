"use client";
import { useRouter } from "next/navigation";

export const TableSubespecialidades = ({ subespecialidades, especialidades }) => {
  const router = useRouter();

  // Función para navegar cuando se clickea una fila
  const handleRowClick = (id) => {
    router.push(`/subespecialidades/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {subespecialidades.map((subespecialidad) => {
            const especialidad = especialidades.find(
              (esp) => esp.id === subespecialidad.especialidadId
            );
            return (
              <tr
                key={subespecialidad.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(subespecialidad.id)}
              >
                <td className="border border-gray-300 px-4 py-2">{subespecialidad.id}</td>
                <td className="border border-gray-300 px-4 py-2">{subespecialidad.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{especialidad ? especialidad.nombre : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
