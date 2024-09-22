
import { getFirstLetterCapitalize } from "@/utils/capitalize";
import Image from "next/image";

export const UserAvatar = ({
  avatarUrl = "",
  userName = "User",
  classWidth = "w-[39px]",
  classHeight = "h-[39px]",
  classText = "text-base",
  classBorder = ""
}) => {
  return (
    <div className={`flex items-center space-x-4 ${classWidth} ${classHeight} `}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          width={300}
          height={300}
          alt={"avatar_" + userName}
          className="w-full h-full border-2 rounded-full p-[6px] border-blue-700 mx-auto object-cover"
        />
      ) : (
        <div
          className={`mx-auto  rounded-full w-full h-full flex justify-center items-center ${classBorder}`}
        >
          <span
            className={`bg-white w-full h-full ${classText} rounded-full flex justify-center items-center`}
          >
            {getFirstLetterCapitalize(userName)}
          </span>
        </div>
      )}
    </div>
  );
};
