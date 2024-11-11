"use client";
import { useState } from "react";
// import "./VideoSection.css";
import parse from 'html-react-parser';

export const ExplicationSection = ({ 
  title = "Anato Plus", 
  explication = "Aqui debe ir una expliacion bien elaborada acerca de la respuesta", 
  videoOrImage = "", 
  isCorrect = true 
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Determina el color de fondo en base a si es correcta o incorrecta
  const backgroundColorClass = isCorrect ? "bg-green-100" : "bg-red-100"; 

  // Función para verificar si el archivo es un video o una imagen basándose en su extensión
  const isVideo = (url) => {
    const videoExtensions = ['mp4', 'webm', 'ogg']; // Extensiones de video comunes
    const extension = url.split('.').pop().toLowerCase(); // Extrae la extensión del archivo
    return videoExtensions.includes(extension);
  };

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
        <div className={`text-gray-700 text-sm sm:text-base mt-2 sm:mt-0 ${showMore ? "" : "line-clamp-4"}`}>
          {parse(explication)}
        </div>

        {/* Condicional para mostrar video o imagen */}
        {showMore && videoOrImage && (
          <div className="mt-10">
            {isVideo(videoOrImage) ? (
              <div className="video-container">
                <video controls className="w-full max-h-96">
                  <source src={videoOrImage} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="image-container">
                <img
                  src={videoOrImage}
                  alt="Explicación visual"
                  className="w-full h-auto max-w-full object-contain rounded-md"
                />
              </div>
            )}
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
