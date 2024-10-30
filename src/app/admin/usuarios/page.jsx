import { Headerpage } from "@/components";
import { TableUsers } from "../components";
import { getUsers } from "@/actions";



export default async function UsuariosAdminPage() {

  const users = await getUsers(); 
  console.log(users);
  

  return (
    <div className="px-4 lg:px-10 pb-10">
      <Headerpage titulo="Usuarios" />
      <TableUsers users={users.data}/>
    </div>
  );
}