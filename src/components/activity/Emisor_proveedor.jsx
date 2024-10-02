import React, { useState } from 'react';

export function Emisor({ onChange }) {
  // Estado para los datos del formulario de Emisor
  const [formEmisorData, setFormEmisorData] = useState({
    identificacion: "",
    tipoIdentificacion: "Cédula Física",
    telefono: "",
    nombre: "",
    correoElectronico: "",
    direccionExacta: "",
    provincia: "No aplica",
    canton: "No aplica",
    distrito: "No aplica",
    barrio: "No aplica",
  });

  // Manejar los cambios en los inputs del formulario de Emisor
  const handleEmisorChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formEmisorData, [name]: value };
    setFormEmisorData(updatedData);
    onChange(updatedData); // Pasar los datos al componente principal
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Emisor</h3>
      <form>
        <div className="grid grid-cols-2 gap-4">
          {/* Identificación */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Identificación:</label>
            <input
              type="text"
              name="identificacion"
              value={formEmisorData.identificacion}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Tipo de Identificación */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Tipo Identificación:</label>
            <select
              name="tipoIdentificacion"
              value={formEmisorData.tipoIdentificacion}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="Cédula Física">Cédula Física</option>
              <option value="Cédula Jurídica">Cédula Jurídica</option>
              <option value="DIMEX">DIMEX</option>
              <option value="NITE">NITE</option>
            </select>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formEmisorData.telefono}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formEmisorData.nombre}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Correo Electrónico (Informativo):</label>
            <input
              type="email"
              name="correoElectronico"
              value={formEmisorData.correoElectronico}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Dirección Exacta */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Dirección Exacta:</label>
            <input
              type="text"
              name="direccionExacta"
              value={formEmisorData.direccionExacta}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Provincia */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Provincia:</label>
            <select
              name="provincia"
              value={formEmisorData.provincia}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="No aplica">No aplica</option>
              <option value="San José">San José</option>
              <option value="Alajuela">Alajuela</option>
              <option value="Cartago">Cartago</option>
              <option value="Heredia">Heredia</option>
              <option value="Guanacaste">Guanacaste</option>
              <option value="Puntarenas">Puntarenas</option>
              <option value="Limón">Limón</option>
            </select>
          </div>

          {/* Cantón */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Cantón:</label>
            <select
              name="canton"
              value={formEmisorData.canton}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="No aplica">No aplica</option>
              {/* Aquí puedes agregar los cantones */}
            </select>
          </div>

          {/* Distrito */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Distrito:</label>
            <select
              name="distrito"
              value={formEmisorData.distrito}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="No aplica">No aplica</option>
              {/* Aquí puedes agregar los distritos */}
            </select>
          </div>

          {/* Barrio */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Barrio:</label>
            <select
              name="barrio"
              value={formEmisorData.barrio}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="No aplica">No aplica</option>
              {/* Aquí puedes agregar los barrios */}
            </select>
          </div>
        </div>

        {/* Botón para enviar */}
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mt-4">
          Guardar Emisor
        </button>
      </form>
    </div>
  );
}
