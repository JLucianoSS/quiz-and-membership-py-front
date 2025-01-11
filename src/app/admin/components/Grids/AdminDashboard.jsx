import { FaUsers, FaQuestionCircle, FaBook, FaRegCalendarAlt, FaComment, FaShoppingCart } from 'react-icons/fa';

export const AdminDashboard = ({ 
  totalUsers = 0, 
  totalQuestions = 0, 
  totalThemes = 0, 
  totalPlanes = 0, 
  totalComentarios = 0, 
  totalPlanesComprados = 0
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-10">
      {/* Total Usuarios Registrados */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg rounded-xl p-6 flex items-center justify-between space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="text-white text-4xl">
          <FaUsers />
        </div>
        <div className="text-white">
          <h3 className="text-3xl font-semibold">{totalUsers}</h3>
          <p className="text-sm">Total Usuarios Registrados</p>
        </div>
      </div>

      {/* Total Preguntas Añadidas */}
      <div className="bg-gradient-to-r from-green-500 to-green-300 shadow-lg rounded-xl p-6 flex items-center justify-between space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="text-white text-4xl">
          <FaQuestionCircle />
        </div>
        <div className="text-white">
          <h3 className="text-3xl font-semibold">{totalQuestions}</h3>
          <p className="text-sm">Total Preguntas Añadidas</p>
        </div>
      </div>

      {/* Total Temas */}
      <div className="bg-gradient-to-r from-red-500 to-red-300 shadow-lg rounded-xl p-6 flex items-center justify-between space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="text-white text-4xl">
          <FaBook />
        </div>
        <div className="text-white">
          <h3 className="text-3xl font-semibold">{totalThemes}</h3>
          <p className="text-sm">Total Temas</p>
        </div>
      </div>

       {/* Total Comentarios */}
       <div className="bg-gradient-to-r from-purple-500 to-purple-300 shadow-lg rounded-xl p-6 flex items-center justify-between space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="text-white text-4xl">
          <FaComment />
        </div>
        <div className="text-white">
          <h3 className="text-3xl font-semibold">{totalComentarios}</h3>
          <p className="text-sm">Total Comentarios Recibidos</p>
        </div>
      </div>

      {/* Total Planes Agregados por Administrador */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-lg rounded-xl p-6 flex items-center justify-between space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="text-white text-4xl">
          <FaRegCalendarAlt />
        </div>
        <div className="text-white">
          <h3 className="text-3xl font-semibold">{totalPlanes}</h3>
          <p className="text-sm">Planes Agregados</p>
        </div>
      </div>

      {/* Total Planes Comprados */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-300 shadow-lg rounded-xl p-6 flex items-center justify-between space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="text-white text-4xl">
          <FaShoppingCart />
        </div>
        <div className="text-white">
          <h3 className="text-3xl font-semibold">{totalPlanesComprados}</h3>
          <p className="text-sm">Planes Comprados por Usuarios</p>
        </div>
      </div>
    </div>
  );
};
