"use client"
import Link from "next/link";
import { HeaderNoAccess } from "..";

export const AccessRestriction = ({isPlan, user}) => {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col z-40">
        <HeaderNoAccess user={user}/>
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col gap-4 justify-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full m-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">Acceso Restringido</h2>
            <p className="text-gray-600 text-center">
              Compra un plan o espera la autorización del administrador. Tu acceso será habilitado una vez aprobado.
            </p>
            
            <div className="flex justify-center">
              <Link
                href="adquirir/plan"
                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isPlan ? "Ver plan" :"Comprar un plan"}
              </Link>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="text-center text-sm text-blue-500 hover:underline active:underline" 
            >
              Refrescar Página
            </button>

          </div>
        </div>
      </div>
    );
  };