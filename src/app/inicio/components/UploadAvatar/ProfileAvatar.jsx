

"use client"
import { UserAvatar } from "@/components/UserAvatar/UserAvatar"
import { UploadAvatar } from ".."
import { useState } from "react"

export const ProfileAvatar = ({ user }) => {
  const [avatarImg, setAvatarImg] = useState(user?.avatar_img || '');

  // Verificar que user existe después de los hooks
  if (!user) {
    return (
      <div className="relative w-full h-[30%] flex flex-col justify-center items-center">
        <div className="text-gray-500">Cargando usuario...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[30%] flex flex-col justify-center items-center">
      {/* <FaUserCircle className="text-primary text-8xl" /> */}
      <UserAvatar
        userName={`${user?.nombre || ''} ${user?.apellido || ''}`}
        avatarUrl={avatarImg}
        classHeight="h-24"
        classWidth="w-24"
        classText="text-3xl"
        classBorder="border-2 border-primary"
      />
      <UploadAvatar user={user} avatarImg={user?.avatar_img || ''} setAvatarImg={setAvatarImg}/>
      <h2 className="text-gray-800 text-2xl font-bold mt-2">{user?.nombre || ''} {user?.apellido || ''}</h2>
    </div>
  )
}
