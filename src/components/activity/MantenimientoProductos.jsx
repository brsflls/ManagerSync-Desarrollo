import { useState, useEffect } from 'react';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';

export function MantenimientoProductos() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioConsumidor, setPrecioConsumidor] = useState('');
  const [stock, setStock] = useState('');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProductos = () => {
    fetch('http://localhost/managersyncbdf/public/api/productos/all')
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching productos:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const precioCompraFloat = parseFloat(precioCompra);
    const precioConsumidorFloat = parseFloat(precioConsumidor);
    const stockInt = parseInt(stock, 10);

    if (isNaN(precioCompraFloat) || isNaN(precioConsumidorFloat) || isNaN(stockInt)) {
      console.error('Valores no válidos');
      return;
    }

    const producto = { 
      nombre, 
      descripcion, 
      precio_compra: precioCompraFloat,
      precio_consumidor: precioConsumidorFloat,
      stock: stockInt
    };

    fetch('http://localhost/managersyncbdf/public/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then(response => response.json())
      .then(data => {
        setNombre('');
        setDescripcion('');
        setPrecioCompra('');
        setPrecioConsumidor('');
        setStock('');
        fetchProductos(); // Refetch productos después de agregar
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (id) => {
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
  };

  const handleEdit = (producto) => {
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecioCompra(producto.precio_compra);
    setPrecioConsumidor(producto.precio_consumidor);
    setStock(producto.stock);
    setEditingProduct(producto.id);
    setModalVisible(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const precioCompraFloat = parseFloat(precioCompra);
    const precioConsumidorFloat = parseFloat(precioConsumidor);
    const stockInt = parseInt(stock, 10);

    if (isNaN(precioCompraFloat) || isNaN(precioConsumidorFloat) || isNaN(stockInt)) {
      console.error('Valores no válidos');
      return;
    }

    const updatedProduct = { 
      nombre, 
      descripcion, 
      precio_compra: precioCompraFloat,
      precio_consumidor: precioConsumidorFloat,
      stock: stockInt
    };

    fetch(`http://localhost/managersyncbdf/public/api/productos/${editingProduct}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => {
        if (response.ok) {
          fetchProductos(); // Refetch productos después de actualizar
          setModalVisible(false);
          setEditingProduct(null);
          setNombre('');
          setDescripcion('');
          setPrecioCompra('');
          setPrecioConsumidor('');
          setStock('');
        } else {
          console.error('Error al actualizar el producto', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <>
      <Header />
      <div className="bg-blue-100 w-screen h-max">
        <div className="mx-auto py-16 max-w-6xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Registrar Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Formulario para agregar productos */}
              <div>
                <label className="block text-gray-700 font-semibold">Nombre del producto</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Descripción</label>
                <textarea
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Precio de Compra</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={precioCompra}
                  onChange={(e) => setPrecioCompra(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Precio de Consumidor</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={precioConsumidor}
                  onChange={(e) => setPrecioConsumidor(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Cantidad en inventario</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNombre('');
                    setDescripcion('');
                    setPrecioCompra('');
                    setPrecioConsumidor('');
                    setStock('');
                  }}
                  className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <h2 className="text-xl font-semibold mt-10 mb-4">Productos Registrados</h2>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-left">Precio de Compra</th>
                <th className="p-3 text-left">Precio de Consumidor</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-b border-gray-200">
                  <td className="p-3">{producto.nombre}</td>
                  <td className="p-3">{producto.descripcion}</td>
                  <td className="p-3">{parseFloat(producto.precio_compra).toFixed(2)}</td>
                  <td className="p-3">{parseFloat(producto.precio_consumidor).toFixed(2)}</td>
                  <td className="p-3">{producto.stock}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(producto)} 
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(producto.id)} 
                      className="text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal para editar producto */}
          {modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold">Nombre del producto</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Descripción</label>
                    <textarea
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Precio de Compra</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={precioCompra}
                      onChange={(e) => setPrecioCompra(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Precio de Consumidor</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={precioConsumidor}
                      onChange={(e) => setPrecioConsumidor(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Cantidad en inventario</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Actualizar
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalVisible(false)}
                      className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
