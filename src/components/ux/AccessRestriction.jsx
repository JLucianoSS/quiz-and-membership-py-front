"use client"

import { HeaderNoAccess } from "..";

export const AccessRestriction = () => {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col z-40">
        <HeaderNoAccess />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full m-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Acceso Restringido</h2>
            <p className="text-gray-600 text-center mb-6">
              Su cuenta está pendiente de aprobación por el administrador. Por favor, espere a que su acceso sea autorizado.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Refrescar Página
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };