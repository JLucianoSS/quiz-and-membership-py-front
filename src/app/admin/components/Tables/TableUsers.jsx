"use client";
import { useState, useEffect } from "react";
import { updateUsuario } from '@/actions';
import { CustomLoading, CustomToggle } from "@/components";
import { PaginationAdmin, SearchInputAdmin } from "..";
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 10;

/** Componente de tabla para mostrar y gestionar usuarios */
export const TableUsers = ({ users: initialUsers }) => {
  // Estado para loading
  const [loading, setLoading] = useState(true);
  
  // Estados para datos
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  
  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Efecto para inicialización
  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
      setLoading(false);
    }
  }, [initialUsers]);

  // Efecto para filtrado y búsqueda
  useEffect(() => {
    filterAndSearchUsers();
  }, [searchTerm, planFilter, users]);

  // Efecto para resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, planFilter]);

  /**
   * Filtra y busca usuarios basado en los criterios seleccionados
   */
  const filterAndSearchUsers = () => {
    let updatedUsers = [...users];

    // Filtro por plan
    if (planFilter === "free") {
      updatedUsers = updatedUsers.filter((user) => user.role === "Visitante");
    } else if (planFilter === "premium") {
      updatedUsers = updatedUsers.filter((user) => user.role === "Suscriptor");
    }

    // Búsqueda por texto
    if (searchTerm) {
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por ID de mayor a menor
    updatedUsers.sort((a, b) => b.id_user - a.id_user);
    setFilteredUsers(updatedUsers);
  };

  // Cálculos para paginación
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  /**
   * Maneja el cambio de estado de aprobación de un usuario
   */
  const handleApprovalToggle = async (userId, currentApprovalState) => {
    try {
      const result = await updateUsuario(userId, { is_approved: !currentApprovalState });
      if (result.success) {
        setUsers(users.map(user => 
          user.id_user === userId 
            ? { ...user, is_approved: !currentApprovalState }
            : user
        ));
        toast.success("Usuario actualizado");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error al actualizar el estado de aprobación:', error);
      toast.error('Ocurrió un error al actualizar el estado de aprobación');
    }
  };

  if (loading) {
    return <CustomLoading className="h-[200px]" height={28} width={28}/>;
  }

  return (
    <div className="">
      <div className="mb-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        {/* Buscador */}
        <SearchInputAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar por nombre, apellido o correo"
          onClear={clearSearch}
        />

        {/* Filtro por plan */}
        <div className="md:w-1/4">
          <select
            className="border p-2 rounded-md w-full"
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
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
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
                      isChecked={user.is_approved}
                      onChange={() => handleApprovalToggle(user.id_user, user.is_approved)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No se encontraron usuarios con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredUsers.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
          itemName="usuarios"
        />
      )}
    </div>
  );
};