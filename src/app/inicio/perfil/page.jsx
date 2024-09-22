
import { FormEditUser, ProfileAvatar, UploadAvatar } from "../components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUser } from "@/data/usuarios";
import { Headerpage } from "@/components";

export default async function PerfilPage() {

  const session = await getServerSession(authOptions);
  //TODO: Traer al usuario mediante una consulta, lo siguiente es simulado
  const user = await getUser(session?.user?.id);
  
  return (
    <div className="h-[90vh] bg-gray-50">

      {/* Head */}
      <div className="px-4 lg:px-20 xl:px-44">
        <Headerpage titulo="Perfil"/>
      </div>

      {/*avatar y nombre */}
      <ProfileAvatar user={user}/>

      <div className="flex flex-col items-center h-[70%] p-4">
        {/* Información del perfil */}
        <FormEditUser user={user}/>
      </div>
      
    </div>
  );
}
