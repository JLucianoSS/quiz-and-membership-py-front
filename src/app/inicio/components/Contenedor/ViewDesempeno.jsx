"use client";

import { useState } from "react";
import { PercentageGauge } from "../Charts/PercentageGauge";

export const ViewDesempeno = () => {
  const [selectedFilter, setSelectedFilter] = useState("día");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <>
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

      <PercentageGauge/>

    </>
  );
};
