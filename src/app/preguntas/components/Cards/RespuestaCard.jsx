"use client";
import { useState } from "react";

export const RespuestaCard = ({ letter, answer, isCorrect, onClick, isSelected, showCorrect, disableClicks }) => {
  const [isStriked, setIsStriked] = useState(false);

  // Determinar los estilos según si la opción ha sido seleccionada o si debe mostrar la correcta
  const containerStyles = () => {
    if (isSelected && isCorrect) {
      return "border-green-500 bg-green-100";
    } else if (isSelected && !isCorrect) {
      return "border-red-500 bg-red-100";
    } else if (showCorrect) {
      return "border-green-500 bg-green-100"; // Mostrar la correcta si se seleccionó otra
    }
    return "border-gray-300 bg-white"; // Estilos neutros
  };

  return (
    <div className={`flex items-center gap-2 cursor-pointer ${disableClicks ? 'pointer-events-none' : ''}`} onClick={onClick}>
      <div className={`flex items-center gap-8 border rounded-md py-2 px-3 w-[90%] ${containerStyles()}`}>
        <div className="w-[10%] max-w-[40px] h-full">
          <div className="bg-gray-100 p-2 rounded-full border w-10 h-10 flex justify-center items-center">
            <span className="text-sm text-gray-500">{letter}</span>
          </div>
        </div>

        <div className="w-[90%]">
          <p className={`text-[13px] text-gray-500 w-full ${isStriked ? 'line-through' : ''}`}>
            {answer}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center w-[10%] cursor-pointer">
        <div
          className={`bg-gray-100 p-2 rounded-full h-6 w-6 flex justify-center items-center ${isStriked && "bg-gray-400 "}`}
          onClick={() => {
            if (!disableClicks) { // Solo permitir tachar si los clics no están deshabilitados
              setIsStriked(!isStriked);
            }
          }}
        >
          <span className={`text-[12px] text-gray-500 ${isStriked && "text-white line-through"}`}>T</span>
        </div>
      </div>
    </div>
  );
};
