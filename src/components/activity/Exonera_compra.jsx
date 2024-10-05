import React, { useState } from 'react';

export function Exonera({ onChange }) {
  const [formExoneraData, setFormExoneraData] = useState({
    numeroExoneracion: "",
    fechaEmision: "",
    tipoExoneracion: "Compras autorizadas",
    porcentaje: "0%",
    nombreInstitucion: "",
  });

  const handleExoneraChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formExoneraData, [name]: value };
    setFormExoneraData(updatedData);
    onChange(updatedData); // Pasar los datos al componente principal automáticamente
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Exonera</h3>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Número Doc. Exoneración:</label>
            <input
              type="text"
              name="numeroExoneracion"
              value={formExoneraData.numeroExoneracion}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Fecha de Emisión:</label>
            <input
              type="date"
              name="fechaEmision"
              value={formExoneraData.fechaEmision}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Tipo de Exoneración:</label>
            <select
              name="tipoExoneracion"
              value={formExoneraData.tipoExoneracion}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="Compras autorizadas">Compras autorizadas</option>
              <option value="Donaciones">Donaciones</option>
              <option value="Entidades públicas">Entidades públicas</option>
              <option value="Organizaciones sin fines de lucro">Organizaciones sin fines de lucro</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Porcentaje:</label>
            <select
              name="porcentaje"
              value={formExoneraData.porcentaje}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="0%">0%</option>
              <option value="13%">13%</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Nombre Inst. Exoneración:</label>
            <input
              type="text"
              name="nombreInstitucion"
              value={formExoneraData.nombreInstitucion}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
