"use client";
import { IoCameraOutline, IoTrashOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { uploadFile, deleteFile } from "../../../../firebase/config"; // Importa la función deleteFile
import { updateUsuario } from "@/actions";
import toast from "react-hot-toast";

export const UploadAvatar = ({ avatarImg, setAvatarImg, user }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Creamos una referencia para el input de archivo

  console.log(user);
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    // Validar si el archivo es una imagen
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, sube un archivo de imagen.");
      return;
    }

    setLoading(true);
    try {
      // Subir el archivo a Firebase
      const resultUploadFile = await uploadFile(file, "/avatars/");
      // Establecer la URL del avatar
      setAvatarImg(resultUploadFile);
      //guarda en la bd la url
      const resp = await updateUsuario(user.id_user, {avatar_img:avatarImg});
      console.log(resp);
      
      if(resp.success){
        toast.success("Imagen subida correctamente.");
        console.log("Archivo subido correctamente:", resultUploadFile);
      }
    } catch (error) {
      toast.error("Error al subir el archivo.");
      console.error("Error al subir el archivo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = async () => {
    if (!avatarImg) return;

    setLoading(true);
    try {
      // Eliminar el archivo de Firebase
      await deleteFile(avatarImg);
      setAvatarImg(null); // Eliminar la imagen del estado local
      toast.success("Avatar eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el avatar.");
      console.error("Error al eliminar el avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="avatar-upload-container">
      {/* Input para seleccionar archivo, completamente oculto */}
      <input
        ref={fileInputRef} // Asignamos la referencia al input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Botón que dispara la apertura del explorador de archivos */}
      <button
        className={`mt-[-30px] ml-[60px] ${
          avatarImg ? "bg-red-500" : "bg-primary"
        } w-8 h-8 rounded-full p-[6px] flex items-center justify-center`}
        onClick={avatarImg ? handleDelete : handleClick}
        disabled={loading} // Deshabilitar mientras se sube o elimina la imagen
      >
        {loading ? (
          <div className="loader" /> // Indicador de carga
        ) : avatarImg ? (
          <IoTrashOutline className="text-gray-50" size={26} />
        ) : (
          <IoCameraOutline className="text-gray-50" size={26} />
        )}
      </button>
    </div>
  );
};
