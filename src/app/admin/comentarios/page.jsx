import { Headerpage } from "@/components";
import { TableComentarios } from "../components";


export default function ComentariosAdminPage() {

    
  return (
   <div className="px-4 lg:px-10">
         <Headerpage titulo="Comentarios"/>
         <TableComentarios/>
       </div>
  );
}