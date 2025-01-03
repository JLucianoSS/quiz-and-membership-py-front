"use client";
import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Importa los estilos por defecto

export const FilterByYear = ({ onYearSelect }) => {
  const [selectedYear, setSelectedYear] = useState(2024); // Estado para manejar el año seleccionado

  const sliderStyle = {
    trackStyle: { backgroundColor: '#d9b16b', height: 8 },
    handleStyle: {
      borderColor: '#d9b16b',
      backgroundColor: '#d9b16b',
      height: 20,
      width: 20,
      marginTop: -6,
      outline: 'none',
      boxShadow: 'none',
    },
    railStyle: { backgroundColor: '#ddd', height: 8 },
  };

  const handleYearChange = (value) => {
    setSelectedYear(value); // Actualiza el año seleccionado en el estado
    onYearSelect(value); // Llama a la función pasada por props para actualizar el estado en ViewFilters
  };

  // Llama a onYearSelect con el año inicial cuando el componente se monta
  useEffect(() => {
    onYearSelect(selectedYear);
  }, [selectedYear, onYearSelect]);

  return (
    <div className="mt-4 max-w-md">
      <h2 className="text-lg font-semibold text-gray-700">Año</h2>
      <div className="flex justify-between text-sm text-gray-600">
        <span>2009</span>
        <span>{new Date().getFullYear()}</span>
      </div>
      <div className="relative">
        <Slider
          min={2009}
          max={new Date().getFullYear()}
          value={selectedYear} // Usa el valor del estado seleccionado
          onChange={handleYearChange} // Actualiza el estado cuando el usuario mueve el slider
          trackStyle={sliderStyle.trackStyle}
          handleStyle={sliderStyle.handleStyle}
          railStyle={sliderStyle.railStyle}
        />
        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-800">
          {selectedYear} {/* Muestra el año seleccionado */}
        </div>
      </div>
    </div>
  );
};
