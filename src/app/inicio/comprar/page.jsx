import { Headerpage } from "@/components";


export default function ComprarPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-6 lg:px-20 xl:px-44">

      {/* <Headerpage titulo="Pagar"/> */}
      <div className="w-full max-w-md p-6 bg-white rounded-md mt-6">
        <h2 className="text-lg text-center text-gray-800">Pasarela de pago</h2>

        <form className="mt-6">
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Número de Tarjeta
            </label>
            <input
              type="text"
              id="cardNumber"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
              placeholder="1234 5678 9012 3456"
              required
              pattern="\d{4} \d{4} \d{4} \d{4}" // Formato de tarjeta
            />
          </div>

          <div className="flex justify-between mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                Fecha de Expiración
              </label>
              <input
                type="text"
                id="expirationDate"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                placeholder="MM/AA"
                required
                pattern="\d{2}/\d{2}" // Formato MM/AA
              />
            </div>

            <div className="w-1/2 pl-2">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                placeholder="123"
                required
                pattern="\d{3}" // Formato CVV de 3 dígitos
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md focus:outline-none focus:ring focus:ring-secondary hover:bg-primary-dark"
            >
              Pagar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}