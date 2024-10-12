import { Headerpage } from "@/components";
import { AdminDashboard } from "./components";
import { getPreguntas, getTemas, getUsers } from "@/actions";

export default async function AdminHomePage() {

  const users = await getUsers();
  const preguntas = await getPreguntas();
  const temas = await getTemas();

  // agregar más ..

  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Dashboard" />
      <AdminDashboard 
        totalUsers={users.data.length}
        totalQuestions={preguntas.data.length}
        totalThemes={temas.data.length}
        totalSubscriptions={0}
      />
    </div>
  );
}
