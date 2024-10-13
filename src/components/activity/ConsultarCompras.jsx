import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header.jsx';  // Importamos Header
import { Footer } from '../Footer.jsx';  // Importamos Footer
import { Sidebar } from '../Sidebar.jsx';
import { useAccountManagement } from '../hooks/useAccountManagement'; // Importa el hook

export function ConsultarCompras() {
  const navigate = useNavigate();
  const { logout } = useAccountManagement(); // Usa el hook para obtener la función logout
  const [compras, setCompras] = useState([]); // Estado para almacenar las compras
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las compras desde la API
  const fetchCompras = async () => {
    try {
      const response = await fetch('http://localhost/managersyncbdf/public/api/compras/all');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json(); // Parseamos la respuesta como JSON
      setCompras(data); // Guardamos las compras en el estado
      setLoading(false); // Deshabilitamos el estado de carga
    } catch (error) {
      console.error('Error fetching compras:', error);
      setError(error.message); // Guardamos el error en el estado
      setLoading(false); // Deshabilitamos el estado de carga
    }
  };

  // Llamar a la función para obtener las compras cuando el componente se monte
  useEffect(() => {
    fetchCompras();
  }, []);

  // Función para redirigir a la vista de Compras
  const handleRegistrarCompraManual = () => {
    navigate('/Compras');  // Redirigir a la ruta del módulo Compras
  };

  // Función para redirigir a la vista de Reporte General
  const handleReporteGeneral = () => {
    navigate('/Reporte_general');  // Redirigir a la ruta del módulo Reporte General
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header /> {/* Incluimos el Header */}
      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/5 bg-gray-200 h-full">
          <Sidebar logout={logout} />
        </div>
        
        {/* Contenido principal */}
        <div className="w-4/5 flex-grow container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Consultar Historial de Compras</h1>

          {/* Botones de acciones */}
          <div className="flex mb-8 space-x-4">
            <button
              onClick={handleRegistrarCompraManual}
              className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
            >
              Registrar Compra Manual
            </button>
            <button
              onClick={handleReporteGeneral}
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Reporte General
            </button>
          </div>

          {/* Mostrar el estado de carga o error */}
          {loading && <p className="text-center">Cargando compras...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {/* Tabla de compras */}
          {!loading && !error && (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left border-b">Condición Venta</th>
                    <th className="py-3 px-6 text-left border-b">Moneda</th>
                    <th className="py-3 px-6 text-left border-b">Tipo Identificación</th>
                    <th className="py-3 px-6 text-left border-b">Identificación</th>
                    <th className="py-3 px-6 text-left border-b">Nombre</th>
                    <th className="py-3 px-6 text-left border-b">Tipo Cambio</th>
                    <th className="py-3 px-6 text-left border-b">Tipo Compra</th>
                    <th className="py-3 px-6 text-left border-b">Plazo</th>
                    <th className="py-3 px-6 text-left border-b">Observación</th>
                    <th className="py-3 px-6 text-left border-b">Subtotal</th>
                    <th className="py-3 px-6 text-left border-b">Impuestos</th>
                    <th className="py-3 px-6 text-left border-b">Descuentos</th>
                    <th className="py-3 px-6 text-left border-b">Total</th>
                    <th className="py-3 px-6 text-left border-b">Número Exoneración</th>
                    <th className="py-3 px-6 text-left border-b">Tipo Exoneración</th>
                    <th className="py-3 px-6 text-left border-b">Institución Exoneración</th>
                    <th className="py-3 px-6 text-left border-b">Fecha Creación</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {compras.map((compra, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-6 text-left">{compra.condicion_venta}</td>
                      <td className="py-3 px-6 text-left">{compra.moneda}</td>
                      <td className="py-3 px-6 text-left">{compra.tipo_identificacion}</td>
                      <td className="py-3 px-6 text-left">{compra.identificacion}</td>
                      <td className="py-3 px-6 text-left">{compra.nombre}</td>
                      <td className="py-3 px-6 text-left">{compra.tipo_cambio}</td>
                      <td className="py-3 px-6 text-left">{compra.tipo_compra}</td>
                      <td className="py-3 px-6 text-left">{compra.plazo}</td>
                      <td className="py-3 px-6 text-left">{compra.observacion}</td>
                      <td className="py-3 px-6 text-left">{compra.sub_total}</td>
                      <td className="py-3 px-6 text-left">{compra.impuestos}</td>
                      <td className="py-3 px-6 text-left">{compra.descuentos}</td>
                      <td className="py-3 px-6 text-left">{compra.total}</td>
                      <td className="py-3 px-6 text-left">{compra.numero_exoneracion}</td>
                      <td className="py-3 px-6 text-left">{compra.tipo_exoneracion}</td>
                      <td className="py-3 px-6 text-left">{compra.nombre_institucion_exoneracion}</td>
                      <td className="py-3 px-6 text-left">{compra.fecha_creacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Footer fijo al final de la página */}
      <footer className="bg-gray-200 py-4 text-center w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
