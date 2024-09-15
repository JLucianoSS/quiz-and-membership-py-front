
import { IoAddOutline, IoBarChartOutline, IoFilterOutline, IoPersonOutline, IoPlayOutline, IoStarOutline, IoTimeOutline, } from "react-icons/io5";
const hasStarted = false;

export const routeActions = [
  {
    action: hasStarted ? "Continuar" : "Nuevo",
    icon: hasStarted ? <IoPlayOutline size={24} color="#fff" /> : <IoAddOutline size={24} color="#fff" />,
    link: hasStarted ? "" : "/inicio/iniciar-quiz",
  },
  {
    action: "Filtrar",
    icon: <IoFilterOutline size={24} color="#fff" />,
    link: "/inicio/filtros",
  },
  {
    action: "Desempeño",
    icon: <IoBarChartOutline size={24} color="#fff" />,
    link: "/inicio/desempeno",
  },
  {
    action: "Favoritas",
    icon: <IoStarOutline size={24} color="#fff" />,
    link: "/inicio/favoritos",
  },
  {
    action: "Historial",
    icon: <IoTimeOutline size={24} color="#fff" />,
    link: "/inicio/historial",
  },
  {
    action: "Perfil",
    icon: <IoPersonOutline size={24} color="#fff" />,
    link: "/inicio/perfil",
  },
];
