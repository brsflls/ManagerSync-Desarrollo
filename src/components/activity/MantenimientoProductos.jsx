import { useState, useEffect } from 'react';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import { BackgroundAnimation } from './Background.jsx'; 
import { useAccountManagement } from '../hooks/useAccountManagement'; 
import { Sidebar } from '../Sidebar.jsx';

export function MantenimientoProductos() {
  const [codigoProducto, setCodigoProducto] = useState('');
  const [codigoCabys, setCodigoCabys] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioConsumidor, setPrecioConsumidor] = useState('');
  const [stock, setStock] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [pesoPorUnidad, setPesoPorUnidad] = useState('');
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);
  const [porcentajeIVA, setPorcentajeIVA] = useState(0);
  const [categoria, setCategoria] = useState(''); 
  const [productos, setProductos] = useState([]);
  const [cabysData, setCabysData] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [loadingCabys, setLoadingCabys] = useState(true);
  const [categorias, setCategorias] = useState([]); 
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); 
  const [editingProduct, setEditingProduct] = useState('');
  
  // Estado para paginación
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  const { logout } = useAccountManagement();

  const fetchProductos = () => {
    fetch('http://localhost/managersyncbdf/public/api/productos/all')
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        console.log('Productos:', data);
        setLoadingProductos(false);
      })
      .catch(error => {
        console.error('Error fetching productos:', error);
        setLoadingProductos(false);
      });
  };

  const fetchCabysData = () => {
    fetch('http://localhost/managersyncbdf/public/api/cabys-json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setCabysData(data.data);
          console.log('Datos CABYS:', data.data);
          const categorias = [...new Set(data.data.map(item => item.codigo_cabys_categoria_1))]; 
          setCategorias(categorias);
        } else {
          setCabysData([]);
        }
        setLoadingCabys(false);
      })
      .catch(error => {
        console.error('Error fetching CABYS data:', error);
        setLoadingCabys(false);
      });
  };

  useEffect(() => {
    fetchProductos();
    fetchCabysData();
  }, []);

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    setCurrentPage(0);
  };

  const filteredCabysData = cabysData.filter(item => 
    categoriaSeleccionada === '' || 
    item.codigo_cabys_categoria_1 === categoriaSeleccionada ||
    item.codigo_cabys_categoria_2 === categoriaSeleccionada || 
    item.codigo_cabys_categoria_3 === categoriaSeleccionada ||
    item.codigo_cabys_categoria_4 === categoriaSeleccionada ||
    item.codigo_cabys_categoria_5 === categoriaSeleccionada ||
    item.codigo_cabys_categoria_6 === categoriaSeleccionada ||
    item.codigo_cabys_categoria_7 === categoriaSeleccionada ||
    item.codigo_cabys_categoria_8 === categoriaSeleccionada ||
    item.codigo_cabys_categoria_9 === categoriaSeleccionada
  );

  // Filtrado de productos por término de búsqueda
  const filteredProductos = productos.filter(producto => 
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredCabysData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const clearForm = () => {
    setCodigoProducto('');
    setCodigoCabys('');
    setNombre('');
    setDescripcion('');
    setPrecioCompra('');
    setPrecioConsumidor('');
    setStock('');
    setUnidadMedida('');
    setPesoPorUnidad('');
    setPorcentajeDescuento(0);
    setPorcentajeIVA(0);
    setCategoria('');
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Asegúrate de que el producto existente se está manejando correctamente
  const productoExistente = productos.find((prod) => prod.codigo_producto === codigoProducto);

  // Definir los datos del producto
  const producto = {
    codigo_producto: codigoProducto,  // No eliminamos los ceros ni alteramos el ID
    codigo_cabys: codigoCabys,
    nombre,
    descripcion,
    precio_compra: parseFloat(precioCompra),
    precio_consumidor: parseFloat(precioConsumidor),
    stock: parseInt(stock, 10),
    unidad_medida: unidadMedida,
    peso_por_unidad: parseFloat(pesoPorUnidad),
    porcentaje_descuento: parseFloat(porcentajeDescuento),
    porcentaje_iva: parseFloat(porcentajeIVA),  // Asegúrate de enviar el porcentaje de IVA como número
    categoria
  };

  // Si el producto ya existe, se actualiza
  if (productoExistente) {
    fetch(`http://localhost/managersyncbdf/public/api/productos/${productoExistente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      return response.json();
    })
    .then(() => {
      clearForm();
      fetchProductos();
    })
    .catch(error => console.error('Error al actualizar producto:', error));
  } else {
    // Si no existe, se crea uno nuevo
    fetch('http://localhost/managersyncbdf/public/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al crear producto');
      }
      return response.json();
    })
    .then(() => {
      clearForm();
      fetchProductos();
    })
    .catch(error => console.error('Error al crear producto:', error));
  }
};

  
  const handleUpdate = () => {
    const precioCompraFloat = parseFloat(precioCompra);
    const precioConsumidorFloat = parseFloat(precioConsumidor);
    const stockInt = parseInt(stock, 10);
    const pesoPorUnidadFloat = parseFloat(pesoPorUnidad);

    if (isNaN(precioCompraFloat) || isNaN(precioConsumidorFloat) || isNaN(stockInt) || isNaN(pesoPorUnidadFloat)) {
      console.error('Valores no válidos');
      return;
    }

    const pesoNetoFloat = pesoPorUnidadFloat * stockInt;

    const updatedProduct = {
      codigo_producto: codigoProducto,
      codigo_cabys: codigoCabys,
      nombre,
      descripcion,
      precio_compra: precioCompraFloat,
      precio_consumidor: precioConsumidorFloat,
      stock: stockInt,
      unidad_medida: unidadMedida,
      peso_por_unidad: pesoPorUnidadFloat,
      peso_neto: pesoNetoFloat,
      porcentaje_descuento: porcentajeDescuento,
      porcentaje_iva: porcentajeIVA,
      categoria
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
          clearForm();
          fetchProductos();
        } else {
          console.error('Error al actualizar el producto', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost/managersyncbdf/public/api/productos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchProductos();
        } else {
          console.error('Error al eliminar el producto', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleEdit = (producto) => {
    setCodigoProducto(producto.codigo_producto);
    setCodigoCabys(producto.codigo_cabys);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecioCompra(producto.precio_compra);
    setPrecioConsumidor(producto.precio_consumidor);
    setStock(producto.stock);
    setUnidadMedida(producto.unidad_medida);
    setPesoPorUnidad(producto.peso_por_unidad);
    setPorcentajeDescuento(producto.porcentaje_descuento);
    setPorcentajeIVA(producto.porcentaje_iva);
    setCategoria(producto.categoria);
    setEditingProduct(producto.id);
  };
  const handleSelectCabys = (item, categoriaIndex) => {
    const descripcion = item[`descripcion_categoria_${categoriaIndex}`];
    const impuesto = parseFloat(item.impuesto) || 0;  // Asegurarte de que el impuesto sea un número
  
    setCodigoCabys(item[`codigo_cabys_categoria_${categoriaIndex}`] || '');  // Asegurarte de que el campo se llena correctamente
    setNombre(item.nombre || '');
    setDescripcion(descripcion || '');
    setPrecioCompra(item.precio_compra || '');  // Llenar con valores por defecto si no existen
    setPrecioConsumidor(item.precio_consumidor || '');
    setStock(item.stock || '');
    setUnidadMedida(item.unidad_medida || '');
    setPesoPorUnidad(item.peso_por_unidad || '');
    setCategoria(descripcion || '');
    setPorcentajeIVA(impuesto);  // Asegúrate de que el porcentaje de IVA se carga correctamente como número
  };
  
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < filteredCabysData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loadingProductos || loadingCabys) {
    return <p>Cargando datos...</p>;
  }

  return (
    <>
      <Header />
      <div className="bg-slate-300 w-screen h-max grid grid-cols-8">
        <div>
          <Sidebar logout={logout} />
        </div>
        <div className="mx-auto ps-5 py-16 max-w-6xl">
          <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Filtrar productos de CABYS por Categoría</h2>
            <select
              className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          {/* Barra de búsqueda */}
          <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Buscar Productos</h2>
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">{editingProduct ? 'Actualizar Producto' : 'Registrar Producto'}</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
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
  <select
    className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={unidadMedida}
    onChange={(e) => setUnidadMedida(e.target.value)}
    required
  >
    <option value="">Seleccionar Unidad de Medida</option>
    <option value="kg">Kilogramos (kg)</option>
    <option value="g">Gramos (g)</option>
    <option value="lb">Libras (lb)</option>
    <option value="oz">Onzas (oz)</option>
    <option value="l">Litros (l)</option>
    <option value="ml">Mililitros (ml)</option>
    <option value="cm">Centímetros (cm)</option>
    <option value="m">Metros (m)</option>
    <option value="in">Pulgadas (in)</option>
    <option value="ft">Pies (ft)</option>
  </select>
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
              <div>
                <label className="block text-gray-700 font-semibold">Categoría</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className={`bg-${editingProduct ? 'green' : 'blue'}-500 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-${editingProduct ? 'green' : 'blue'}-600 transition duration-200`}
                >
                  {editingProduct ? 'Actualizar' : 'Agregar'}
                </button>
                <button
                  type="button"
                  onClick={clearForm}
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
                <th className="p-3 text-left">Categoría</th>
                <th className="p-3 text-left">Impuesto</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
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
                  <td className="p-3">{(producto.peso_por_unidad * producto.stock).toFixed(2)}</td>
                  <td className="p-3">{producto.categoria}</td>
                  <td className="p-3">{typeof producto.porcentaje_iva === 'number' ? producto.porcentaje_iva.toFixed(2) : producto.porcentaje_iva}%</td>
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

          <h2 className="text-xl font-semibold mt-10 mb-4 text-center">Datos de CABYS</h2>
          <div className="grid grid-cols-2 gap-4">
            {paginatedData.map((item, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-lg">
                <h3 className="font-semibold">Categoría {index + 1}</h3>
                {Array.from({ length: 9 }, (_, i) => {
                  const categoriaIndex = i + 1;
                  const codigoCabys = item[`codigo_cabys_categoria_${categoriaIndex}`];
                  const descripcionCabys = item[`descripcion_categoria_${categoriaIndex}`];

                  return (
                    <div key={categoriaIndex}>
                      {codigoCabys && (
                        <p>
                          <strong>Código Categoría {categoriaIndex}:</strong> {codigoCabys}
                          <button 
                            onClick={() => handleSelectCabys(item, categoriaIndex)} 
                            className="text-blue-500 hover:underline ml-2"
                          >
                            Seleccionar
                          </button>
                        </p>
                      )}
                      {descripcionCabys && (
                        <p><strong>Descripción:</strong> {descripcionCabys}</p>
                      )}
                      {item.impuesto && (
                        <p><strong>Impuesto:</strong> {item.impuesto}%</p> 
                      )}
                      {item.nota_explicativa && (
                        <p><strong>Nota Explicativa:</strong> {item.nota_explicativa}</p>
                      )}
                      {item.nota_no_explicativa && (
                        <p><strong>Nota No Explicativa:</strong> {item.nota_no_explicativa}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 0}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Ver Menos
            </button>
            <button 
              onClick={handleNextPage} 
              disabled={(currentPage + 1) * itemsPerPage >= filteredCabysData.length}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Ver Más
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
