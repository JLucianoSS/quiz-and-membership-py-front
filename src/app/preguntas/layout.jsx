

import { AccessRestriction } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUserById } from "@/actions";

export default async function PreguntasLayout({ children }) {
  const session = await getServerSession(authOptions);
  const resp = await getUserById(session.user.id);
  
  if (!session) {
    // Si no hay sesión, podrías redirigir al login o mostrar un mensaje diferente
    redirect("/login");
  }

  // Asumimos que resp.data contiene una propiedad isApproved
  // const isUserApproved = resp?.data?.isApproved;
  const isUserApproved = resp.data.is_approved;

  if (!isUserApproved) {
    return <AccessRestriction />;
  }

  return (
    <div>
      {children}
    </div>
  );
}