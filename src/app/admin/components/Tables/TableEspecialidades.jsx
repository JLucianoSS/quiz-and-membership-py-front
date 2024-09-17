"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const TableEspecialidades = ({ especialidades }) => {
  const router = useRouter();

  // Función para navegar cuando se clickea una fila
  const handleRowClick = (id) => {
    router.push(`/especialidades/${id}`); // Navegar a la ruta deseada, puedes personalizar la URL
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad) => (
            <tr
              key={especialidad.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(especialidad.id)}
            >
              <td className="border border-gray-300 px-4 py-2">{especialidad.id}</td>
              <td className="border border-gray-300 px-4 py-2">{especialidad.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="h-16 w-16">
                  <Image
                    className="h-full w-full object-cover"
                    src={especialidad.imagen}
                    alt={especialidad.nombre}
                    width={300}
                    height={300}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
