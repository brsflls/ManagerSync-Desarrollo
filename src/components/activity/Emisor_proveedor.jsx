import React, { useState, useEffect } from 'react';

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

  const [provincias, setProvincias] = useState([]);
  const [cantonesData, setCantonesData] = useState({});
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  // Cargar las provincias, cantones y distritos desde la API
  useEffect(() => {
    const fetchProvinciasCantonesDistritos = async () => {
      try {
        const response = await fetch(
          'https://services.arcgis.com/LjCtRQt1uf8M6LGR/arcgis/rest/services/Distritos_CR/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
        );
        const data = await response.json();
        console.log('Datos recibidos de la API:', data);

        // Procesamos los datos en un formato adecuado usando los nombres correctos de los campos
        const dataFormatted = data.features.reduce((acc, item) => {
          const { NOM_PROV, NOM_CANT, NOM_DIST } = item.attributes;

          // Si la provincia no está en el acumulador, la agregamos
          if (!acc[NOM_PROV]) {
            acc[NOM_PROV] = {};
          }

          // Si el cantón no está en la provincia, lo agregamos
          if (!acc[NOM_PROV][NOM_CANT]) {
            acc[NOM_PROV][NOM_CANT] = [];
          }

          // Agregamos el distrito al cantón
          acc[NOM_PROV][NOM_CANT].push(NOM_DIST);
          return acc;
        }, {});

        console.log('Datos formateados:', dataFormatted);

        setProvincias(Object.keys(dataFormatted)); // Establece las provincias en el estado
        setCantonesData(dataFormatted); // Guarda el objeto completo de provincias, cantones y distritos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProvinciasCantonesDistritos();
  }, []);

  // Manejar los cambios en los inputs del formulario de Emisor
  const handleEmisorChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formEmisorData, [name]: value };
    setFormEmisorData(updatedData);
    onChange(updatedData); // Pasar los datos al componente principal

    // Si el campo cambiado es "provincia", actualizar cantones
    if (name === "provincia") {
      console.log('Provincia seleccionada:', value);
      setCantones(Object.keys(cantonesData[value] || {})); // Accede al array de cantones de la provincia seleccionada
      setDistritos([]); // Reiniciar distritos cuando se cambie de provincia
    }

    // Si el campo cambiado es "canton", actualizar distritos
    if (name === "canton") {
      console.log('Cantón seleccionado:', value);
      setDistritos(cantonesData[formEmisorData.provincia]?.[value] || []);
    }
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
              {provincias.map((provincia) => (
                <option key={provincia} value={provincia}>{provincia}</option>
              ))}
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
              {cantones.map((canton) => (
                <option key={canton} value={canton}>{canton}</option>
              ))}
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
              {distritos.map((distrito) => (
                <option key={distrito} value={distrito}>{distrito}</option>
              ))}
            </select>
          </div>

          {/* Barrio */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Barrio:</label>
            <input
              type="text"
              name="barrio"
              value={formEmisorData.barrio}
              onChange={handleEmisorChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
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
