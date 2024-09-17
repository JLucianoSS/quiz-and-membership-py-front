"use client";
import { useState, useEffect } from "react";
import { PaginationAdmin } from "../ui/PaginationAdmin";
import { IoClose, IoSearch } from "react-icons/io5";
import moment from "moment";

export const TablePayments = ({ payments }) => {
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "" = Todos, "completed" = Completado, "pending" = Pendiente, "failed" = Fallido
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10); // Cantidad de pagos por página

  useEffect(() => {
    filterAndSearchPayments();
  }, [searchTerm, statusFilter, currentPage]);

  const filterAndSearchPayments = () => {
    let updatedPayments = payments;

    // Filtro por estado del pago
    if (statusFilter === "completed") {
      updatedPayments = updatedPayments.filter((pay) => pay.estado === "completado");
    } else if (statusFilter === "pending") {
      updatedPayments = updatedPayments.filter((pay) => pay.estado === "pendiente");
    } else if (statusFilter === "failed") {
      updatedPayments = updatedPayments.filter((pay) => pay.estado === "fallido");
    }

    // Filtro por término de búsqueda (ID de la suscripción o monto)
    if (searchTerm) {
      updatedPayments = updatedPayments.filter(
        (pay) =>
          pay.subscriptionId.toString().includes(searchTerm) ||
          pay.monto.toString().includes(searchTerm)
      );
    }

    // Paginación
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = updatedPayments.slice(indexOfFirstPayment, indexOfLastPayment);

    setFilteredPayments(currentPayments);
  };

  // Obtener el número total de páginas
  const totalPages = Math.ceil(payments.length / paymentsPerPage);

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
          placeholder="Buscar por ID de suscripción o monto"
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

      {/* Filtro por estado */}
      <div className="mb-4 flex justify-between">
        <div>
          <select
            className="border p-2 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="completed">Completado</option>
            <option value="pending">Pendiente</option>
            <option value="failed">Fallido</option>
          </select>
        </div>
      </div>

      {/* Tabla de pagos */}
      {filteredPayments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">ID Suscripción</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Monto</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Fecha de Pago</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="border border-gray-300 px-4 py-2">{pay.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{pay.subscriptionId}</td>
                  <td className="border border-gray-300 px-4 py-2">${pay.monto}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {moment(pay.fechaPago).format("DD/MM/YYYY")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {pay.estado === "completado" ? "Completado" : pay.estado === "pendiente" ? "Pendiente" : "Fallido"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron pagos con los criterios seleccionados.
        </p>
      )}

      {/* Paginación */}
      {filteredPayments.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
