import { globalFont } from "../config/fonts";
import { Toaster } from "react-hot-toast";
import { InactivityProvider } from "@/components";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

export const metadata = {
  title: "Quiz & Membership",
  description: "Anato plus plataforma",
};

export default function RootLayout({ children }) {

  // CON InactivityProvider DESPUÉS DE 5 HORAS DE INACTIVIDAD CIERRA SESIÓN 2000 = 2 segundos 18000000

  return (
    <html lang="en">
      <body className={globalFont.className}>
        {/* <InactivityProvider timeout={18000000}>  */}
          {children}
          <Analytics/>
          <Toaster />
        {/* </InactivityProvider> */}
      </body>
    </html>
  );
}
