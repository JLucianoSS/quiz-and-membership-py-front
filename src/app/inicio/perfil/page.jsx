
import { FormEditUser, ProfileAvatar, UploadAvatar } from "../components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { Headerpage } from "@/components";
import { getUserWithPayments } from "@/actions";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);
  
  console.log('🔍 Debug PerfilPage:', {
    sessionExists: !!session,
    userId: session?.user?.id,
    userEmail: session?.user?.email
  });
  
  const resp = await getUserWithPayments(session?.user?.id);
  
  console.log('🔍 Debug PerfilPage - getUserWithPayments response:', {
    success: resp?.success,
    hasData: !!resp?.data,
    dataKeys: resp?.data ? Object.keys(resp.data) : [],
    error: resp?.message
  });
  
  // Si hay error en la consulta, mostrar mensaje de error
  if (!resp?.success || !resp?.data) {
    return (
      <div className="h-screen bg-gray-50">
        <div className="px-4 lg:px-20 xl:px-44">
          <Headerpage titulo="Perfil"/>
        </div>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error al cargar perfil</h2>
            <p className="text-gray-600 mb-4">{resp?.message || 'No se pudieron cargar los datos del usuario'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen bg-gray-50">

      {/* Head */}
      <div className="px-4 lg:px-20 xl:px-44">
        <Headerpage titulo="Perfil"/>
      </div>

      {/*avatar y nombre */}
      <ProfileAvatar user={resp.data}/>

      <div className="flex flex-col items-center p-4">
        {/* Información del perfil */}
        <FormEditUser user={resp.data}/>
      </div>
      
    </div>
  );
}
