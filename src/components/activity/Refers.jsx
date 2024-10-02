import React, { useState } from 'react';

export function Refers() {
  // Estado para los datos de la referencia del documento
  const [referenciaData, setReferenciaData] = useState({
    tipoDocumento: "Factura electrónica",
    numeroDocumento: "",
    fechaDocumento: "",
    tipoReferencia: "Anula Documento de Referencia",
  });

  // Estado para almacenar todas las referencias agregadas
  const [referencias, setReferencias] = useState([]);

  // Manejar los cambios en los inputs del formulario
  const handleReferenciaChange = (e) => {
    const { name, value } = e.target;
    setReferenciaData({ ...referenciaData, [name]: value });
  };

  // Manejar el botón de agregar referencia
  const handleAgregarReferencia = (e) => {
    e.preventDefault();

    // Agregar la referencia al estado
    setReferencias([...referencias, referenciaData]);

    // Limpiar el formulario
    setReferenciaData({
      tipoDocumento: "Factura electrónica",
      numeroDocumento: "",
      fechaDocumento: "",
      tipoReferencia: "Anula Documento de Referencia",
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Referencias</h3>

      {/* Formulario para agregar una referencia */}
      <form onSubmit={handleAgregarReferencia}>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Tipo de Documento */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Tipo Documento</label>
            <select
              name="tipoDocumento"
              value={referenciaData.tipoDocumento}
              onChange={handleReferenciaChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
            >
              <option value="Factura electrónica">Factura electrónica</option>
              <option value="Tiquete">Tiquete</option>
              <option value="Nota de crédito">Nota de crédito</option>
              <option value="Nota de débito">Nota de débito</option>
            </select>
          </div>

          {/* Número de Documento */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Número Documento</label>
            <input
              type="text"
              name="numeroDocumento"
              value={referenciaData.numeroDocumento}
              onChange={handleReferenciaChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
              required
            />
          </div>

          {/* Fecha de Documento */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Fecha Documento</label>
            <input
              type="date"
              name="fechaDocumento"
              value={referenciaData.fechaDocumento}
              onChange={handleReferenciaChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
              required
            />
          </div>

          {/* Tipo de Referencia */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Tipo Referencia</label>
            <select
              name="tipoReferencia"
              value={referenciaData.tipoReferencia}
              onChange={handleReferenciaChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
            >
              <option value="Anula Documento de Referencia">Anula Documento de Referencia</option>
              <option value="Sustituye Documento de Referencia">Sustituye Documento de Referencia</option>
            </select>
          </div>
        </div>

        {/* Botón para agregar */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Agregar
        </button>
      </form>

      {/* Tabla para mostrar las referencias agregadas */}
      {referencias.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold mb-2">Referencias Agregadas</h4>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Tipo Documento</th>
                <th className="border border-gray-300 px-4 py-2">Número Documento</th>
                <th className="border border-gray-300 px-4 py-2">Fecha Documento</th>
                <th className="border border-gray-300 px-4 py-2">Tipo Referencia</th>
              </tr>
            </thead>
            <tbody>
              {referencias.map((ref, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{ref.tipoDocumento}</td>
                  <td className="border border-gray-300 px-4 py-2">{ref.numeroDocumento}</td>
                  <td className="border border-gray-300 px-4 py-2">{ref.fechaDocumento}</td>
                  <td className="border border-gray-300 px-4 py-2">{ref.tipoReferencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {referencias.length === 0 && (
        <div className="mt-4 text-gray-600">No ha seleccionado referencias para el documento</div>
      )}
    </div>
  );
}
