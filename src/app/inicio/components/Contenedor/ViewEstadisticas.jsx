export const ViewEstadisticas = () => {
  return (
    <>
      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {/* Mi porcentaje de respuestas correctas */}
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Tú</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Desempeño</h3>
          <p className="text-4xl font-bold text-green-600">85%</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Usuarios</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Desempeño</h3>
          <p className="text-4xl font-bold text-blue-600">72%</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Tú</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Aciertos</h3>
          <p className="text-4xl font-bold text-green-600">45</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Usuarios</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Aciertos</h3>
          <p className="text-4xl font-bold text-blue-600">120</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Tú</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Falladas</h3>
          <p className="text-4xl font-bold text-red-600">5</p>
        </div>
        <div className="p-6 flex flex-col justify-center items-center bg-white shadow rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Usuarios</h2>
          <h3 className="text-sm  text-gray-600 mb-1">Falladas</h3>
          <p className="text-4xl font-bold text-red-600">25</p>
        </div>
      </div>
    </>
  );
};
