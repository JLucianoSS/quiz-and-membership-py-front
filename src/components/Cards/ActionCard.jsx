import Link from "next/link";

export const ActionCard = ({ action, icon, link = "" }) => {
  return (
    <Link href={link} className="bg-primary flex flex-col w-[60px] items-center justify-center rounded-lg p-1">
      {/* Contenedor del icono con tamaño responsivo */}
      <div className="">
        {icon}
      </div>
      {/* Título con tamaño y separación responsivos */}
      <p className="text-white text-[10px]">
        {action}
      </p>
    </Link>
  );
};
// export const ActionCard = ({ action, icon, link = "" }) => {
//   return (
//     <Link href={link} className="flex flex-col justify-center items-center p-3 shadow-sm rounded-lg bg-[#d9b16b] max-w-[12rem] h-full">
//       {/* Contenedor del icono con tamaño responsivo */}
//       <div className="flex items-center justify-center rounded-full w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
//         {icon}
//       </div>
//       {/* Título con tamaño y separación responsivos */}
//       <p className="text-xs md:text-sm lg:text-base font-medium text-white text-center">
//         {action}
//       </p>
//     </Link>
//   );
// };
