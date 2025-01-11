import { Headerpage } from "@/components";
import { AdminDashboard } from "./components";
import { getComentarios, getPagos, getPlanes, getPreguntas, getTemas, getUsers } from "@/actions";

export default async function AdminHomePage() {

  const users = await getUsers();
  const preguntas = await getPreguntas();
  const temas = await getTemas();
  const planes = await getPlanes();
  const pagos = await getPagos();
  const comentarios = await getComentarios();
  // const temas = await getTemas();

  // agregar más ..

  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Dashboard" />
      <AdminDashboard 
        totalUsers={users.data.length}
        totalQuestions={preguntas.data.length}
        totalThemes={temas.data.length}
        totalPlanes={planes.data.length}
        totalComentarios={comentarios.data.length}
        totalPlanesComprados={pagos.data.length}
      />
    </div>
  );
}
