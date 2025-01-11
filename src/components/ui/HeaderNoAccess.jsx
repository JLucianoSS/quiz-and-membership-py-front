
"use client"
import { IoLogOutOutline } from 'react-icons/io5';
import { signOut } from 'next-auth/react';
import { LOGO } from '@/config/theme';

export const HeaderNoAccess = ({user}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#212121] py-2 px-4 z-50">
      <div className="flex justify-between items-center h-[40px] mx-auto px-6 lg:px-20 xl:px-44">
        <div className="flex items-center">
          <img src={LOGO} alt="Logo" width={100} height={40} />
        </div>
        <div className='flex gap-2'>
          <h4 className='text-gray-200'>{user.nombre} {user.apellido}</h4>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center text-white hover:text-gray-100 transition-colors text-sm"
          >
            <IoLogOutOutline className="mr-2" size={22} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};