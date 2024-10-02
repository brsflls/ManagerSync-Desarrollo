import React, { useState, useEffect } from 'react';

export function Finalizar({ emisorData, prodsServsData, exoneraData, refersData, totales, onTotalesChange }) {
  const [archivo, setArchivo] = useState(null);

  // Manejar cambios en los inputs de totales
  const handleTotalesChange = (e) => {
    const { name, value } = e.target;
    const floatValue = parseFloat(value) || 0.0; // Convertir a float, default 0
    const newTotales = { ...totales, [name]: floatValue };
    onTotalesChange(newTotales);

    // Calcular el total automáticamente
    if (name === 'subTotal' || name === 'descuentos' || name === 'impuestos') {
      const totalCalculado = (newTotales.subTotal - newTotales.descuentos + newTotales.impuestos).toFixed(2);
      onTotalesChange({ ...newTotales, total: parseFloat(totalCalculado) });
    }
  };

  // Manejar la selección de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setArchivo(selectedFile);
  };

  // Aplicar documento (simple simulación)
  const handleAplicarDocumento = () => {
    alert("Documento aplicado con éxito!");
    // Aquí podrías enviar los datos a un backend o realizar otra acción
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Finalizar Documento</h3>

      <h4 className="text-lg font-bold mb-4">Datos del Emisor:</h4>
      <p>Identificación: {emisorData?.identificacion}</p>
      <p>Nombre: {emisorData?.nombre}</p>

      {/* Productos y Servicios */}
      <h4 className="text-lg font-bold mb-4">Productos/Servicios:</h4>
      {prodsServsData?.length > 0 ? (
        <ul>
          {prodsServsData.map((prod, index) => (
            <li key={index}>
              {prod.descripcion} - {prod.cantidad} x {prod.precioBruto}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se han añadido productos o servicios.</p>
      )}

      {/* Subir Archivo */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Archivo PDF o imagen JPG del documento de compra (Opcional)
        </label>
        <input
          type="file"
          accept="image/jpeg, application/pdf"
          onChange={handleFileChange}
          className="w-full border-2 border-gray-300 rounded-lg p-2"
        />
        {archivo && (
          <p className="mt-2 text-gray-600">Archivo seleccionado: {archivo.name}</p>
        )}
      </div>

      {/* Totales del Documento */}
      <h4 className="text-lg font-bold mb-4">Totales del Documento</h4>

      <div className="grid grid-cols-2 gap-4">
        {/* SubTotal */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">SubTotal</label>
          <input
            type="number"
            name="subTotal"
            value={totales.subTotal}
            onChange={handleTotalesChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Impuestos */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Impuestos</label>
          <input
            type="number"
            name="impuestos"
            value={totales.impuestos}
            onChange={handleTotalesChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Descuentos */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Descuentos</label>
          <input
            type="number"
            name="descuentos"
            value={totales.descuentos}
            onChange={handleTotalesChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Total (calculado automáticamente) */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Total</label>
          <input
            type="number"
            name="total"
            value={totales.total}
            readOnly
            className="w-full border-2 border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>
      </div>

      {/* Botón para aplicar documento */}
      <div className="mt-6">
        <button
          onClick={handleAplicarDocumento}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Aplicar Documento
        </button>
      </div>
    </div>
  );
}
