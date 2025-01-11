"use client";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { updatePago } from "@/actions";
import { uploadFile } from "@/firebase/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { CustomLoading } from "..";

export const ThankYouPage = ({ idPlan, user }) => {
  const [loading, setLoading] = useState(false);
  const [comprobante, setComprobante] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [fileLoading, setFileLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [activePago, setActivePago] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      toast.error("Imagen inválida");
      return;
    }

    setFileLoading(true);

    try {
      const uploadedUrl = await uploadFile(
        file,
        `/comprobantes/${user.id}-${idPlan}/`
      );

      if (uploadedUrl) {
        setComprobante(uploadedUrl);
        console.log("URL de la imagen subida:", uploadedUrl);

        const respUpdatePago = await updatePago(activePago.id_Pago, {
          comprobante: uploadedUrl,
        });
        if (respUpdatePago.success) {
          toast.success("Comprobante subido correctamente");
        } else {
          console.log(
            "Error al subir el comprobante: ",
            respUpdatePago.message
          );
        }
      }
    } catch (error) {
      console.error("Error al subir el comprobante:", error);
      toast.error("Error al subir el comprobante");
    } finally {
      setFileLoading(false);
    }
  };

  // Función para obtener el pago activo según la fecha final del plan
  const getActivePago = (pagos) => {
    const currentDate = new Date();

    // Ordenar pagos por fecha de fin del plan (más reciente primero)
    const sortedPagos = [...pagos].sort(
      (a, b) => new Date(b.plan.fecha_fin) - new Date(a.plan.fecha_fin)
    );

    // Encontrar el pago cuyo plan no ha vencido aún
    return sortedPagos.find((pago) => {
      const planEndDate = new Date(pago.plan.fecha_fin);
      return currentDate <= planEndDate;
    });
  };

  // Verificar si el plan está activo (solo comparando con fecha final)
  const isPlanActive = (plan) => {
    const currentDate = new Date();
    const endDate = new Date(plan.fecha_fin);
    return currentDate <= endDate;
  };

  useEffect(() => {
    if (user.pagos && user.pagos.length > 0) {
      const pago = getActivePago(user.pagos);
      if (pago) {
        setActivePago(pago);
        if (pago.comprobante) {
          setComprobante(pago.comprobante);
        }
      }
    }

    const timer = setTimeout(() => {
      if (comprobante) {
        setShowImage(true);
      } else {
        setShowInput(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, comprobante]);

  // Si no hay pago activo, mostrar mensaje apropiado
  if (!activePago) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <CustomLoading
          color="#d9b16b"
          height={24}
          width={24}
          className="pt-4 flex justify-center"
        />
      </div>
    );
  }

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
            {activePago.metodo_pago === "pix" ? (
              <div className="flex flex-col items-center">
                PIX <span>Código: 028.107.781-91</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                Transferencia bancaria{" "}
                <span>Alias: 6234348 - Tipo: CI - Banco Continental</span>
              </div>
            )}
          </div>

          {/* <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Estado del Plan</h2>
            <p className="text-green-600">Plan válido hasta: {new Date(activePago.plan.fecha_fin).toLocaleDateString()}</p>
          </div> */}

          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h2 className="text-lg font-bold text-gray-700">
              Información de tu plan
            </h2>
            <p className="text-sm text-gray-600">
              Plan: {activePago.plan.nombre}
            </p>
            <p className="text-sm text-gray-600">
              Descripción: {activePago.plan.descripcion}
            </p>
            <p className="text-sm text-gray-600">
              Precio: ${activePago.plan.precio}
            </p>
            <p className="text-sm text-gray-600">
              Fecha de inicio:{" "}
              {new Date(activePago.plan.fecha_inicio).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Fecha de fin:{" "}
              {new Date(activePago.plan.fecha_fin).toLocaleDateString()}
            </p>
          </div>

          {showImage && comprobante && (
            <div>
              <p className="text-sm text-gray-600 mt-4">
                Comprobante subido:{" "}
                <Link
                  href={comprobante}
                  target="_blank"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Ver Comprobante
                </Link>
              </p>
            </div>
          )}

          {showInput && !comprobante && activePago.estado === "pendiente" && (
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
              <div className="text-sm text-gray-500 mt-2">
                {fileLoading ? "Cargando..." : "Sin archivos seleccionados"}
              </div>
            </div>
          )}

          {fileLoading && (
            <div className="mt-2 text-sm text-gray-600">
              Subiendo comprobante...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
