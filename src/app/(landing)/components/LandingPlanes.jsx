import Link from "next/link";

export const LandingPlanes = () => {
    return (
      <section className="">
        <div className="mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Nuestros Planes</h2>
          <p className="text-gray-600 mt-4">Elige el plan que mejor se adapte a ti</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan Free */}
          <div className="bg-white p-8 shadow-sm rounded-md border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Plan Free</h3>
            <p className="text-gray-600 mb-6">Perfecto para aquellos que quieren comenzar sin compromisos.</p>
            
            <ul className="mb-6 space-y-4 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Acceso a contenido básico
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                5 proyectos mensuales
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Soporte por correo electrónico
              </li>
            </ul>
            
            <Link href="#" className="flex justify-center w-full bg-primary text-white py-2 rounded-lg">
              Empezar gratis
            </Link>
          </div>
  
          {/* Plan Premium */}
          <div className="bg-white p-8 shadow-sm rounded-md border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Plan Premium</h3>
            <p className="text-gray-600 mb-6">Ideal para profesionales que buscan más control y herramientas avanzadas.</p>
            
            <ul className="mb-6 space-y-4 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Acceso a todo el contenido premium
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Proyectos ilimitados
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Soporte prioritario 24/7
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Integraciones avanzadas con API
              </li>
            </ul>
  
            <Link href="#" className="flex justify-center w-full bg-primary text-white py-2 rounded-lg">
              Contratar Premium
            </Link>
          </div>
        </div>
      </section>
    );
  };
  