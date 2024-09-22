"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const TableModulos = ({ modulos }) => {
  const router = useRouter();

  // Función para navegar cuando se clickea una fila
  const handleRowClick = (id) => {
    router.push(`/modulos/${id}`); // Navegar a la ruta deseada, puedes personalizar la URL
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
          {modulos.map((modulo) => (
            <tr
              key={modulo.id_Modulo}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(modulo.id_Modulo)}
            >
              <td className="border border-gray-300 px-4 py-2">{modulo.id_Modulo}</td>
              <td className="border border-gray-300 px-4 py-2">{modulo.nombre_modulo}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="h-16 w-16">
                  <Image
                    className="h-full w-full object-cover"
                    src={modulo.imagen}
                    alt={modulo.nombre_modulo}
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
