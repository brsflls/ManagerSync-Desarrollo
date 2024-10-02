import React, { useState } from 'react';

export function Exonera() {
  // Estado para los datos del formulario y los errores
  const [formExoneraData, setFormExoneraData] = useState({
    numeroExoneracion: "",
    fechaEmision: "",
    tipoExoneracion: "Compras autorizadas",
    porcentaje: "0%",
    nombreInstitucion: "",
  });

  const [errors, setErrors] = useState({});

  // Manejar los cambios en los inputs del formulario
  const handleExoneraChange = (e) => {
    const { name, value } = e.target;

    // Validar que solo se ingresen números en "numeroExoneracion"
    if (name === "numeroExoneracion" && isNaN(value)) {
      setErrors({ ...errors, numeroExoneracion: "Este campo solo puede contener números" });
    } else {
      setFormExoneraData({ ...formExoneraData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validar el formulario antes de enviarlo
  const validateForm = () => {
    const newErrors = {};
    if (!formExoneraData.numeroExoneracion) newErrors.numeroExoneracion = "El número de exoneración es requerido.";
    if (!formExoneraData.fechaEmision) newErrors.fechaEmision = "La fecha de emisión es requerida.";
    if (!formExoneraData.nombreInstitucion) newErrors.nombreInstitucion = "El nombre de la institución es requerido.";
    return newErrors;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Datos del formulario enviados:", formExoneraData);
      // Lógica para enviar los datos a la API o backend
    } else {
      setErrors(newErrors);
      console.log("Errores en el formulario:", newErrors);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Exonera</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Número Doc. Exoneración */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Número Doc. Exoneración:</label>
            <input
              type="text"
              name="numeroExoneracion"
              value={formExoneraData.numeroExoneracion}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
            {errors.numeroExoneracion && <p className="text-red-500 text-sm">{errors.numeroExoneracion}</p>}
          </div>

          {/* Fecha de Emisión */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Fecha de Emisión:</label>
            <input
              type="date"
              name="fechaEmision"
              value={formExoneraData.fechaEmision}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
            {errors.fechaEmision && <p className="text-red-500 text-sm">{errors.fechaEmision}</p>}
          </div>

          {/* Tipo de Exoneración */}
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

          {/* Porcentaje */}
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
            <p className="text-gray-500 text-sm mt-1">[ En caso de exoneración total se debe colocar un 13% ]</p>
          </div>

          {/* Nombre Institución Exoneración */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Nombre Inst. Exoneración:</label>
            <input
              type="text"
              name="nombreInstitucion"
              value={formExoneraData.nombreInstitucion}
              onChange={handleExoneraChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
            {errors.nombreInstitucion && <p className="text-red-500 text-sm">{errors.nombreInstitucion}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mt-4"
        >
          Guardar Exoneración
        </button>
      </form>
    </div>
  );
}
