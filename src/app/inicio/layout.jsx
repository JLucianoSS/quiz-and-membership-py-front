import { Footer, Navbar, Sidebar } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { redirect } from "next/navigation";
import { getUser } from "@/data/usuarios";

export default async function HomeLayout({ children }) {

  const session = await getServerSession(authOptions);
  //TODO: Traer al usuario mediante una consulta, lo siguiente es simulado
  const user = getUser(session?.user?.id);

  if(!session){
    redirect("/login");
  }

  return (
    <>
      <Navbar user={user}/>
      <div className="pt-[58px] ">
        { children }
      </div>
      <Sidebar user={user}/>
      {/* <Footer/> */}
    </>
  );
}