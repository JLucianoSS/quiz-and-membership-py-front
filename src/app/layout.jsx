import { globalFont } from "../config/fonts";
import { Toaster } from "react-hot-toast";
import { InactivityProvider } from "@/components";
import "./globals.css";

export const metadata = {
  title: "Quiz & Membership",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  // CON InactivityProvider DESPUÉS DE 5 HORAS DE INACTIVIDAD CIERRA SESIÓN 2000 = 2 segundos 18000000

  return (
    <html lang="en">
      <body className={globalFont.className}>
        {/* <InactivityProvider timeout={18000000}>  */}
          {children}
          <Toaster />
        {/* </InactivityProvider> */}
      </body>
    </html>
  );
}
