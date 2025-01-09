
"use client"
import { useState } from 'react';
import { FaCheckCircle, FaMoneyBillWave, FaQrcode } from 'react-icons/fa';

export const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const planDetails = {
    title: "Plan Premium AnatoPlus",
    description: "Acceso ilimitado a la plataforma para responder preguntas",
    features: [
      "Preguntas ilimitadas",
      "Acceso 24/7",
      "Soporte personalizado",
      "Material descargable"
    ],
    price: "99.99"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  if (showThankYou) {
    return <ThankYouPage paymentMethod={selectedPayment} />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Resumen de tu compra</h1>
          
          <div className="space-y-6">
            {/* Plan Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{planDetails.title}</h2>
              <p className="text-gray-600">{planDetails.description}</p>
              
              <div className="space-y-2">
                {planDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-2xl font-bold">
                ${planDetails.price}
              </div>
            </div>

            {/* Payment Methods */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Métodos de pago</h3>
                
                <div className="space-y-4">
                  {/* Transferencia Option */}
                  <label className="block">
                    <div className={`flex items-center border rounded-lg p-4 cursor-pointer transition duration-200 ${selectedPayment === 'transferencia' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="transferencia"
                        checked={selectedPayment === 'transferencia'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-4 flex items-center gap-3">
                        <FaMoneyBillWave className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">Transferencia bancaria</div>
                          <div className="text-sm text-gray-500">
                            Alias: 6234348 - Tipo: CI - Banco Continental
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* PIX Option */}
                  <label className="block">
                    <div className={`flex items-center border rounded-lg p-4 cursor-pointer transition duration-200 ${selectedPayment === 'pix' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="pix"
                        checked={selectedPayment === 'pix'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-4 flex items-center gap-3">
                        <FaQrcode className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">PIX</div>
                          <div className="text-sm text-gray-500">
                            Código PIX: 028.107.781-91
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedPayment}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 
                  ${selectedPayment 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Confirmar Pago
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThankYouPage = ({ paymentMethod }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-8 text-center space-y-6">
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
          <p className="text-gray-600">
            Tu acceso será activado una vez que recibamos la confirmación de tu pago.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              No olvides adjuntar la captura de tu pago para agilizar el proceso de activación.
              Puedes enviarla a través de nuestro sistema de soporte.
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            Método de pago seleccionado: {paymentMethod === 'transferencia' ? 'Transferencia bancaria' : 'PIX'}
          </div>
        </div>
      </div>
    </div>
  );
};

