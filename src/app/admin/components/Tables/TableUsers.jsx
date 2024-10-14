"use client";
import { useState, useEffect } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { PaginationAdmin } from "..";
import { updateUsuario } from '@/actions';
import { CustomToggle } from "@/components";
import toast from 'react-hot-toast';

export const TableUsers = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    filterAndSearchUsers();
  }, [searchTerm, planFilter, currentPage, users]);

  const filterAndSearchUsers = () => {
    let updatedUsers = users;

    if (planFilter === "free") {
      updatedUsers = updatedUsers.filter((user) => user.role === "Visitante");
    } else if (planFilter === "premium") {
      updatedUsers = updatedUsers.filter((user) => user.role === "Suscriptor");
    }

    if (searchTerm) {
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = updatedUsers.slice(indexOfFirstUser, indexOfLastUser);

    setFilteredUsers(currentUsers);
  };

  const totalPages = Math.ceil(users.length / usersPerPage);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleApprovalToggle = async (userId, currentApprovalState) => {
    try {
      const result = await updateUsuario(userId, { isUserApproved: !currentApprovalState });
      if (result.success) {
        setUsers(users.map(user => 
          user.id_user === userId 
            ? { ...user, isUserApproved: !currentApprovalState }
            : user
        ));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error al actualizar el estado de aprobación:', error);
      toast.error('Ocurrió un error al actualizar el estado de aprobación');
    }
  };

  return (
    <div className="">
      {/* Buscador */}
      <div className="relative mb-3">
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
                <th className="border border-gray-300 px-4 py-2 text-left">Aprobado</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id_user} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{user.id_user}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.apellido}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role === "Visitante" ? "Free" : user.role === "Administrador" ? "Admin" : "Premium"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <CustomToggle
                      isChecked={user.isUserApproved}
                      onChange={() => handleApprovalToggle(user.id_user, user.isUserApproved)}
                    />
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