"use client";
import { useState, useEffect } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { PaginationAdmin } from "..";
import moment from "moment";

export const TableSubscriptions = ({ subscriptions }) => {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState(subscriptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "" = Todos, "active" = Activa, "inactive" = Inactiva
  const [typeFilter, setTypeFilter] = useState(""); // "" = Todos, "monthly" = Mensual, "annual" = Anual
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionsPerPage] = useState(10); // Puedes cambiar este valor para mostrar más o menos por página

  useEffect(() => {
    filterAndSearchSubscriptions();
  }, [searchTerm, statusFilter, typeFilter, currentPage]);

  const filterAndSearchSubscriptions = () => {
    let updatedSubscriptions = subscriptions;

    // Filtro por estado
    if (statusFilter === "active") {
      updatedSubscriptions = updatedSubscriptions.filter((sub) => sub.estado === "activa");
    } else if (statusFilter === "inactive") {
      updatedSubscriptions = updatedSubscriptions.filter((sub) => sub.estado === "inactiva");
    }

    // Filtro por tipo de suscripción
    if (typeFilter === "monthly") {
      updatedSubscriptions = updatedSubscriptions.filter((sub) => sub.tipo === "Mensual");
    } else if (typeFilter === "annual") {
      updatedSubscriptions = updatedSubscriptions.filter((sub) => sub.tipo === "Anual");
    }

    // Filtro por término de búsqueda (usuario)
    if (searchTerm) {
      updatedSubscriptions = updatedSubscriptions.filter(
        (sub) =>
          sub.usuario.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Paginación
    const indexOfLastSubscription = currentPage * subscriptionsPerPage;
    const indexOfFirstSubscription = indexOfLastSubscription - subscriptionsPerPage;
    const currentSubscriptions = updatedSubscriptions.slice(indexOfFirstSubscription, indexOfLastSubscription);

    setFilteredSubscriptions(currentSubscriptions);
  };

  // Obtener el número total de páginas
  const totalPages = Math.ceil(subscriptions.length / subscriptionsPerPage);

  // Limpiar el término de búsqueda
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="">
      {/* Buscador */}
      <div className="relative mb-3">
        {/* Icono de búsqueda (lupa) */}
        <span className="absolute left-2 top-2 text-gray-500">
          <IoSearch size={24} />
        </span>

        <input
          type="text"
          placeholder="Buscar por usuario"
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

      {/* Filtros */}
      <div className="mb-4 flex justify-between">
        <div>
          <select
            className="border p-2 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="active">Activa</option>
            <option value="inactive">Inactiva</option>
          </select>
        </div>
        <div>
          <select
            className="border p-2 rounded-md"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="monthly">Mensual</option>
            <option value="annual">Anual</option>
          </select>
        </div>
      </div>

      {/* Tabla de suscripciones */}
      {filteredSubscriptions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Usuario</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Inicio</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Fin</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Método de Pago</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="border border-gray-300 px-4 py-2">{sub.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{sub.usuario}</td>
                  <td className="border border-gray-300 px-4 py-2">{moment(sub.inicio).format("DD/MM/YYYY")}</td>
                  <td className="border border-gray-300 px-4 py-2">{moment(sub.fin).format("DD/MM/YYYY")}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {sub.estado === "activa" ? "Activa" : "Inactiva"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{sub.tipo}</td>
                  <td className="border border-gray-300 px-4 py-2">{sub.metodoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron suscripciones con los criterios seleccionados.
        </p>
      )}

      {/* Paginación */}
      {filteredSubscriptions.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
