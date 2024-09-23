"use client";
import { useState } from "react";
import "./VideoSecction.css"

export const ExplicationSection = ({ title = "Anato Plus", explication = "Aqui debe ir una expliacion bien elaborada acerca de la respuesta", videoURL = "", isCorrect = true }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Determina el color de fondo en base a si es correcta o incorrecta
  const backgroundColorClass = isCorrect ? "bg-green-100" : "bg-red-100"; 

  return (
    <div className={`flex flex-col md:flex-row items-start gap-4 p-4 border border-gray-300 rounded-md max-w-full ${backgroundColorClass}`}>
      {/* Avatar and Header */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <div className={`w-12 h-12 ${isCorrect ? "bg-green-500" : "bg-red-500"} rounded-full flex justify-center items-center text-white font-bold text-lg`}>
          AP
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800 sm:text-lg">{title}</h2>
          <span className="text-[12px] sm:text-[14px] text-gray-500">{isCorrect ? "Correcto" : "Incorrecto"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <p className={`text-gray-700 text-sm sm:text-base mt-2 sm:mt-0 ${showMore ? "" : "line-clamp-4"}`}>
          {explication}
        </p>

        {showMore && videoURL && (
          <div className="mt-10">
            <div className="video-container">
              <iframe
                src={videoURL}
                title="Explicación en video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleShowMore}
          className="mt-6 text-sm sm:text-base text-blue-500 font-semibold"
        >
          {showMore ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
};
