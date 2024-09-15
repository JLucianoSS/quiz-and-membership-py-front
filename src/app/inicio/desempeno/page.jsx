 

 "use client";
import { Headerpage } from "@/components";
import { useState } from "react";

export default function DesempenoPage() {
  const [selectedFilter, setSelectedFilter] = useState("día");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="px-6 lg:px-20 xl:px-44">

      <Headerpage titulo="Desempeño"/>

      {/* Cabecera de filtros */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-2">
          <button
            onClick={() => handleFilterChange("día")}
            className={`py-2 px-4 rounded-lg ${
              selectedFilter === "día"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Día
          </button>
          <button
            onClick={() => handleFilterChange("semana")}
            className={`py-2 px-4 rounded-lg ${
              selectedFilter === "semana"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => handleFilterChange("mes")}
            className={`py-2 px-4 rounded-lg ${
              selectedFilter === "mes"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Mes
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">


        {/* Mi porcentaje de respuestas correctas */}
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Tú</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Desempeño</h3>
          <p className="text-4xl font-bold text-green-600">85%</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Usuarios</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Desempeño</h3>
          <p className="text-4xl font-bold text-blue-600">72%</p>
        </div>


        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Tú</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Aciertos</h3>
          <p className="text-4xl font-bold text-green-600">45</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Usuarios</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Aciertos</h3>
          <p className="text-4xl font-bold text-blue-600">120</p>
        </div>



        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Tú</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Falladas</h3>
          <p className="text-4xl font-bold text-red-600">5</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Usuarios</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Falladas</h3>
          <p className="text-4xl font-bold text-red-600">25</p>
        </div>


      </div>

      {/* Botón de desempeño avanzado */}
      <div className="flex justify-center mt-6 mb-10">
        <button className="bg-primary text-white py-2 px-6 rounded-lg">
          Mostrar desempeño avanzado
        </button>
      </div>
    </div>
  );
}
