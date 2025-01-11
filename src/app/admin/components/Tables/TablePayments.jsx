"use client";
import { useState, useEffect } from "react";
import { PaginationAdmin } from "../ui/PaginationAdmin";
import { IoClose, IoSearch } from "react-icons/io5";
import { getPagos, updatePago } from "@/actions";
import moment from "moment";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import toast from "react-hot-toast";
import { CustomLoading } from "@/components";

export const TablePayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "" = Todos, "completed" = Completado, "pending" = Pendiente, "failed" = Fallido
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10); // Cantidad de pagos por página
  const { refreshTable, toggleRefreshTable } = useRedrawStore();
  const [loading, setLoading] = useState(true); // Asegúrate de que el estado de loading sea true inicialmente.

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true); // Inicia el loading
      try {
        const fetchedPayments = await getPagos();
        setPayments(fetchedPayments.data.sort((a, b) => b.id_Pago - a.id_Pago));
        setFilteredPayments(fetchedPayments.data.sort((a, b) => b.id_Pago - a.id_Pago)); // Asegúrate de setear correctamente los pagos.
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Termina el loading una vez se haya completado el fetch
      }
    };
    fetchPayments();
  }, [refreshTable]);

  useEffect(() => {
    filterAndSearchPayments();
  }, [searchTerm, statusFilter, currentPage, payments]);

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
          pay.id_Pago.toString().includes(searchTerm) ||
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
  const totalItems = payments.length;
  const startIndex = (currentPage - 1) * paymentsPerPage;
  const endIndex = Math.min(startIndex + paymentsPerPage, totalItems);

  // Limpiar el término de búsqueda
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Cambiar el estado del pago
  const handleUpdateStatus = async(idPago, newStatus) => {
    try {
      const respUpdatePago = await updatePago(idPago, {estado: newStatus});
      if (respUpdatePago.success) {
        toast.success("Se ha actualizado el pago");
        toggleRefreshTable();
      } else {
        console.log("Error al actualizar el pago: ", respUpdatePago.message);
      }
    } catch (error) {
      console.log("Error al actualizar el pago: ", error);
    }
  };

  if (loading) {
    return <CustomLoading className="h-[200px]" color="#d9b16b" height={28} width={28}/>;
  }

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row items-center sm:gap-4 mb-4">
        {/* Buscador */}
        <div className="relative flex w-full">
          <span className="absolute left-2 top-2 text-gray-500">
            <IoSearch size={24} />
          </span>
          <input
            type="text"
            placeholder="Buscar por ID de pago o monto"
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
        <div className="flex justify-between">
          <div>
            <select
              className="border p-2 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="completed">Completado</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de pagos */}
      {filteredPayments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Monto</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Usuario</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Plan</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Creado el</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Método de Pago</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay) => (
                <tr key={pay.id_Pago} className="hover:bg-gray-50 cursor-pointer">
                  <td className="border border-gray-300 px-4 py-2">{pay.id_Pago}</td>
                  <td className="border border-gray-300 px-4 py-2">${pay.monto}</td>
                  <td className="border border-gray-300 px-4 py-2">{pay.usuario.nombre} {pay.usuario.apellido}</td>
                  <td className="border border-gray-300 px-4 py-2">{pay.plan.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {moment(pay.fecha_pago).format("DD/MM/YYYY")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{pay.metodo_pago}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={pay.estado}
                      onChange={(e) => handleUpdateStatus(pay.id_Pago, e.target.value)}
                      className="border p-2 rounded-md"
                    >
                      <option value="completado">Completado</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="fallido">Fallido</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {pay.comprobante ? (
                      <a
                        href={pay.comprobante} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500"
                      >
                        Ver comprobante
                      </a>
                    ) : (
                      <span>Comprobante no subido</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500 mt-4">
            No se encontraron pagos con los criterios seleccionados.
          </p>
        )
      )}

      {/* Paginación */}
      {filteredPayments.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
