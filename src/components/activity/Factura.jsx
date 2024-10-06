import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from "../hooks/UserContext";

export function Factura({ subtotal, totalIVA, totalVenta, carrito, selectedCliente, precioUnitario, onClose }) {
  const { user } = useUser();
  const [numeroFactura, setNumeroFactura] = useState('');
  const [tipoFactura, setTipoFactura] = useState('venta');
  const [fechaEmision, setFechaEmision] = useState(new Date().toISOString().split('T')[0]);
  const [fechaVencimiento, setFechaVencimiento] = useState(new Date().toISOString().split('T')[0]); 
  const [codigoUnico, setCodigoUnico] = useState('');
  const [estado, setEstado] = useState('Emitida'); 
  const [descripciones, setDescripciones] = useState({});
  const [facturaId, setFacturaId] = useState(null); // Para almacenar el ID de la factura registrada

  const handleDescriptionChange = (index, value) => {
    setDescripciones(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleFacturar = async () => {
    // Validar campos obligatorios
    if (!selectedCliente || !numeroFactura || !codigoUnico || !user) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Construir la factura
    const facturaData = {
      cliente_id: selectedCliente,
      usuario_id: user.id,
      numero_factura: numeroFactura,
      fecha_emision: fechaEmision,
      fecha_vencimiento: fechaVencimiento,
      total: totalVenta,
      tipo: tipoFactura,
      estado: estado,
      codigo_unico: codigoUnico,
    };

    try {
      const response = await fetch("http://localhost/managersyncbdf/public/api/facturas", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facturaData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Factura registrada:", result);
        setFacturaId(result.id); // Almacenar el ID de la factura registrada
        alert("Factura registrada exitosamente.");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors ? JSON.stringify(errorData.errors) : 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error en la solicitud. Inténtalo nuevamente.');
      console.error("Error en la solicitud:", error);
    }
  };

  const handleGuardarDetalle = async () => {
    if (!facturaId) {
      alert("Primero registra la factura antes de guardar los detalles.");
      return;
    }

    const detalles = carrito.map((item) => {
      const cantidad = item.cantidad || 0; 
      const precioUnitario = item.precio_consumidor || 0;

      if (cantidad <= 0) {
        alert(`La cantidad del producto ${item.descripcion} debe ser mayor a cero.`);
        return null;
      }

      if (precioUnitario <= 0) {
        alert(`El precio unitario del producto ${item.descripcion} debe ser mayor a cero.`);
        return null;
      }

      const total = cantidad * precioUnitario;

      return {
        factura_id: facturaId,
        producto_id: item.id,
        cantidad: cantidad,
        precio_unitario: precioUnitario,
        total: total,
        descripcion: item.descripcion || ''
      };
    }).filter(item => item !== null);

    if (detalles.length === 0) {
      alert("No hay detalles válidos para guardar.");
      return;
    }

    for (const detalle of detalles) {
      try {
        const response = await fetch("http://localhost/managersyncbdf/public/api/detalles-factura", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detalle),
        });

        if (response.ok) {
          // Petición adicional para actualizar el stock del producto
          await actualizarStockProducto(detalle.producto_id, detalle.cantidad);
        } else {
          const errorData = await response.json();
          alert(`Error guardando detalle: ${errorData.errors ? JSON.stringify(errorData.errors) : 'Error desconocido'}`);
        }
      } catch (error) {
        alert('Error en la solicitud para guardar detalle. Inténtalo nuevamente.');
        console.error("Error al guardar detalle:", error);
      }
    }

    alert("Detalles guardados exitosamente.");
    
    // Cerrar el modal después de guardar los detalles
    onClose();
  };

  // Función para actualizar el stock en el backend
  const actualizarStockProducto = async (productoId, cantidadVendida) => {
    try {
      const response = await fetch(`http://localhost/managersyncbdf/public/api/productos/${productoId}/reducir-stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: cantidadVendida }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error actualizando stock: ${errorData.errors ? JSON.stringify(errorData.errors) : 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error al actualizar el stock. Inténtalo nuevamente.');
      console.error("Error al actualizar stock:", error);
    }
  };

  return (
    <div className="bg-blue-100 justify-center items-center flex flex-col">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Registrar Factura</h1>
        <div className="mb-4 flex justify-between">
          <label>Número de Factura:</label>
          <input
            type="text"
            className="border p-1 rounded"
            value={numeroFactura}
            onChange={(e) => setNumeroFactura(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex justify-between">
          <label>Tipo:</label>
          <select
            className="border p-1 rounded"
            value={tipoFactura}
            onChange={(e) => setTipoFactura(e.target.value)}
            required
          >
            <option value="venta">Venta</option>
            <option value="compra">Compra</option>
          </select>
        </div>
        <div className="mb-4 flex justify-between">
          <label>Fecha Emisión:</label>
          <input
            type="date"
            className="border p-1 rounded"
            value={fechaEmision}
            onChange={(e) => setFechaEmision(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex justify-between">
          <label>Fecha Vencimiento:</label>
          <input
            type="date"
            className="border p-1 rounded"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex justify-between">
          <label>Código Único:</label>
          <input
            type="text"
            className="border p-1 rounded"
            value={codigoUnico}
            onChange={(e) => setCodigoUnico(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex justify-between">
          <label>Estado:</label>
          <select
            className="border p-1 rounded"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="Emitida">Emitida</option>
            <option value="Pagada">Pagada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <div className="mb-4 flex justify-between">
          <label>Total:</label>
          <input
            type="text"
            className="border p-1 rounded w-full"
            value={`₡${totalVenta.toFixed(2)}`}
            readOnly
          />
        </div>

        {carrito.map((item, index) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.nombre}</span>
            <input
              type="text"
              className="border p-1 rounded w-full"
              placeholder="Descripción"
              value={descripciones[index] || ''}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
            />
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFacturar}
          >
            Facturar
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGuardarDetalle}
          >
            Guardar Detalle
          </button>
        </div>
      </div>
    </div>
  );
}

Factura.propTypes = {
  subtotal: PropTypes.number.isRequired,
  totalIVA: PropTypes.number.isRequired,
  totalVenta: PropTypes.number.isRequired,
  carrito: PropTypes.array.isRequired,
  selectedCliente: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired, // Añadir onClose como prop
};
