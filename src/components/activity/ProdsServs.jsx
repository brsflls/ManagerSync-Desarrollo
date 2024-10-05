import React, { useState } from 'react';

export function ProdsServs({ onChange }) {
  // Estado para los datos del producto
  const [productData, setProductData] = useState({
    codigo: "",
    servicio: "Si",
    descripcion: "",
    cantidad: 1,
    precioBruto: "",
    porcentajeDesc: "",
    porcentajeIVA: "",
  });

  // Estado para el detalle de la factura (lista de productos)
  const [detalleFactura, setDetalleFactura] = useState([]);

  // Manejar los cambios en los inputs del formulario
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Manejar el botón de agregar producto al detalle de la factura
  const handleAgregarProducto = (e) => {
    e.preventDefault();
    
    // Añadir el nuevo producto al detalle de factura
    const updatedFactura = [...detalleFactura, productData];
    setDetalleFactura(updatedFactura);

    // Pasar el detalle actualizado al componente padre
    onChange(updatedFactura);

    // Limpiar el formulario después de agregar el producto
    setProductData({
      codigo: "",
      servicio: "Si",
      descripcion: "",
      cantidad: 1,
      precioBruto: "",
      porcentajeDesc: "",
      porcentajeIVA: "",
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Productos/Servicios</h3>

      {/* Formulario para agregar producto */}
      <form onSubmit={handleAgregarProducto}>
        <div className="grid grid-cols-8 gap-2 mb-4">
          {/* Código */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-bold mb-1">Código</label>
            <input
              type="text"
              name="codigo"
              value={productData.codigo}
              onChange={handleProductChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
            />
          </div>

          {/* Servicio */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-bold mb-1">Servicio</label>
            <select
              name="servicio"
              value={productData.servicio}
              onChange={handleProductChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
            >
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Descripción */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold mb-1">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={productData.descripcion}
              onChange={handleProductChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
            />
          </div>

          {/* Cantidad */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-bold mb-1">Cant</label>
            <input
              type="number"
              name="cantidad"
              value={productData.cantidad}
              onChange={handleProductChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
              min="1"
            />
          </div>

          {/* Precio Bruto */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-bold mb-1">Precio Bruto</label>
            <input
              type="number"
              name="precioBruto"
              value={productData.precioBruto}
              onChange={handleProductChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
              min="0"
            />
          </div>

          {/* %Desc */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-bold mb-1">%Desc</label>
            <input
              type="number"
              name="porcentajeDesc"
              value={productData.porcentajeDesc}
              onChange={handleProductChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
              min="0"
              max="100"
            />
          </div>

          {/* %IVA */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-bold mb-1">%IVA</label>
            <input
              type="number"
              name="porcentajeIVA"
              value={productData.porcentajeIVA}
              onChange={handleProductChange}
              className="w-full border-2 border-gray-300 rounded-lg p-1"
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Botón para agregar */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Agregar
        </button>
      </form>

      {/* Tabla con el detalle de la factura */}
      {detalleFactura.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold mb-2">Detalle de la Factura</h4>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Código</th>
                <th className="border border-gray-300 px-4 py-2">Servicio</th>
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Cant</th>
                <th className="border border-gray-300 px-4 py-2">Precio Bruto</th>
                <th className="border border-gray-300 px-4 py-2">%Desc</th>
                <th className="border border-gray-300 px-4 py-2">%IVA</th>
              </tr>
            </thead>
            <tbody>
              {detalleFactura.map((producto, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{producto.codigo}</td>
                  <td className="border border-gray-300 px-4 py-2">{producto.servicio}</td>
                  <td className="border border-gray-300 px-4 py-2">{producto.descripcion}</td>
                  <td className="border border-gray-300 px-4 py-2">{producto.cantidad}</td>
                  <td className="border border-gray-300 px-4 py-2">{producto.precioBruto}</td>
                  <td className="border border-gray-300 px-4 py-2">{producto.porcentajeDesc}</td>
                  <td className="border border-gray-300 px-4 py-2">{producto.porcentajeIVA}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
