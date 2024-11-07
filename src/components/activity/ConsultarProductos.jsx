import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header.jsx';  // Importamos Header
import { Footer } from '../Footer.jsx';  // Importamos Footer
import { Sidebar } from '../Sidebar.jsx';
import { useAccountManagement } from '../hooks/useAccountManagement'; // Importa el hook

export function HistorialInventario() {
  const navigate = useNavigate();
  const { logout } = useAccountManagement(); // Usa el hook para obtener la función logout
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [filteredProductos, setFilteredProductos] = useState([]); // Estado para almacenar los productos filtrados
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [searchQuery, setSearchQuery] = useState(''); // Estado para manejar la búsqueda
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
  const [selectedProducto, setSelectedProducto] = useState(null); // Estado para almacenar el producto seleccionado para edición

  // Función para obtener los productos desde la API
  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost/managersyncbdf/public/api/productos/all');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json(); // Parseamos la respuesta como JSON
      setProductos(data); // Guardamos los productos en el estado
      setFilteredProductos(data); // Inicialmente, los productos filtrados son todos
      setLoading(false); // Deshabilitamos el estado de carga
    } catch (error) {
      console.error('Error fetching productos:', error);
      setError(error.message); // Guardamos el error en el estado
      setLoading(false); // Deshabilitamos el estado de carga
    }
  };

  // Llamar a la función para obtener los productos cuando el componente se monte
  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredProductos(productos); // Restablecer los productos filtrados si el campo de búsqueda está vacío
    } else {
      const filtered = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
        producto.codigo_producto.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProductos(filtered); // Actualizar el estado de productos filtrados
    }
  };

  // Función para eliminar un producto
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      fetch(`http://localhost/managersyncbdf/public/api/productos/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            fetchProductos(); // Refetch productos después de eliminar
          } else {
            console.error('Error al eliminar el producto', response.statusText);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  // Función para abrir el modal de edición
  const handleEdit = (producto) => {
    setSelectedProducto(producto); // Almacenar el producto seleccionado en el estado
    setModalVisible(true); // Mostrar el modal
  };

  // Función para manejar la actualización del producto
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost/managersyncbdf/public/api/productos/${selectedProducto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedProducto), // Enviar los datos actualizados
    })
      .then(response => {
        if (response.ok) {
          fetchProductos(); // Refetch productos después de actualizar
          setModalVisible(false); // Ocultar el modal
        } else {
          console.error('Error al actualizar el producto', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // Función para manejar los cambios en los inputs del modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProducto({ ...selectedProducto, [name]: value }); // Actualizar el estado del producto seleccionado
  };

  return (
    <>
    <Header/>
    <div className="bg-slate-300  w-screen flex h-max  gap-0">
      
      
      
        {/* Sidebar */}
        <div className="basis-1/4 mr-4 h-full">
          <Sidebar logout={logout} />
        </div>
        
        {/* Contenido principal */}
        <div className="basis-2/4 py-2 pt-12 mx-auto p-6 pb-14 mt-6 ml-5 mb-4 bg-white rounded-lg shadow-lg h-min">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Historial de Inventario</h1>

          {/* Campo de búsqueda */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre o código de producto"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 mb-5"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Mostrar el estado de carga o error */}
          {loading && <p className="text-center">Cargando productos...</p>}
          {error && <p className="text-center text-pink-800">Error: {error}</p>}

          {/* Mostrar mensaje si no hay productos registrados */}
          {!loading && filteredProductos.length === 0 && (
            <p className="text-center text-gray-600 font-semibold mt-4">No hay productos registrados</p>
          )}

          {/* Tabla de productos */}
          {!loading && filteredProductos.length > 0 && (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left border-b">Código Producto</th>
                    <th className="py-3 px-6 text-left border-b">Nombre</th>
                    <th className="py-3 px-6 text-left border-b">Descripción</th>
                    <th className="py-3 px-6 text-left border-b">Stock</th>
                    <th className="py-3 px-6 text-left border-b">Precio de Compra</th>
                    <th className="py-3 px-6 text-left border-b">Precio de Venta</th>
                    <th className="py-3 px-6 text-left border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {filteredProductos.map((producto, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-6 text-left">{producto.codigo_producto}</td>
                      <td className="py-3 px-6 text-left">{producto.nombre}</td>
                      <td className="py-3 px-6 text-left">{producto.descripcion}</td>
                      <td className="py-3 px-6 text-left">{producto.stock}</td>
                      <td className="py-3 px-6 text-left">{producto.precio_compra}</td>
                      <td className="py-3 px-6 text-left">{producto.precio_consumidor}</td>
                      <td className="py-3 px-6 text-left">
                        <button 
                          onClick={() => handleEdit(producto)} 
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(producto.id)} 
                          className="text-pink-700 hover:underline"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      

      {/* Modal para editar el producto */}
      {modalVisible && selectedProducto && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/2 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4 space-y-4">
              {/* Input para Código de Producto */}
              <div>
                <label className="block text-gray-700 font-semibold">Código Producto</label>
                <input
                  type="text"
                  name="codigo_producto"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProducto.codigo_producto || ''}
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
                  value={selectedProducto.nombre || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Descripción */}
              <div>
                <label className="block text-gray-700 font-semibold">Descripción</label>
                <textarea
                  name="descripcion"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProducto.descripcion || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Stock */}
              <div>
                <label className="block text-gray-700 font-semibold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProducto.stock || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Precio de Compra */}
              <div>
                <label className="block text-gray-700 font-semibold">Precio de Compra</label>
                <input
                  type="number"
                  name="precio_compra"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProducto.precio_compra || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Input para Precio de Venta */}
              <div>
                <label className="block text-gray-700 font-semibold">Precio de Venta</label>
                <input
                  type="number"
                  name="precio_venta"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProducto.precio_consumidor || ''}
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
    </div>
      {/* Footer fijo al final de la página */}
      <footer className="text-center w-full mt-auto">
        <Footer />
      </footer>
    
  </>
  );
}
