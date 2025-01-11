"use client";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { uploadFile } from "../../firebase/config"; // Asegúrate de que la ruta esté correcta
import { updatePago } from "@/actions";
import toast from "react-hot-toast";
import Link from "next/link";

export const ThankYouPage = ({ idPlan, user }) => {
  const [loading, setLoading] = useState(false);
  const [comprobante, setComprobante] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("transferencia"); // Simulación de método de pago
  const [fileLoading, setFileLoading] = useState(false); // Nuevo estado para manejar la carga del archivo
  const [showInput, setShowInput] = useState(false); // Estado para controlar la aparición del input de carga
  const [showImage, setShowImage] = useState(false); // Estado para controlar la aparición de la imagen cargada

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // Validar si el archivo es una imagen
    if (file && !file.type.startsWith("image/")) {
      toast.error("Imagen inválida");
      return;
    }

    setFileLoading(true); // Activamos el indicador de carga

    try {
      // Subir archivo a Firebase
      const uploadedUrl = await uploadFile(file, `/comprobantes/${user.id}-${idPlan}/`);

      if (uploadedUrl) {
        setComprobante(uploadedUrl);
        console.log("URL de la imagen subida:", uploadedUrl);
        
        const respUpdatePago = await updatePago(user.pagos[0].id_Pago, { comprobante: uploadedUrl });
        if (respUpdatePago.success) {
          toast.success("Comprobante subido correctamente");
        } else {
          console.log("Error al subir el comprobante: ", respUpdatePago.message);
        }
      }
    } catch (error) {
      console.error("Error al subir el comprobante:", error);
      toast.error("Error al subir el comprobante");
    } finally {
      setFileLoading(false); // Desactivamos el indicador de carga
    }
  };

  const plan = user.pagos[0]?.plan; // Obtener el plan solicitado

  // Verificar si ya hay un comprobante al cargar la vista
  useEffect(() => {
    if (user.pagos[0]?.comprobante) {
      setComprobante(user.pagos[0].comprobante);
    }

    // Agregar un retraso de 3 segundos antes de mostrar el input o la imagen
    const timer = setTimeout(() => {
      if (comprobante) {
        setShowImage(true);
      } else {
        setShowInput(true);
      }
    }, 2000); // 3 segundos

    return () => clearTimeout(timer); // Limpiar el timer cuando el componente se desmonte
  }, [comprobante, user]);

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-8 text-center space-y-6">
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
          <p className="text-gray-600">
            Tu acceso será activado una vez que recibamos la confirmación de tu
            pago.
          </p>

          <div className="text-sm text-gray-500">
            Método de pago seleccionado:{" "}
            {paymentMethod === "transferencia" ? (
              <div className="flex flex-col items-center">
                Transferencia bancaria <span>Alias: 6234348 - Tipo: CI - Banco Continental</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                PIX <span>Código: 028.107.781-91</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Adjunta la captura de tu pago para agilizar la activación. Puedes enviarla con el botón de abajo o contactar al administrador.
            </p>
          </div>

          {/* Información del plan solicitado */}
          {plan && (
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h2 className="text-lg font-bold text-gray-700">Información de tu plan</h2>
              <p className="text-sm text-gray-600">Plan: {plan.nombre}</p>
              <p className="text-sm text-gray-600">Descripción: {plan.descripcion}</p>
              <p className="text-sm text-gray-600">Precio: ${plan.precio}</p>
              <p className="text-sm text-gray-600">Fecha de inicio: {new Date(plan.fecha_inicio).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Fecha de fin: {new Date(plan.fecha_fin).toLocaleDateString()}</p>
            </div>
          )}

          {/* Mostrar o subir comprobante */}
          {showImage && comprobante && (
            <div>
              <p className="text-sm text-gray-600 mt-4">
                Comprobante subido: <Link href={comprobante} target="_blank" className="text-blue-500 hover:underline text-sm">Ver Comprobante</Link>
              </p>
            </div>
          )}

          {/* Mostrar input después de 3 segundos si no hay comprobante */}
          {showInput && (
            <div className="mt-4 flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subir comprobante
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="mt-1 block text-sm text-gray-900 cursor-pointer"
              />
              {/* Mostrar mensaje "Sin archivo seleccionado" si no se ha elegido ningún archivo */}
              <div className="text-sm text-gray-500 mt-2">
                {fileLoading ? "Cargando..." : "Sin archivos seleccionados"}
              </div>
            </div>
          )}

          {fileLoading && (
            <div className="mt-2 text-sm text-gray-600">Subiendo comprobante...</div>
          )}
        </div>
      </div>
    </div>
  );
};
