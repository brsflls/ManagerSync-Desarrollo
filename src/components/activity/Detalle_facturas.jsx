import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Factura } from './Factura'; 

function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 -mt-1 bg-gray-800 bg-opacity-50 flex w-screen h-screen">
      <div className="flex flex-col right-96 left-96 ml-36 mr-36 top-4 fixed ">
        <button
          className="cursor-pointer rounded-lg shadow-lg bg-white text-gray-700 font-extrabold pb-7 p-3 text-left"
          onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export function Detalle_facturas({ subtotal, totalIVA, totalVenta, carrito, selectedCliente, precioUnitario }) {
  const [facturaId, setFacturaId] = useState(null); // Almacena el ID de la factura registrada
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlar la visibilidad del modal

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-slate-300">
      <div className="w-full py-2 pt-12 p-6 mx-auto mt-6 ml-5 mb-4 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center place-items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Detalle Factura</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">

          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium text-gray-600">Cliente Seleccionado:</span>
            <span className="text-lg text-gray-800">{selectedCliente ? selectedCliente.nombre : 'Ninguno'}</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-base font-medium mr-24 text-gray-600">Subtotal:</span>
              <span className="text-medium text-gray-800">₡{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-600">Descuento:</span>
              <span className="text-medium text-gray-800">₡0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-600">Venta Neta:</span>
              <span className="text-medium text-gray-800">₡{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-600">Serv. Cliente:</span>
              <span className="text-medium text-gray-800">₡0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-600">Monto I.V.A.:</span>
              <span className="text-medium text-gray-800">₡{totalIVA.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-xl text-gray-700">
              <span>Total:</span>
              <span className='text-blue-950'>₡{totalVenta.toFixed(2)}</span>
            </div>
          </div>
        </div>
              {/* Botón para abrir el modal */}
      <button
        className="mt-6 mb-1 py-2 px-4 text-white bg-sky-900 rounded-xl hover:bg-indigo-900 font-bold place-self-center"
        onClick={handleOpenModal}>
        Facturar
      </button>
      </div>



      {/* Modal que contiene el componente Factura */}
      <Modal isVisible={isModalOpen} onClose={handleCloseModal}>
        <Factura
          onClose={handleCloseModal}
          subtotal={subtotal}
          totalIVA={totalIVA}
          totalVenta={totalVenta}
          carrito={carrito}
          selectedCliente={selectedCliente} // Pasar el objeto cliente completo
          setFacturaId={setFacturaId}
          precioUnitario={precioUnitario} // Pasar el precio unitario
           // Pasar la función para cerrar el modal
        />
      </Modal>
    </div>
  );
}

Detalle_facturas.propTypes = {
  subtotal: PropTypes.number.isRequired,
  totalIVA: PropTypes.number.isRequired,
  totalVenta: PropTypes.number.isRequired,
  carrito: PropTypes.array.isRequired,
  selectedCliente: PropTypes.object.isRequired, // Cambiar a objeto
  precioUnitario: PropTypes.number,
};
