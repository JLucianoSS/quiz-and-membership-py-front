"use client";

import { useState } from "react";
import { FaFilter, FaUnicorn } from "react-icons/fa"
import { PercentageGauge } from "../Charts/PercentageGauge";
import Link from "next/link";

export const ViewDesempeno = () => {
  // const [selectedFilter, setSelectedFilter] = useState("día");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // const handleFilterChange = (filter) => {
  //   setSelectedFilter(filter);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Fecha inicial:', startDate);
    console.log('Fecha final:', endDate);
    // Aquí puedes manejar la lógica de filtrado por fechas
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Alterna el estado para mostrar/ocultar los filtros
  };

  return (
    <div className="pb-10">

      <div className="pb-2">

        {/* Botón para filtrar con el ícono de unicornio */}
        <div className="flex justify-end ">
          <button
            onClick={toggleFilters}
            className=" text-blue-500 font-bold rounded flex items-center text-sm transition duration-300"
          >
             <FaFilter className="mr-2"/> Filtrar
          </button>
        </div>


        {/* INPUTS FILTROS POR FECHA */}
        <div
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
            showFilters ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col items-center justify-center px-1 py-2 sm:py-4 ">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col sm:flex-row sm:gap-4"
            >
              <div className="mb-4 sm:mb-0 sm:w-1/3">
                <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha Inicial:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 sm:mb-0 sm:w-1/3">
                <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha Final:
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-center items-end sm:mb-0 sm:w-1/3">
                <button
                  type="submit"
                  className="bg-primary text-white font-bold py-2 px-4 rounded h-[46px] w-full"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>



      <div className=" flex flex-col gap-2">
        {/* Mi porcentaje de respuestas correctas */}

        <div className="flex gap-2">
          <div className="p-4 flex flex-col justify-start sm:items-center bg-white shadow-sm rounded-lg border border-gray-100 w-[60%]">
            <h2 className="text-xl sm:text-4xl font-semibold text-gray-700 sm:text-center leading-tight pb-2">4 de Octubre del 2024</h2>
            <h3 className="text-sm  text-gray-600 mb-1">Última actualización</h3>
            {/* <p className="text-4xl font-bold text-blue-600">120</p> */}
          </div>
          <div className="p-4 flex flex-col justify-start items-center bg-white shadow-sm rounded-lg border border-gray-100 w-[40%]">
            <h2 className="text-lg font-semibold text-gray-700 text-center leading-tight pb-2">Preguntas resueltas</h2>
            <h3 className="text-sm  text-gray-600 mb-1">En el periodo</h3>
            <p className="text-4xl font-bold text-primary">336</p>
          </div>
        </div>

        

        <div className="flex flex-col gap-2 sm:flex-row ">
          <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100 sm:w-[60%]">
            <h2 className="text-lg font-semibold text-gray-700 text-center pb-2">Mi rendimiento</h2>
            <PercentageGauge/>
          </div>
          
          <div className="flex w-full gap-2 sm:flex-col sm:w-[40%]">
            <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100 w-1/2 sm:w-full">
              <h2 className="text-lg font-semibold text-gray-700">Aciertos</h2>
              <h3 className="text-sm  text-gray-600 mb-1">12/12/2024</h3>
              <p className="text-4xl font-bold text-green-600">45</p>
            </div>
            <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100 w-1/2 sm:w-full">
              <h2 className="text-lg font-semibold text-gray-700">Falladas</h2>
              <h3 className="text-sm  text-gray-600 mb-1">12/12/2024</h3>
              <p className="text-4xl font-bold text-red-600">5</p>
            </div>
          </div>
        </div>


        <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Últimas preguntas respondidas</h2>
          <div className="w-full overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2">FECHA</th>
                  <th className="px-4 py-2">PREGUNTAS</th>
                  <th className="px-4 py-2">ACIERTOS (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-2">27 set, 2024</td>
                  <td className="px-4 py-2">8</td>
                  <td className="px-4 py-2">62.5%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2">28 set, 2024</td>
                  <td className="px-4 py-2">70</td>
                  <td className="px-4 py-2">68.57%</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2">29 set, 2024</td>
                  <td className="px-4 py-2">96</td>
                  <td className="px-4 py-2">68.75%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2">30 set, 2024</td>
                  <td className="px-4 py-2">42</td>
                  <td className="px-4 py-2">64.29%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link href="inicio/historial" className="text-blue-500 hover:underline text-sm pt-4">Ver todo</Link> 
        </div>
      </div>

    </div>
  );
};

