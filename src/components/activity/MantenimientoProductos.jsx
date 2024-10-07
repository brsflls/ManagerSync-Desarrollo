import { useState, useEffect } from 'react';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import { BackgroundAnimation } from './Background.jsx'; // Importar el componente de animación

export function MantenimientoProductos() {
  const [codigoProducto, setCodigoProducto] = useState(''); // Código de Producto
  const [codigoCabys, setCodigoCabys] = useState(''); // Código CABYS
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioConsumidor, setPrecioConsumidor] = useState('');
  const [stock, setStock] = useState(''); // Cantidad en inventario
  const [unidadMedida, setUnidadMedida] = useState('');
  const [pesoPorUnidad, setPesoPorUnidad] = useState(''); // Peso por unidad
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);
  const [porcentajeIVA, setPorcentajeIVA] = useState(0);
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
    const pesoPorUnidadFloat = parseFloat(pesoPorUnidad); // Convertir a float

    if (isNaN(precioCompraFloat) || isNaN(precioConsumidorFloat) || isNaN(stockInt) || isNaN(pesoPorUnidadFloat)) {
      console.error('Valores no válidos');
      return;
    }

    const pesoNetoFloat = pesoPorUnidadFloat * stockInt; // Calcular peso neto

    const producto = { 
      codigo_producto: codigoProducto,
      codigo_cabys: codigoCabys,
      nombre, 
      descripcion, 
      precio_compra: precioCompraFloat,
      precio_consumidor: precioConsumidorFloat,
      stock: stockInt,
      unidad_medida: unidadMedida,
      peso_por_unidad: pesoPorUnidadFloat, // Agregar peso por unidad
      peso_neto: pesoNetoFloat, // Agregar peso neto calculado
      porcentaje_descuento: porcentajeDescuento,
      porcentaje_iva: porcentajeIVA,
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
        // Resetear todos los campos
        setCodigoProducto('');
        setCodigoCabys('');
        setNombre('');
        setDescripcion('');
        setPrecioCompra('');
        setPrecioConsumidor('');
        setStock('');
        setUnidadMedida('');
        setPesoPorUnidad(''); // Resetear peso por unidad
        setPorcentajeDescuento(0);
        setPorcentajeIVA(0);
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
    setCodigoProducto(producto.codigo_producto); // Setear código de producto
    setCodigoCabys(producto.codigo_cabys); // Setear código CABYS
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecioCompra(producto.precio_compra);
    setPrecioConsumidor(producto.precio_consumidor);
    setStock(producto.stock);
    setUnidadMedida(producto.unidad_medida);
    setPesoPorUnidad(producto.peso_por_unidad); // Setear peso por unidad
    setPorcentajeDescuento(producto.porcentaje_descuento);
    setPorcentajeIVA(producto.porcentaje_iva);
    setEditingProduct(producto.id);
    setModalVisible(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const precioCompraFloat = parseFloat(precioCompra);
    const precioConsumidorFloat = parseFloat(precioConsumidor);
    const stockInt = parseInt(stock, 10);
    const pesoPorUnidadFloat = parseFloat(pesoPorUnidad); // Convertir a float

    if (isNaN(precioCompraFloat) || isNaN(precioConsumidorFloat) || isNaN(stockInt) || isNaN(pesoPorUnidadFloat)) {
      console.error('Valores no válidos');
      return;
    }

    const pesoNetoFloat = pesoPorUnidadFloat * stockInt; // Calcular peso neto

    const updatedProduct = { 
      codigo_producto: codigoProducto,
      codigo_cabys: codigoCabys,
      nombre, 
      descripcion, 
      precio_compra: precioCompraFloat,
      precio_consumidor: precioConsumidorFloat,
      stock: stockInt,
      unidad_medida: unidadMedida,
      peso_por_unidad: pesoPorUnidadFloat, // Agregar peso por unidad
      peso_neto: pesoNetoFloat, // Agregar peso neto calculado
      porcentaje_descuento: porcentajeDescuento,
      porcentaje_iva: porcentajeIVA,
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
          // Resetear todos los campos
          setCodigoProducto('');
          setCodigoCabys('');
          setNombre('');
          setDescripcion('');
          setPrecioCompra('');
          setPrecioConsumidor('');
          setStock('');
          setUnidadMedida('');
          setPesoPorUnidad(''); // Resetear peso por unidad
          setPorcentajeDescuento(0);
          setPorcentajeIVA(0);
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
      <div className="bg-slate-300 w-screen h-max">
        
        <div className="mx-auto py-16 max-w-6xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Registrar Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Formulario para agregar productos */}
              <div>
                <label className="block text-gray-700 font-semibold">Código CABYS</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={codigoCabys}
                  onChange={(e) => setCodigoCabys(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Código de Producto</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={codigoProducto}
                  onChange={(e) => setCodigoProducto(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Nombre del producto</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Descripción</label>
                <textarea
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={precioConsumidor}
                  onChange={(e) => setPrecioConsumidor(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Cantidad en inventario</label>
                <input
                  type="number"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Unidad de Medida</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={unidadMedida}
                  onChange={(e) => setUnidadMedida(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Peso por unidad</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={pesoPorUnidad}
                  onChange={(e) => setPesoPorUnidad(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">% Descuento</label>
                <input
                  type="number"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={porcentajeDescuento}
                  onChange={(e) => setPorcentajeDescuento(e.target.value)}
                  required
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">% IVA</label>
                <input
                  type="number"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={porcentajeIVA}
                  onChange={(e) => setPorcentajeIVA(e.target.value)}
                  required
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCodigoProducto(''); // Resetear campo
                    setCodigoCabys(''); // Resetear campo
                    setNombre('');
                    setDescripcion('');
                    setPrecioCompra('');
                    setPrecioConsumidor('');
                    setStock('');
                    setUnidadMedida('');
                    setPesoPorUnidad(''); // Resetear peso por unidad
                    setPorcentajeDescuento(0);
                    setPorcentajeIVA(0);
                  }}
                  className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-600 transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-center">Productos Registrados</h2>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">Código CABYS</th>
                <th className="p-3 text-left">Código de Producto</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-left">Precio de Compra</th>
                <th className="p-3 text-left">Precio de Consumidor</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Unidad de Medida</th>
                <th className="p-3 text-left">Peso por Unidad</th>
                <th className="p-3 text-left">Peso Neto</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-b border-gray-200">
                  <td className="p-3">{producto.codigo_cabys}</td>
                  <td className="p-3">{producto.codigo_producto}</td>
                  <td className="p-3">{producto.nombre}</td>
                  <td className="p-3">{producto.descripcion}</td>
                  <td className="p-3">{parseFloat(producto.precio_compra).toFixed(2)}</td>
                  <td className="p-3">{parseFloat(producto.precio_consumidor).toFixed(2)}</td>
                  <td className="p-3">{producto.stock}</td>
                  <td className="p-3">{producto.unidad_medida}</td>
                  <td className="p-3">{producto.peso_por_unidad}</td>
                  <td className="p-3">{(producto.peso_por_unidad * producto.stock).toFixed(2)}</td> {/* Calcular peso neto aquí */}
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
                    <label className="block text-gray-700 font-semibold">Código CABYS</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={codigoCabys}
                      onChange={(e) => setCodigoCabys(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Código de Producto</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={codigoProducto}
                      onChange={(e) => setCodigoProducto(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Nombre del producto</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Descripción</label>
                    <textarea
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={precioConsumidor}
                      onChange={(e) => setPrecioConsumidor(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Cantidad en inventario</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Unidad de Medida</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={unidadMedida}
                      onChange={(e) => setUnidadMedida(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Peso por unidad</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={pesoPorUnidad}
                      onChange={(e) => setPesoPorUnidad(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">% Descuento</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={porcentajeDescuento}
                      onChange={(e) => setPorcentajeDescuento(e.target.value)}
                      required
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">% IVA</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={porcentajeIVA}
                      onChange={(e) => setPorcentajeIVA(e.target.value)}
                      required
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="flex justify-between">
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
      </div>
      <Footer />
      <BackgroundAnimation />
    </>
  );
}
