"use client"
import { useState, useEffect } from "react";
import { updateUsuario } from '@/actions';
import { CustomLoading, CustomToggle } from "@/components";
import { PaginationAdmin, SearchInputAdmin } from "..";
import toast from 'react-hot-toast';
import { FaPowerOff } from "react-icons/fa"; // Ícono para cerrar sesión

const ITEMS_PER_PAGE = 10;

export const TableUsers = ({ users: initialUsers }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
      setLoading(false);
    }
  }, [initialUsers]);

  useEffect(() => {
    filterAndSearchUsers();
  }, [searchTerm, approvalFilter, users]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, approvalFilter]);

  const getCurrentPlan = (user) => {
    if (!user.pagos || user.pagos.length === 0) return "Sin plan activo";
    
    const currentDate = new Date();
    const activePlan = user.pagos.find(pago => 
      new Date(pago.plan.fecha_fin) > currentDate
    );

    return activePlan ? activePlan.plan.nombre : "Sin plan activo";
  };

  const filterAndSearchUsers = () => {
    let updatedUsers = [...users];

    // Filtro por aprobación
    if (approvalFilter === "approved") {
      updatedUsers = updatedUsers.filter((user) => user.is_approved === true);
    } else if (approvalFilter === "not_approved") {
      updatedUsers = updatedUsers.filter((user) => !user.is_approved);
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

    updatedUsers.sort((a, b) => b.id_user - a.id_user);
    setFilteredUsers(updatedUsers);
  };

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

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

  const handleCloseSession = async (userId) => {
    const confirmClose = window.confirm("¿Estás seguro de que deseas cerrar la sesión de este usuario?");
    if (confirmClose) {
      try {
        const result = await updateUsuario(userId, { is_user_active: false });
        if (result.success) {
          setUsers(users.map(user => 
            user.id_user === userId 
              ? { ...user, is_user_active: false }
              : user
          ));
          toast.success("Sesión cerrada exitosamente");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error al cerrar la sesión:', error);
        toast.error('Ocurrió un error al cerrar la sesión');
      }
    }
  };

  if (loading) {
    return <CustomLoading className="h-[200px]" height={28} width={28}/>;
  }

  return (
    <div className="">
      <div className="mb-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <SearchInputAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar por nombre, apellido o correo"
          onClear={clearSearch}
        />

        <div className="md:w-1/4">
          <select
            className="border p-2 rounded-md w-full"
            value={approvalFilter}
            onChange={(e) => setApprovalFilter(e.target.value)}
          >
            <option value="">Todos los usuarios</option>
            <option value="approved">Aprobados</option>
            <option value="not_approved">Registrados</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Apellido</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Correo</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Plan Activo</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Aprobado</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Sesión Activa</th>
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
                    {getCurrentPlan(user)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <CustomToggle
                      isChecked={user.is_approved}
                      onChange={() => handleApprovalToggle(user.id_user, user.is_approved)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-2">
                      {user.is_user_active ? (
                        <>
                          <span className="text-green-500">Activa</span>
                          <button
                            onClick={() => handleCloseSession(user.id_user)}
                            className="text-green-500 hover:text-green-700"
                            title="Cerrar sesión"
                          >
                            <FaPowerOff />
                          </button>
                        </>
                      ) : (
                        <span className="text-red-500">Inactiva</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No se encontraron usuarios con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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