import { Headerpage } from "@/components";
import { TableUsers } from "../components";
import { getUsers } from "@/data/usuarios";


export default async function UsuariosAdminPage() {

  const users = await getUsers(); 

  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Usuarios" />
      <TableUsers users={users}/>
    </div>
  );
}