

import {  TheFilterContainer } from "../../../components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUserById } from "@/actions";

export default async function PreguntasSubtemaFilterPage({params}) {
  const session = await getServerSession(authOptions);
   const user = await getUserById(session.user.id);
 
   const { page } = params;
 
   return (
       <TheFilterContainer 
        user={user.data}
        page={page}
       />
 
   );
}