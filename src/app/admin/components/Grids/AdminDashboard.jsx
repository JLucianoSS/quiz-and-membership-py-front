

export const AdminDashboard = ({ 
  totalUsers =20, 
  totalQuestions = 20, 
  totalThemes =20, 
  totalSubscriptions= 20 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="bg-white shadow-sm border rounded-lg flex p-4 justify-center items-center">
        <div className="text-2xl mr-2">👤</div>
        <div>
          <h3 className="text-2xl font-semibold">{totalUsers}</h3>
          <p className="text-sm text-gray-500">Total Usuarios Registrados</p>
          <span className="text-green-500 text-xs">+4,8%</span>
        </div>
      </div>
      <div className="bg-white shadow-sm border rounded-lg flex p-4 justify-center items-center">
        <div className="text-2xl mr-2">❓</div>
        <div>
          <h3 className="text-2xl font-semibold">{totalQuestions}</h3>
          <p className="text-sm text-gray-500">Total Preguntas Añadidas</p>
          <span className="text-green-500 text-xs">+2,5%</span>
        </div>
      </div>
      <div className="bg-white shadow-sm border rounded-lg flex p-4 justify-center items-center">
        <div className="text-2xl mr-2">📚</div>
        <div>
          <h3 className="text-2xl font-semibold">{totalThemes}</h3>
          <p className="text-sm text-gray-500">Total Temas</p>
          <span className="text-red-500 text-xs">-1,8%</span>
        </div>
      </div>
      <div className="bg-white shadow-sm border rounded-lg flex p-4 justify-center items-center">
        <div className="text-2xl mr-2">📅</div>
        <div>
          <h3 className="text-2xl font-semibold">{totalSubscriptions}</h3>
          <p className="text-sm text-gray-500">Total Suscripciones</p>
          <span className="text-green-500 text-xs">+2,0%</span>
        </div>
      </div>
    </div>
  );
};


