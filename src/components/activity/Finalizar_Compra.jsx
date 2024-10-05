import React, { useState } from 'react';

export function Finalizar({ inicioData, emisorData, prodsServsData, exoneraData, refersData, totales, onTotalesChange }) {
  const [archivo, setArchivo] = useState(null);

  // Manejar cambios en los inputs de totales
  const handleTotalesChange = (e) => {
    const { name, value } = e.target;
    const floatValue = parseFloat(value) || 0.0;
    const newTotales = { ...totales, [name]: floatValue };
    onTotalesChange(newTotales);

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

  // Aplicar documento (enviar datos al backend)
  const handleAplicarDocumento = async () => {
    const allData = {
      inicio: inicioData,
      emisor: emisorData,
      productosServicios: prodsServsData,
      exonera: exoneraData,
      referencias: refersData,
      totales,
      archivo: archivo ? archivo.name : null, // Opcional
    };

    try {
      const response = await fetch('http://localhost/managersyncbdf/public/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(allData),
      });

      const result = await response.json();

      if (response.ok) {
        // Mostrar ventana de éxito
        alert("Factura de compra generada con éxito!");

        // Otras acciones si lo necesitas (ej: limpiar el formulario o redirigir)
      } else {
        console.error('Error al crear la factura', result);
        alert("Error al aplicar documento");
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      alert("Error de red");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Finalizar Documento</h3>

      {/* Mostrar datos del Inicio */}
      <h4 className="text-lg font-bold mb-4">Datos de Inicio:</h4>
      <p>Condición de Venta: {inicioData?.condicionVenta}</p>
      <p>Moneda: {inicioData?.moneda}</p>
      <p>Plazo: {inicioData?.plazo}</p>
      <p>Tipo de Cambio: {inicioData?.tipoCambio}</p>
      <p>Observación: {inicioData?.observacion}</p>
      <p>Tipo de Compra: {inicioData?.tipoCompra}</p>

      {/* Mostrar datos del Emisor */}
      <h4 className="text-lg font-bold mb-4">Datos del Emisor:</h4>
      <p>Identificación: {emisorData?.identificacion}</p>
      <p>Nombre: {emisorData?.nombre}</p>
      <p>Teléfono: {emisorData?.telefono}</p>
      <p>Correo Electrónico: {emisorData?.correoElectronico}</p>
      <p>Provincia: {emisorData?.provincia}</p>
      <p>Cantón: {emisorData?.canton}</p>
      <p>Distrito: {emisorData?.distrito}</p>
      <p>Barrio: {emisorData?.barrio}</p>

      {/* Mostrar Productos y Servicios */}
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

      {/* Mostrar datos de Exoneración */}
      <h4 className="text-lg font-bold mb-4">Exoneración:</h4>
      <p>Número Doc. Exoneración: {exoneraData?.numeroExoneracion}</p>
      <p>Fecha de Emisión: {exoneraData?.fechaEmision}</p>
      <p>Tipo de Exoneración: {exoneraData?.tipoExoneracion}</p>
      <p>Porcentaje: {exoneraData?.porcentaje}</p>
      <p>Nombre Institución: {exoneraData?.nombreInstitucion}</p>

      {/* Mostrar datos de Referencias */}
      <h4 className="text-lg font-bold mb-4">Referencias:</h4>
      {refersData?.length > 0 ? (
        <ul>
          {refersData.map((ref, index) => (
            <li key={index}>
              {ref.tipoDocumento} - {ref.numeroDocumento} - {ref.fechaDocumento}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se han añadido referencias.</p>
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