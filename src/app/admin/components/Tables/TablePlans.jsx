
"use client"
import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { Offcanvas2 } from "@/components";
import { PaginationAdmin, SearchInputAdmin, TableActionsAdmin } from "..";
import { FormAddPlans } from "../Forms/FormAddPlans";


// Mock data for plans
const mockPlans = [
  {
    id: 1,
    name: "Plan Básico",
    type: "basic",
    price: 0,
    description: "Acceso desde el 1 de febrero hasta el día del primer examen parcial.",
    features: [
      "Banco completo de preguntas",
      "simulacros interactivos",
      "Material específico para el 1er Parcial"
    ],
    status: "active"
  },
  {
    id: 2,
    name: "Plan Premium",
    type: "premium",
    price: 99.99,
    description: "Ideal para profesionales que buscan más control y herramientas avanzadas.",
    features: [
      "Acceso a todo el contenido premium",
      "Preguntas ilimitadas",
      "Soporte prioritario 24/7",
      "Guarda tus preguntas favoritas"
    ],
    status: "active"
  }
];

export const TablePlans = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentView, setCurrentView] = useState("table");

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
      // TODO: Implement API call
      // await deletePlan(id);
      setPlans(plans.filter(plan => plan.id !== id));
      toast.success("Plan eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar el plan");
    }
  };

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalItems = filteredPlans.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentPlans = filteredPlans.slice(startIndex, endIndex);

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPlans.map((plan) => (
            <tr key={plan.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{plan.id}</td>
              <td className="border border-gray-300 px-4 py-2">{plan.name}</td>
              <td className="border border-gray-300 px-4 py-2">{plan.type}</td>
              <td className="border border-gray-300 px-4 py-2">${plan.price}</td>
              <td className="border border-gray-300 px-4 py-2">{plan.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <TableActionsAdmin
                  id={plan.id}
                  onEdit={() => handleOpenOffcanvas(plan)}
                  onDelete={handleDeletePlan}
                  itemName="el plan"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {currentPlans.map((plan) => (
        <div key={plan.id} className="border rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">
              {plan.name} {plan.type === "premium" ? "👑" : "⭐"}
            </h3>
            {plan.price === 0 ? (
              <span className="text-xl font-semibold text-green-600">Gratis</span>
            ) : (
              <span className="text-xl font-semibold">${plan.price}/mes</span>
            )}
          </div>
          <p className="text-gray-600 mb-4">{plan.description}</p>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <button 
            className={`w-full mt-6 px-4 py-2 rounded-md ${
              plan.type === "premium" 
                ? "bg-primary text-white hover:bg-primary/90" 
                : "border border-primary text-primary hover:bg-gray-50"
            }`}
          >
            {plan.type === "premium" ? "Contratar Premium" : "Empezar gratis"}
          </button>
        </div>
      ))}
    </div>
  );

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
              currentView === "table"
                ? "bg-primary text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Vista Tabla
          </button>
          <button
            onClick={() => setCurrentView("grid")}
            className={`px-4 py-2 rounded-md ${
              currentView === "grid"
                ? "bg-primary text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Vista Grid
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
        />
      </Offcanvas2>
    </div>
  );
}
