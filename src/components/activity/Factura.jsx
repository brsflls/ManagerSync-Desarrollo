import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from "../hooks/UserContext";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, pdf } from '@react-pdf/renderer';

export function Factura({ subtotal, totalIVA, totalVenta, carrito, selectedCliente, onClose }) {
  const { user } = useUser();
  const [tipoFactura, setTipoFactura] = useState('venta');
  const [fechaEmision, setFechaEmision] = useState(new Date().toISOString().split('T')[0]);
  const [fechaVencimiento, setFechaVencimiento] = useState(new Date().toISOString().split('T')[0]);
  const [estado, setEstado] = useState('Emitida');
  const [descripciones, setDescripciones] = useState({});
  const [facturaId, setFacturaId] = useState(null);
  const [codigoUnico, setCodigoUnico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  // Nueva lógica de pago
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [cantidadPagada, setCantidadPagada] = useState(0);
  const [vuelto, setVuelto] = useState(0);
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTitular, setNombreTitular] = useState('');

  const handleDescriptionChange = (index, value) => {
    setDescripciones(prev => ({
      ...prev,
      [index]: value
    }));
  };

  // Componente para generar el PDF
  const FacturaPDF = () => (
    <Document>
      <Page>
        <Text style={{ marginBottom: 5 }}>Factura #{facturaId}</Text>
        <Text style={{ marginBottom: 5 }}>Código Único: {codigoUnico}</Text>
        <Text style={{ marginBottom: 5 }}>Cliente: {selectedCliente.nombre || 'Cliente no especificado'}</Text>
        <Text style={{ marginBottom: 5 }}>Correo: {selectedCliente.email || selectedCliente.correo}</Text>
        <Text style={{ marginBottom: 5 }}>Fecha de emisión: {fechaEmision}</Text>
        <Text style={{ marginBottom: 5 }}>Fecha de vencimiento: {fechaVencimiento}</Text>
        <Text style={{ marginBottom: 5 }}>Estado: {estado}</Text>
        <Text style={{ marginBottom: 5 }}>-------------------------------------------</Text>
        <Text style={{ marginBottom: 5 }}>Detalles de la factura:</Text>
        {carrito.map((item, index) => (
          <Text key={index} style={{ marginBottom: 5 }}>
            Código cabys de producto: {item.codigo_cabys}, 
            {item.descripcion} - Cantidad: {item.cantidad}, 
            Precio Unitario: ₡{item.precio_consumidor}, 
            Total: ₡{(item.cantidad * item.precio_consumidor).toFixed(2)}
          </Text>
        ))}
        <Text style={{ marginBottom: 5 }}>-------------------------------------------</Text>
        <Text style={{ marginBottom: 5 }}>Subtotal: ₡{subtotal.toFixed(2)}</Text>
        <Text style={{ marginBottom: 5 }}>IVA: ₡{totalIVA.toFixed(2)}</Text>
        <Text style={{ marginBottom: 5 }}>Total Venta: ₡{totalVenta.toFixed(2)}</Text>
      </Page>
    </Document>
  );

  const calcularVuelto = (montoPagado) => {
    const cambio = montoPagado - totalVenta;
    setVuelto(cambio >= 0 ? cambio : 0);
  };

  const handleFacturar = async () => {
    if (!selectedCliente || !user || (metodoPago === 'efectivo' && cantidadPagada < totalVenta)) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    const facturaData = {
      cliente_id: selectedCliente.id,
      usuario_id: user.id,
      fecha_emision: fechaEmision,
      fecha_vencimiento: fechaVencimiento,
      total: totalVenta,
      tipo: tipoFactura,
      estado: estado,
    };

    try {
      const response = await fetch("http://localhost/managersyncbdf/public/api/facturas", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facturaData),
      });

      if (response.ok) {
        const result = await response.json();
        setFacturaId(result.id);
        setCodigoUnico(result.codigo_unico);
        alert("Factura registrada exitosamente.");
        await handleGuardarDetalle(result.id);
        setShowModal(true);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors ? JSON.stringify(errorData.errors) : 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error en la solicitud. Inténtalo nuevamente.');
      console.error("Error en la solicitud:", error);
    }
  };

  const handleGuardarDetalle = async (facturaIdParam) => {
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

      return {
        factura_id: facturaIdParam,
        producto_id: item.id,
        codigo_cabys: item.codigo_cabys,
        cantidad: cantidad,
        precio_unitario: precioUnitario,
        total: cantidad * precioUnitario,
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
  };

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
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow
-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Registrar Factura</h1>

        {/* Formulario de datos de la factura */}
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

        {/* Sección de pago */}
        <div className="mb-4 flex justify-between">
          <label>Método de Pago:</label>
          <select
            className="border p-1 rounded"
            value={metodoPago}
            onChange={(e) => {
              setMetodoPago(e.target.value);
              setCantidadPagada(0); // Reiniciar monto pagado al cambiar método
            }}
          >
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </div>
        {metodoPago === 'efectivo' ? (
          <div className="mb-4 flex justify-between">
            <label>Cantidad Pagada:</label>
            <input
              type="number"
              className="border p-1 rounded"
              value={cantidadPagada}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCantidadPagada(value);
                calcularVuelto(value);
              }}
              required
            />
            <span className="ml-2">Vuelto: ₡{vuelto.toFixed(2)}</span>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between">
              <label>Número de Tarjeta:</label>
              <input
                type="text"
                className="border p-1 rounded"
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex justify-between">
              <label>Nombre del Titular:</label>
              <input
                type="text"
                className="border p-1 rounded"
                value={nombreTitular}
                onChange={(e) => setNombreTitular(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* Mostrar y editar las descripciones del carrito */}
        {carrito.map((item, index) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span className="text-gray-700">{item.descripcion}</span>
            <input
              type="text"
              className="border p-1 rounded flex-grow ml-2"
              placeholder="Descripción"
              value={descripciones[index] || item.descripcion || ''}
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
        </div>
      </div>

      {/* Modal para guardar o imprimir la factura */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Factura generada correctamente.</h2>

            {/* Vista previa del PDF */}
            <PDFViewer style={{ width: '100%', height: '400px' }}>
              <FacturaPDF />
            </PDFViewer>

            <PDFDownloadLink document={<FacturaPDF />} fileName={`factura_${facturaId}.pdf`}>
              {({ loading }) => (
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                  {loading ? 'Generando PDF...' : 'Guardar PDF'}
                </button>
              )}
            </PDFDownloadLink>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => {
                setShowModal(false);
                onClose();
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Factura.propTypes = {
  subtotal: PropTypes.number.isRequired,
  totalIVA: PropTypes.number.isRequired,
  totalVenta: PropTypes.number.isRequired,
  carrito: PropTypes.array.isRequired,
  selectedCliente: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
