
"use client"
import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Importa los estilos por defecto

export const FilterByYear = ({ preguntas }) => {
  const sliderStyle = {
    trackStyle: { backgroundColor: '#d9b16b', height: 8 }, // Color de la pista
    handleStyle: {
      borderColor: '#d9b16b', // Borde del "pulgar"
      backgroundColor: '#d9b16b', // Color del "pulgar"
      height: 20,
      width: 20,
      marginTop: -6, // Ajustar posición vertical del "pulgar"
      outline: 'none', // Eliminar el focus outline
      boxShadow: 'none', // Eliminar cualquier sombra en el focus
    },
    railStyle: { backgroundColor: '#ddd', height: 8 }, // Color de la pista antes del control
  };

  return (
    <div className="mt-4 max-w-md">
      <h2 className="text-lg font-semibold text-gray-700">Año</h2>
      <div className="flex justify-between text-sm text-gray-600">
        <span>2009</span>
        <span>2021</span>
      </div>
      <Slider
        min={2009}
        max={2021}
        defaultValue={2015}
        trackStyle={sliderStyle.trackStyle}
        handleStyle={sliderStyle.handleStyle}
        railStyle={sliderStyle.railStyle}
      />
    </div>
  );
};
