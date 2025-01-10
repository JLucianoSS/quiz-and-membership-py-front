"use client"
import { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaQrcode } from 'react-icons/fa';
import { buscarPlanPorId } from '@/data/plans';
import { useRouter } from 'next/navigation';

export const Checkout = ({ idPlan, user }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const router =  useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchPlan = () => {
      try {
        //CONSULTA PARA TRAER EL PLAN POR ID
        const respPlan = buscarPlanPorId(idPlan)
        setPlan(respPlan);
       
      } catch (error) {
        console.log("Error al buscar el plan: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []); // Aquí estamos dependiendo de idPlan y pagos


  const handleSubmit = (e) => {
    e.preventDefault();
    //CONSULTA PARA CREAR EL PAGO POR EL PLAN DEL USUARIO ACTUAL
    const nuevoPago = {
      id_user: user.id_user,
      id_plan: idPlan,
      monto: plan.precio,
      fecha_pago: new Date().toISOString(), // Current date and time
      metodo_pago: selectedPayment,
      estado: "pendiente", // Example status, could be 'pendiente', 'confirmado', etc.
    };
    // Logging the payment data
    console.log("Datos para crear el pago:", nuevoPago);
    // Aquí iría la lógica para crear el pago, como una llamada API o guardarlo en tu base de datos


    router.push(`/adquirir/plan/thankyou/${idPlan}`)
  };


  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Resumen de tu compra</h1>
          
          <div className="space-y-6">
            {/* Detalles del plan */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{plan.nombre}</h2>
              <p className="text-gray-600">{plan.descripcion}</p>
              
              <div className="text-2xl font-bold">
                ${plan.precio}
              </div>
            </div>

            {/* Métodos de pago */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Métodos de pago</h3>
                
                <div className="space-y-4">
                  {/* Opción Transferencia */}
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

                  {/* Opción PIX */}
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

