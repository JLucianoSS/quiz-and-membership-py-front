
"use client"
import moment from "moment";
import { useState } from "react";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";

export const HistorialCard = ({
  texto_pregunta,
  respuesta_dada,
  fecha_respuesta,
  es_correcta,
  opciones,
}) => {
  const [showOpciones, setShowOpciones] = useState(false); // Estado para controlar visibilidad

  const toggleOpciones = () => {
    setShowOpciones(!showOpciones); // Cambia entre mostrar u ocultar
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-100 shadow-md">
      <div className="flex items-center text-sm">
        <span className="text-xs font-semibold text-gray-600">
          Respondida el {moment(fecha_respuesta).format("DD/MM/YYYY")} a las{" "}
          {moment(fecha_respuesta).format("HH:mm")}
        </span>
      </div>
      <div className="text-gray-500 text font-semibold">{texto_pregunta}</div>

      <hr className="mb-3 mt-1" />

      <div className="">
        <h3 className="text-gray-500 text-sm font-semibold pb-1">Tu respuesta:</h3>
        <p className="text-gray-600 text-xs overflow-hidden text-ellipsis line-clamp-2 flex items-center">
          {es_correcta ? (
            <div className="w-[20px]">
              <IoCheckmarkCircleOutline className="text-green-600 font w-5 h-5 mr-2" />
            </div>
          ) : (
            <div className="w-[20px]">
              <IoCloseCircleOutline className="text-red-600 w-5 h-5 mr-2" />
            </div>
          )}
          <span className="ml-1">{respuesta_dada}</span>
        </p>
      </div>

      <hr className="mt-2 mb-1" />

      {/* Botón para mostrar/ocultar alternativas */}
      <div
        onClick={toggleOpciones} // Llama la función al hacer clic
        className="flex items-center justify-start cursor-pointer mt-3"
      >
        <h3 className="text-gray-500 text-sm font-semibold">Alternativas</h3>
        {showOpciones ? (
          <IoChevronUpOutline size={15} className="text-gray-500  ml-1" />
        ) : (
          <IoChevronDownOutline size={15} className="text-gray-500  ml-1" />
        )}
      </div>

      {/* Contenedor de opciones con transición */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showOpciones ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="mt-3">
          {opciones.map((opcion) => (
            <li
              key={opcion.id_opcion}
              className="flex items-center text-sm text-gray-600 mt-2"
            >
              {opcion.es_correcta ? (
                <div className="w-[20px]">
                  <IoCheckmarkCircleOutline className="text-green-600 w-5 h-5 mr-2" />
                </div>
              ) : (
                <div className="w-[20px]">
                  <IoCloseCircleOutline className="text-red-600 w-5 h-5 mr-2" />
                </div>
              )}
              <span className="ml-1 text-xs">{opcion.texto_opcion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
