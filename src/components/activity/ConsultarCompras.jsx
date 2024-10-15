import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header.jsx';  // Importamos Header
import { Footer } from '../Footer.jsx';  // Importamos Footer
import { Sidebar } from '../Sidebar.jsx';
import { useAccountManagement } from '../hooks/useAccountManagement'; // Importa el hook
import jsPDF from "jspdf";  // Importa jsPDF para generar el PDF

export function ConsultarCompras() {
  const navigate = useNavigate();
  const { logout } = useAccountManagement(); // Usa el hook para obtener la función logout
  const [compras, setCompras] = useState([]); // Estado para almacenar las compras
  const [filteredCompras, setFilteredCompras] = useState([]); // Estado para almacenar las compras filtradas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [searchQuery, setSearchQuery] = useState(''); // Estado para manejar la búsqueda
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
  const [selectedCompra, setSelectedCompra] = useState(null); // Estado para almacenar la compra seleccionada para edición

  // Función para obtener las compras desde la API
  const fetchCompras = async () => {
    try {
      const response = await fetch('http://localhost/managersyncbdf/public/api/compras/all');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json(); // Parseamos la respuesta como JSON
      setCompras(data); // Guardamos las compras en el estado
      setFilteredCompras(data); // Inicialmente, las compras filtradas son todas
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

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredCompras(compras); // Restablecer las compras filtradas si el campo de búsqueda está vacío
    } else {
      const filtered = compras.filter((compra) =>
        compra.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
        compra.identificacion.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredCompras(filtered); // Actualizar el estado de compras filtradas
    }
  };

  // Función para redirigir a la vista de Compras
  const handleRegistrarCompraManual = () => {
    navigate('/Compras');  // Redirigir a la ruta del módulo Compras
  };

  // Función para redirigir a la vista de Reporte General
  const handleReporteGeneral = () => {
    navigate('/Reporte_general');  // Redirigir a la ruta del módulo Reporte General
  };

  // Función para eliminar una factura
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta factura?')) {
      fetch(`http://localhost/managersyncbdf/public/api/compras/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            fetchCompras(); // Refetch compras después de eliminar
          } else {
            console.error('Error al eliminar la factura', response.statusText);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  // Función para abrir el modal de edición
  const handleEdit = (compra) => {
    setSelectedCompra(compra); // Almacenar la compra seleccionada en el estado
    setModalVisible(true); // Mostrar el modal
  };

  // Función para manejar la actualización de la compra
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost/managersyncbdf/public/api/compras/${selectedCompra.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedCompra), // Enviar los datos actualizados
    })
      .then(response => {
        if (response.ok) {
          fetchCompras(); // Refetch compras después de actualizar
          setModalVisible(false); // Ocultar el modal
        } else {
          console.error('Error al actualizar la factura', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // Función para manejar los cambios en los inputs del modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCompra({ ...selectedCompra, [name]: value }); // Actualizar el estado de la compra seleccionada
  };

  // Nueva función para descargar la factura en formato estilo tiquete
  const handleDownloadTicket = (compra) => {
    const doc = new jsPDF({
      unit: 'mm',
      format: [80, 200], // tamaño pequeño de recibo estilo tiquete
    });
  
    doc.setFontSize(10);
    doc.text("Factura de Compra", 10, 10);
    doc.text(`ID Factura: ${compra.id}`, 10, 20);
    doc.text(`Condición Venta: ${compra.condicion_venta}`, 10, 30);
    doc.text(`Moneda: ${compra.moneda}`, 10, 40);
    doc.text(`Tipo Identificación: ${compra.tipo_identificacion}`, 10, 50);
    doc.text(`Identificación: ${compra.identificacion}`, 10, 60);
    doc.text(`Nombre: ${compra.nombre}`, 10, 70);
    doc.text(`Tipo Cambio: ${compra.tipo_cambio}`, 10, 80);
    doc.text(`Tipo Compra: ${compra.tipo_compra}`, 10, 90);
    doc.text(`Plazo: ${compra.plazo}`, 10, 100);
    doc.text(`Observación: ${compra.observacion || 'N/A'}`, 10, 110);
  
    // Convertir valores a números si es necesario
    const subTotal = parseFloat(compra.sub_total) || 0;
    const impuestos = parseFloat(compra.impuestos) || 0;
    const descuentos = parseFloat(compra.descuentos) || 0;
    const total = parseFloat(compra.total) || 0;
  
    doc.text(`Subtotal: ${subTotal.toFixed(2)}`, 10, 120);
    doc.text(`Impuestos: ${impuestos.toFixed(2)}`, 10, 130);
    doc.text(`Descuentos: ${descuentos.toFixed(2)}`, 10, 140);
    doc.text(`Total: ${total.toFixed(2)}`, 10, 150);
  
    doc.text(`Número Exoneración: ${compra.numero_exoneracion || 'N/A'}`, 10, 160);
    doc.text(`Tipo Exoneración: ${compra.tipo_exoneracion || 'N/A'}`, 10, 170);
    doc.text(`Institución Exoneración: ${compra.nombre_institucion_exoneracion || 'N/A'}`, 10, 180);
  
    doc.text(`Fecha Creación: ${compra.fecha_creacion}`, 10, 190);
  
    // Guardar el PDF con un nombre único
    doc.save(`Factura_Compra_${compra.id}.pdf`);
  };
  
  return (
    <div className="bg-slate-300 h-400 flex flex-col">
      <Header /> {/* Incluimos el Header */}

      <div className="flex flex-grow flex-grid">
        {/* Sidebar */}
        <div className=" basis-1/4 md:basis-1/3 h-full">
          <Sidebar logout={logout} />
        </div>

        {/* Contenido principal */}
        <div className=" basis-1/2 flex-initial md:basis-1/3 flex-grow container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Consultar Historial de Compras</h1>

          {/* Campo de búsqueda */}
          <div className="mb-4 ">
            <input
              type="text"
              placeholder="Buscar por nombre o identificación"
              className="italic w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

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

          {/* Mostrar mensaje si no hay compras registradas */}
          {!loading && filteredCompras.length === 0 && (
            <p className="text-center text-gray-600 font-semibold">No hay compras registradas</p>
          )}

          {/* Tabla de compras */}
          {!loading && filteredCompras.length > 0 && (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left border-b">ID Factura</th>
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
                    <th className="py-3 px-6 text-left border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {filteredCompras.map((compra, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-6 text-left">{compra.id}</td>
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
                      <td className="py-3 px-6 text-left">
                        <button 
                          onClick={() => handleEdit(compra)} 
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(compra.id)} 
                          className="text-red-500 hover:underline mr-2"
                        >
                          Eliminar
                        </button>
                        <button 
                          onClick={() => handleDownloadTicket(compra)} 
                          className="text-green-500 hover:underline"
                        >
                          Descargar Tiquete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal para editar la compra */}
      {modalVisible && selectedCompra && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/2 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Editar Compra</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4 space-y-4">
              {/* Input para Condición Venta */}
              <div>
                <label className="block text-gray-700 font-semibold">Condición Venta</label>
                <input
                  type="text"
                  name="condicion_venta"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.condicion_venta || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Moneda */}
              <div>
                <label className="block text-gray-700 font-semibold">Moneda</label>
                <input
                  type="text"
                  name="moneda"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.moneda || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Tipo Identificación */}
              <div>
                <label className="block text-gray-700 font-semibold">Tipo Identificación</label>
                <input
                  type="text"
                  name="tipo_identificacion"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.tipo_identificacion || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Identificación */}
              <div>
                <label className="block text-gray-700 font-semibold">Identificación</label>
                <input
                  type="text"
                  name="identificacion"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.identificacion || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Nombre */}
              <div>
                <label className="block text-gray-700 font-semibold">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.nombre || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Tipo de Cambio */}
              <div>
                <label className="block text-gray-700 font-semibold">Tipo Cambio</label>
                <input
                  type="number"
                  name="tipo_cambio"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.tipo_cambio || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Subtotal */}
              <div>
                <label className="block text-gray-700 font-semibold">Subtotal</label>
                <input
                  type="number"
                  name="sub_total"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.sub_total || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Impuestos */}
              <div>
                <label className="block text-gray-700 font-semibold">Impuestos</label>
                <input
                  type="number"
                  name="impuestos"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.impuestos || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Descuentos */}
              <div>
                <label className="block text-gray-700 font-semibold">Descuentos</label>
                <input
                  type="number"
                  name="descuentos"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompra.descuentos || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-2 flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-600 transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer fijo al final de la página */}
      <footer className="bg-gray-200 py-4 text-center mt-9 w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
