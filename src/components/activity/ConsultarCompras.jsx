import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header.jsx';  // Importamos Header
import { Footer } from '../Footer.jsx';  // Importamos Footer

export function ConsultarCompras() {
  const navigate = useNavigate();

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
      
      <div className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Consultar Historial de Compras</h1>

        {/* Botones de acciones */}
        <div className="flex mb-4 space-x-4">
          <button
            onClick={handleRegistrarCompraManual}
            className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Registrar Compra Manual
          </button>
          <button
            onClick={handleReporteGeneral}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Reporte General
          </button>
        </div>

        {/* Tabla de compras */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left border-b">TipoDoc</th>
                <th className="py-3 px-6 text-left border-b">TipoIdent</th>
                <th className="py-3 px-6 text-left border-b">Nombre</th>
                <th className="py-3 px-6 text-left border-b">Moneda</th>
                <th className="py-3 px-6 text-left border-b">MontoTotal</th>
                <th className="py-3 px-6 text-left border-b">Total Descuentos</th>
                <th className="py-3 px-6 text-left border-b">Total Impuestos</th>
                <th className="py-3 px-6 text-left border-b">Fecha</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              <tr className="hover:bg-gray-100 transition">
                <td className="py-3 px-6 text-left">...</td>
                <td className="py-3 px-6 text-left">...</td>
                <td className="py-3 px-6 text-left">...</td>
                <td className="py-3 px-6 text-left">...</td>
                <td className="py-3 px-6 text-left">...</td>
                <td className="py-3 px-6 text-left">...</td>
                <td className="py-3 px-6 text-left">...</td>
                <td className="py-3 px-6 text-left">...</td>
              </tr>
              {/* Puedes hacer un map aquí para recorrer los datos */}
            </tbody>
          </table>
        </div>
        <Footer /> {/* Incluimos el Footer */}
      </div>
    </div>
  );
}
