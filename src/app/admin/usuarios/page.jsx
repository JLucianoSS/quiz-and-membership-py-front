import { Headerpage } from "@/components";
import { TableUsers } from "../components";
import { getUsersOptimized } from "@/actions";



export default async function UsuariosAdminPage() {

  const users = await getUsersOptimized(); 
  console.log(users);
  

  return (
    <div className="px-4 lg:px-10 pb-10">
      <Headerpage titulo="Usuarios" />
      <TableUsers users={users.data}/>
    </div>
  );
}