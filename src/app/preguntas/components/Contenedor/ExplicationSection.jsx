"use client"
import { useState } from "react";

export const ExplicationSection = ({ title = "Anato Plus", explication = "Aqui debe ir una expliacion bien elaborada acerca de la respuesta" }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-2 p-4 border border-gray-300 rounded-md bg-green-100 max-w-full">
      {/* Avatar and Header */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <div className="w-12 h-12 bg-green-500 rounded-full flex justify-center items-center text-white font-bold text-lg">
          AP
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-gray-800">{title}</h2>
          <span className="text-[12px] text-gray-500">Explicación</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <p className={`text-gray-700 text-sm mt-2 ${showMore ? "" : "line-clamp-4"}`}>
          {explication}
        </p>
        
        <button
          onClick={toggleShowMore}
          className="mt-2 text-sm text-blue-500 font-semibold"
        >
          {showMore ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
};
