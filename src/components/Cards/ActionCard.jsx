import Link from "next/link";


export const ActionCard = ({ action, icon, link = "" }) => {
  return (
    <Link href={link} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg bg-[#d9b16b]">
      <div className="w-10 h-10 flex items-center justify-center rounded-full">
        {icon}
      </div>
      <p className="mt-2 text-xs font-medium text-white">{action}</p>
    </Link>
  );
};
