import React, { useState } from 'react';

export function Detalle_facturas() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-blue-100 justify-center items-center flex flex-col">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        {/* Título principal */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Detalle Factura
        </h1>

        {/* Cuadro de detalle de venta */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Subtítulo */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Detalle Venta
          </h2>

          {/* Información de la venta */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Subtotal:</span>
              <span className="text-lg text-gray-800">$0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Descuento:</span>
              <span className="text-lg text-gray-800">$0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Venta Neta:</span>
              <span className="text-lg text-gray-800">$0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Serv. Cliente:</span>
              <span className="text-lg text-gray-800">$0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Monto I.V.A.:</span>
              <span className="text-lg text-gray-800">$0.00</span>
            </div>

            <hr className="my-4" />

            {/* Total */}
            <div className="flex justify-between font-bold text-xl text-gray-700">
              <span>Total:</span>
              <span className='text-blue-950'>$0.00</span>
            </div>
          </div>
        </div>
      </div>

      <button
        className="mt-3 text-2xl bg-blue-950 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg"
        onClick={handleOpenModal} // Abre el modal
      >
        Crear Factura
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-11/4 max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Registrar Factura</h2>

            <div className="mb-4 flex justify-between">
              <label>Total:</label>
              <input type="text" className="border p-1 rounded" />
            </div>
            <div className="mb-4 flex justify-between">
              <label>Efectivo:</label>
              <input type="text" className="border p-1 rounded" />
            </div>
            <div className="mb-4 flex justify-between ">
              <label>Tarjeta:</label>
              <input type="text" className="border p-1 rounded" />
              
            </div>
            <div className="mb-4 flex justify-between">
              <label>Sinpe:</label>
              <input type="text" className="border p-1 rounded" />
            </div>
            <div className="mb-4 flex justify-between">
              <label>Depósito:</label>
              <input type="text" className="border p-1 rounded" />
            </div>
            <div className="mb-4 flex justify-between">
              <label>Cheque:</label>
              <input type="text" className="border p-1 rounded" />
            </div>
            <div className="mb-4 flex justify-between">
              <label>Vuelto:</label>
              <input type="text" className="border p-1 rounded" />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                onClick={handleCloseModal} // Cierra el modal
              >
                Cancelar
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                Facturar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detalle_facturas;
