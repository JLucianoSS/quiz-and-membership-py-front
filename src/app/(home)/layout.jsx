import { Footer, Navbar } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";

export default async function HomeLayout({ children }) {

  const session = await getServerSession(authOptions);
  //TODO: Traer al usuario mediante una consulta

  return (
    <>
      <Navbar user={session?.user}/>
      <div className="pt-14 ">
        { children }
      </div>
      {/* <Footer/> */}
    </>
  );
}