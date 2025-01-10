"use client";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { uploadFile } from "../../firebase/config"; // Asegúrate de que la ruta esté correcta
import Link from "next/link";

export const ThankYouPage = ({ idPlan, user }) => {
  const [loading, setLoading] = useState(false);
  const [comprobante, setComprobante] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("transferencia"); // Simulación de método de pago

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // Validar si el archivo es una imagen
    if (file && !file.type.startsWith("image/")) {
      toast.error("Imagen inválida");
      return;
    }

    setLoading(true);

    try {
      // Subir archivo a Firebase
      const uploadedUrl = await uploadFile(file, `/comprobantes/${user.id}-${idPlan}/`);

      if (uploadedUrl) {
        setComprobante(uploadedUrl);
        console.log("URL de la imagen subida:", uploadedUrl);
        toast.success("Comprobante subido correctamente");
      }
    } catch (error) {
      console.error("Error al subir el comprobante:", error);
      toast.error("Error al subir el comprobante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-8 text-center space-y-6">
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
          <p className="text-gray-600">
            Tu acceso será activado una vez que recibamos la confirmación de tu
            pago.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              No olvides adjuntar la captura de tu pago para agilizar el proceso
              de activación. Puedes enviarla a través de nuestro sistema de
              soporte.
            </p>
          </div>

          {/* Mostrar o subir comprobante */}
          <div className="text-sm text-gray-500">
            Método de pago seleccionado:{" "}
            {paymentMethod === "transferencia"
              ? "Transferencia bancaria"
              : "PIX"}
          </div>

          {comprobante ? (
            <div>
              <p className="text-sm text-gray-600 mt-4">
                Comprobante subido: <Link href={comprobante} target="_blank" className="text-blue-500 hover:underline text-sm">Ver Comprobante</Link>
              </p>
              {/* Aquí podrías mostrar una vista previa del comprobante */}
            </div>
          ) : (
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
            </div>
          )}

          {loading && (
            <div className="mt-2 text-sm text-gray-600">Subiendo comprobante...</div>
          )}
        </div>
      </div>
    </div>
  );
};
