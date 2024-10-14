import { Navbar, Sidebar, AccessRestriction } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { redirect } from "next/navigation";
import { getUserById } from "@/actions";

export default async function HomeLayout({ children }) {
  const session = await getServerSession(authOptions);
  const resp = await getUserById(session?.user?.id);

  if (!session) {
    redirect("/login");
  }

  // Asumimos que resp.data contiene una propiedad isApproved
  // const isUserApproved = resp?.data?.isApproved;
  const isUserApproved = false;

  return (
    <>
      {isUserApproved ? (
        <>
          <Navbar user={resp?.data} />
          <div className="pt-[52px]">
            {children}
          </div>
          <Sidebar user={resp?.data} />
        </>
      ) : (
        <AccessRestriction />
      )}
    </>
  );
}