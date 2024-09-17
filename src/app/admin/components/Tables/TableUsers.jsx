"use client";
import { useState, useEffect } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { PaginationAdmin } from "..";

export const TableUsers = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState(""); // "" = Todos, "free" = Plan Free, "premium" = Plan Premium
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Puedes cambiar este valor para mostrar más o menos usuarios por página

  useEffect(() => {
    filterAndSearchUsers();
  }, [searchTerm, planFilter, currentPage]);

  const filterAndSearchUsers = () => {
    let updatedUsers = users;

    // Filtro por plan
    if (planFilter === "free") {
      updatedUsers = updatedUsers.filter((user) => user.role === "Visitante");
    } else if (planFilter === "premium") {
      updatedUsers = updatedUsers.filter((user) => user.role === "Suscriptor");
    }

    // Filtro por término de búsqueda
    if (searchTerm) {
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = updatedUsers.slice(indexOfFirstUser, indexOfLastUser);

    setFilteredUsers(currentUsers);
  };

  // Obtener el número total de páginas
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Limpiar el término de búsqueda
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="">
      {/* Buscador */}
      <div className="relative mb-3">
        {/* Icono de búsqueda (lupa) */}
        <span className="absolute left-2 top-2 text-gray-400">
          <IoSearch size={22} />
        </span>

        <input
          type="text"
          placeholder="Buscar por nombre, apellido o correo"
          className="border p-2 rounded-md w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-2 text-gray-500"
          >
            <IoClose size={24} />
          </button>
        )}
      </div>

      {/* Filtro por plan */}
      <div className="mb-4 flex justify-between">
        <div>
          <select
            className="border p-2 rounded-md"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="">Todos los planes</option>
            <option value="free">Plan Free</option>
            <option value="premium">Plan Premium</option>
          </select>
        </div>
      </div>

      {/* Tabla de usuarios */}
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Apellido</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Correo</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Plan</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.apellido}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role === "Visitante" ? "Free" : "Premium"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron usuarios con los criterios seleccionados.
        </p>
      )}

      {/* Paginación */}
      {filteredUsers.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
