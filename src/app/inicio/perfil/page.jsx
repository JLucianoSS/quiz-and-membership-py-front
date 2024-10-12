
import { FormEditUser, ProfileAvatar, UploadAvatar } from "../components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { Headerpage } from "@/components";
import { getUserById } from "@/actions";

export default async function PerfilPage() {

  const session = await getServerSession(authOptions);
  const resp = await getUserById(session?.user?.id);
  
  return (
    <div className="h-screen bg-gray-50">

      {/* Head */}
      <div className="px-4 lg:px-20 xl:px-44">
        <Headerpage titulo="Perfil"/>
      </div>

      {/*avatar y nombre */}
      <ProfileAvatar user={resp?.data}/>

      <div className="flex flex-col items-center p-4">
        {/* Información del perfil */}
        <FormEditUser user={resp?.data}/>
      </div>
      
    </div>
  );
}
