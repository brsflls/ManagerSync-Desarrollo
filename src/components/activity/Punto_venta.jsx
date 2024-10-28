import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/UserContext";
import { useAccountManagement } from '../hooks/useAccountManagement';

import { Header } from "../Header.jsx";
import { Detalle_facturas } from "./Detalle_facturas.jsx";
import { Footer } from "../Footer.jsx";
import "../../index.css";
import { Sidebar } from '../Sidebar.jsx';

export function Punto_venta() {
  const { user } = useUser();
  const { logout } = useAccountManagement();
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);

  const totalPreciosUnitarios = carrito.reduce((acc, item) => acc + item.precio_consumidor, 0);
  const precioUnitarioPromedio = totalPreciosUnitarios / (carrito.length || 1);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost/managersyncbdf/public/api/clientes/all");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost/managersyncbdf/public/api/productos/all");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchClientes();
    fetchProductos();
  }, []);

  const handleAgregarProducto = () => {
    if (selectedProducto) {
      const total = selectedProducto.precio_consumidor * cantidad;
      setCarrito([...carrito, { 
        ...selectedProducto, 
        cantidad, 
        total 
      }]);
      setCantidad(1);
      setSelectedProducto(null);
    }
  };

  const handleReiniciarVenta = () => {
    setSelectedCliente(null);
    setSelectedProducto(null);
    setCantidad(1);
    setCarrito([]);
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.total, 0);
  const totalIVA = subtotal * 0.13;
  const totalVenta = subtotal + totalIVA;

  return (
    <>
      <Header />

      <div className="bg-slate-300 w-screen h-max grid grid-cols-8 gap-3">
        <div>
          <Sidebar logout={logout} />
        </div>
        <div className="pt-2 ps-3">
          <div className="basis-2/4 py-2 pt-12 p-6 mx-auto mt-6 ml-5 mb-4 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-6">
              <button
                onClick={handleReiniciarVenta}
                className="-mt-4 ml-3 px-1 py-2 text-white bg-sky-900 rounded-xl hover:bg-indigo-900 w-full">
                Nueva Venta
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 p-3">
              <select
                className="w-full p-2 border rounded mb-4"
                onChange={(e) => {
                  const selected = JSON.parse(e.target.value);
                  setSelectedCliente(selected); // Guardar el objeto cliente completo
                }}
                value={selectedCliente ? JSON.stringify(selectedCliente) : ""}
              >
                <option value="">Seleccionar cliente...</option>
                {clientes.map((cliente) => (
                  <option 
                    key={cliente.id} 
                    value={JSON.stringify(cliente)} // Guardar el objeto completo
                  >
                    {cliente.nombre}
                  </option>
                ))}
              </select>

              <div>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => { window.location.href = '/MantenimientoClientes'; }}
                  >
                    Crear/Editar Cliente
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600">
                    Crear Exoneración
                  </button>
                </div>
              </div>
            </div>

            <ul className="flex flex-wrap pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
              <li className="me-2">
                <a
                  href="#"
                  aria-current="page"
                  className="inline-block p-4  active:text-blue-900 active:bg-gray-100 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg active">
                  Contado
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50">
                  Crédito
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50">
                  Proforma
                </a>
              </li>
            </ul>

            <div className="grid grid-cols-6 p-2 gap-1">
              <div className="col-span-1">
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Cantidad"
                />
              </div>
              <div className="col-span-2">
                <select
                  className="w-full p-2 border rounded mb-4"
                  onChange={(e) => setSelectedProducto(JSON.parse(e.target.value))}
                  value={selectedProducto ? JSON.stringify(selectedProducto) : ""}
                >
                  <option value="">Seleccionar producto...</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={JSON.stringify(producto)}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  readOnly
                  value={selectedProducto ? `₡${selectedProducto.precio_consumidor}` : ""}
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Precio"
                />
              </div>
              <div className="col-span-1">
                <button
                  onClick={handleAgregarProducto}
                  className="px-4 py-2 text-white bg-sky-900 rounded-xl hover:bg-indigo-900">
                  Agregar
                </button>
              </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-3 text-left">Cantidad</th>
                    <th className="p-3 text-left">Código</th>
                    <th className="p-3 text-left">Descripción</th>
                    <th className="p-3 text-left">I.V.A</th>
                    <th className="p-3 text-left">Precio</th>
                    <th className="p-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-3">{item.cantidad}</td>
                      <td className="p-3">{item.codigo_cabys}</td>
                      <td className="p-3">{item.descripcion}</td>
                      <td className="p-3">{(item.total * 0.13).toFixed(2)}</td>
                      <td className="p-3">{`₡${item.precio_consumidor}`}</td>
                      <td className="p-3">{`₡${item.total}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pt-2 pr-12 basis-1/4 ml-7 mr-5 h-full col-span-2">
          <Detalle_facturas 
            subtotal={subtotal}
            totalIVA={totalIVA}
            totalVenta={totalVenta}
            carrito={carrito}
            selectedCliente={selectedCliente} // Pasamos el objeto cliente completo
            user={user} 
            precioUnitario={precioUnitarioPromedio} 
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
