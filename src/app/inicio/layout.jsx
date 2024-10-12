import { Footer, Navbar, Sidebar } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { redirect } from "next/navigation";
import { getUserById } from "@/actions";

export default async function HomeLayout({ children }) {

  const session = await getServerSession(authOptions);
  const resp = await getUserById(session?.user?.id);

  if(!session){
    redirect("/login");
  }

  return (
    <>
      <Navbar user={resp?.data}/>
      <div className="pt-[52px]">
        { children }
      </div>
      <Sidebar user={resp?.data}/>
      {/* <Footer/> */}
    </>
  );
}