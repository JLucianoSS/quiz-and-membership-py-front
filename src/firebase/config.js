// firebase/config.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyAjSjHUgc1gct88LLXhM-nBpyQcYij-26U",
  authDomain: "anato-plus-c8829.firebaseapp.com",
  projectId: "anato-plus-c8829",
  storageBucket: "anato-plus-c8829.appspot.com",
  messagingSenderId: "315100694303",
  appId: "1:315100694303:web:da72645826dd7a91fa522a",
  measurementId: "G-C93VVLS6V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Función para subir archivos a Firebase Storage
export const uploadFile = async (file, path = "/") => {
  const storageRef = ref(storage, `${path}${v4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef); // Obtener URL de descarga
  return url;
};

// Función para eliminar archivos de Firebase Storage
export const deleteFile = async (fileUrl) => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    console.log("Archivo eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
  }
};
