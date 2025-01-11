"use client";
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { Offcanvas2 } from "@/components";
import { PaginationAdmin, SearchInputAdmin, TableActionsAdmin } from "..";
import { extractDescriptionWithoutFeatures, extractFeaturesFromDescription } from "@/utils/extractDescription";
import { FormAddPlans } from "../Forms/FormAddPlans";
import { deletePlan, getPlanes } from "@/actions";
import { FaBolt } from "react-icons/fa";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import dayjs from "dayjs";

export const TablePlans = ({ user }) => {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentView, setCurrentView] = useState("table");
  const [planFilter, setPlanFilter] = useState("all");
  const { refreshTable, toggleRefreshTable } = useRedrawStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        const respPlan = await getPlanes();
        setPlans(respPlan.data.sort((a, b) => b.id_Plan - a.id_Plan));
      } catch (error) {
        console.log("Error al traer los planes: ", error);
      }
    };
    fetch();
  }, [refreshTable]);

  const handleOpenOffcanvas = (plan = null) => {
    setSelectedPlan(plan);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedPlan(null);
  };

  const handleDeletePlan = async (id) => {
    try {
      const respDeletePlan = await deletePlan(id);
      if (respDeletePlan.success) {
        toast.success("Plan eliminado con éxito");
        toggleRefreshTable();
      } else {
        toast.error("Error al eliminar el plan");
        console.log(respDeletePlan.message);
      }
    } catch (error) {
      toast.error("Error al eliminar el plan");
    }
  };

  const filteredPlans = plans.filter((plan) =>
    plan.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (planFilter === "all" || plan.tipo_plan === planFilter)
  );

  const ITEMS_PER_PAGE = 10;
  const totalItems = filteredPlans.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentPlans = filteredPlans.slice(startIndex, endIndex);

  const EmptyState = () => (
    <div className="text-center py-12 px-4">
      <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
        <IoAddCircle size={40} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No hay planes disponibles</h3>
      <p className="text-gray-500 mb-4">
        {searchTerm
          ? "No se encontraron planes que coincidan con tu búsqueda"
          : "Comienza agregando tu primer plan"}
      </p>
      <button
        onClick={() => handleOpenOffcanvas()}
        className="inline-flex items-center text-sm gap-2 text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90"
      >
        <IoAddCircle size={20} />
        <span>Agregar Plan</span>
      </button>
    </div>
  );

  const renderTable = () => {
    if (currentPlans.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Finaliza</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((plan) => (
              <tr key={plan.id_Plan} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{plan.id_Plan}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.tipo_plan}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.precio} PYG</td>
                <td className="border border-gray-300 px-4 py-2">{dayjs(plan.fecha_fin).format("DD/MM/YYYY")}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <TableActionsAdmin
                    id={plan.id_Plan}
                    onEdit={() => handleOpenOffcanvas(plan)}
                    onDelete={() => handleDeletePlan(plan.id_Plan)}
                    itemName="el plan"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderGrid = () => {
    if (currentPlans.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {currentPlans.map((plan) => (
          <div key={plan.id_Plan} className="border rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="flex items-center gap-2 text-2xl font-bold">
                {plan.nombre} {plan.tipo_plan === "Intensivo" ? <FaBolt /> : ""}
              </h3>
              {plan.precio === 0 ? (
                <span className="text-xl font-semibold text-green-600">Gratis</span>
              ) : (
                <span className="text-xl font-semibold">{plan.precio} PYG</span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{extractDescriptionWithoutFeatures(plan.descripcion)}</p>
            <ul className="space-y-2">
              {extractFeaturesFromDescription(plan.descripcion).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleOpenOffcanvas(plan)}
              className="w-full mt-6 px-4 py-2 rounded-md border border-primary text-primary hover:bg-gray-50"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="mb-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <SearchInputAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar plan"
          onClear={() => setSearchTerm("")}
        />

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView("table")}
            className={`px-4 py-2 rounded-md ${
              currentView === "table" ? "bg-primary text-white" : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Vista Tabla
          </button>
          <button
            onClick={() => setCurrentView("grid")}
            className={`px-4 py-2 rounded-md ${
              currentView === "grid" ? "bg-primary text-white" : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Vista Grid
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPlanFilter("all")}
            className={`px-4 py-2 rounded-md ${
              planFilter === "all" ? "bg-primary text-white" : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setPlanFilter("Basico")}
            className={`px-4 py-2 rounded-md ${
              planFilter === "Basico" ? "bg-primary text-white" : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Básico
          </button>
          <button
            onClick={() => setPlanFilter("Intensivo")}
            className={`px-4 py-2 rounded-md ${
              planFilter === "Intensivo" ? "bg-primary text-white" : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Intensivo
          </button>
        </div>

        <div className="flex justify-start items-center">
          <button
            className="flex items-center text-sm gap-1 text-white bg-primary px-2 py-1 rounded-md hover:bg-primary/90"
            onClick={() => handleOpenOffcanvas()}
          >
            <IoAddCircle size={24} />
            <span>Agregar Plan</span>
          </button>
        </div>
      </div>

      {currentView === "table" ? renderTable() : renderGrid()}

      {filteredPlans.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
          itemName="planes"
        />
      )}

      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title={selectedPlan ? "Editar Plan" : "Añadir Nuevo Plan"}
      >
        <FormAddPlans
          plan={selectedPlan}
          onClose={handleCloseOffcanvas}
          user={user}
        />
      </Offcanvas2>
    </div>
  );
};
