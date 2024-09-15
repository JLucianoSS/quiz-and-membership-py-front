
import { FaUserCircle } from "react-icons/fa";
import { FormEditUser } from "../components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUser } from "@/data/usuarios";

export default async function PerfilPage() {

  const session = await getServerSession(authOptions);
  //TODO: Traer al usuario mediante una consulta, lo siguiente es simulado
  const user = await getUser(session?.user?.id);
  
  return (
    <div className="h-[90vh]">
      {/* Header con icono de avatar y nombre */}
      <div className="relative w-full bg-primary h-[30%] flex flex-col justify-center items-center">
        <FaUserCircle className="text-white text-8xl" />
        <h2 className="text-white text-2xl font-bold mt-2">{user?.nombre} {user?.apellido}</h2>
      </div>

      <div className="flex flex-col items-center bg-gray-50 h-[70%] p-4">
        {/* Información del perfil */}
        <FormEditUser user={user}/>
      </div>
    </div>
  );
}
