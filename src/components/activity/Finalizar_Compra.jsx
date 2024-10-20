import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export const Finalizar = ({ 
  inicioData, 
  emisorData, 
  prodsServsData, 
  exoneraData, 
  refersData, 
  totales, 
  onTotalesChange, 
  onApplyDocument // Recibe la función para mostrar el modal
}) => {
  const [archivo, setArchivo] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const navigate = useNavigate(); // Inicializa useNavigate

  // Manejar cambios en los inputs de totales
  const handleTotalesChange = (e) => {
    const { name, value } = e.target;
    const floatValue = parseFloat(value) || 0.0;
    const newTotales = { ...totales, [name]: floatValue };
    onTotalesChange(newTotales);

    if (name === 'subTotal' || name === 'descuentos' || name === 'impuestos') {
      const totalCalculado = (newTotales.subTotal - newTotales.descuentos + newTotales.impuestos).toFixed(2);
      onTotalesChange({ ...newTotales, total: parseFloat(totalCalculado) });
    }
  };

  // Manejar la selección de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setArchivo(selectedFile);
  };

  // Aplicar documento (enviar datos al backend)
  const handleAplicarDocumento = async () => {
    const allData = {
      condicion_venta: inicioData?.condicionVenta,
      moneda: inicioData?.moneda,
      plazo: inicioData?.plazo,
      tipo_cambio: inicioData?.tipoCambio,
      observacion: inicioData?.observacion,
      tipo_compra: inicioData?.tipoCompra,
      identificacion: emisorData?.identificacion,
      tipo_identificacion: emisorData?.tipoIdentificacion,
      nombre: emisorData?.nombre,
      telefono: emisorData?.telefono,
      correo_electronico: emisorData?.correoElectronico,
      direccion_exacta: emisorData?.direccionExacta,
      provincia: emisorData?.provincia,
      canton: emisorData?.canton,
      distrito: emisorData?.distrito,
      barrio: emisorData?.barrio,
      sub_total: totales?.subTotal,
      impuestos: totales?.impuestos,
      descuentos: totales?.descuentos,
      total: totales?.total,
      archivo: archivo ? archivo.name : null, // Archivo opcional
      numero_exoneracion: exoneraData?.numeroExoneracion,
      fecha_emision_exoneracion: exoneraData?.fechaEmision,
      tipo_exoneracion: exoneraData?.tipoExoneracion,
      porcentaje_exoneracion: parseFloat(exoneraData?.porcentaje) || 0,
      nombre_institucion_exoneracion: exoneraData?.nombreInstitucion,
      productosServicios: prodsServsData?.map(prod => ({
        codigo: prod.codigo,
        descripcion: prod.descripcion,
        cantidad: prod.cantidad,
        precio_bruto: prod.precioBruto,
        porcentaje_descuento: prod.porcentajeDesc,
        porcentaje_iva: prod.porcentajeIVA,
        servicio: prod.servicio === "Si" ? true : false,
      })),
      referencias: refersData?.map(ref => ({
        tipo_documento: ref.tipoDocumento,
        numero_documento: ref.numeroDocumento,
        fecha_documento: ref.fechaDocumento,
        tipo_referencia: ref.tipoReferencia,
      })),
    };
  
    try {
      const response = await fetch('http://localhost/managersyncbdf/public/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(allData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setShowModal(true); // Muestra el modal de éxito
      } else {
        console.error('Error al crear la factura', result);
        // Mostrar errores detallados
        if (result.errors) {
          const errores = Object.keys(result.errors).map(key => `${key}: ${result.errors[key].join(', ')}`).join('\n');
          alert(`Errores al aplicar documento:\n${errores}`);
        } else {
          alert("Error al aplicar documento");
        }
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      alert("Error de red");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/ConsultarCompras"); // Redirige a ConsultarCompras
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Finalizar Documento</h3>

      {/* Mostrar datos del Inicio */}
      <h4 className="text-lg font-bold mb-4">Datos de Inicio:</h4>
      <p>Condición de Venta: {inicioData?.condicionVenta}</p>
      <p>Moneda: {inicioData?.moneda}</p>
      <p>Plazo: {inicioData?.plazo}</p>
      <p>Tipo de Cambio: {inicioData?.tipoCambio}</p>
      <p>Observación: {inicioData?.observacion}</p>
      <p>Tipo de Compra: {inicioData?.tipoCompra}</p>

      {/* Mostrar datos del Emisor */}
      <h4 className="text-lg font-bold mb-4">Datos del Emisor:</h4>
      <p>Identificación: {emisorData?.identificacion}</p>
      <p>Nombre: {emisorData?.nombre}</p>
      <p>Teléfono: {emisorData?.telefono}</p>
      <p>Correo Electrónico: {emisorData?.correoElectronico}</p>
      <p>Provincia: {emisorData?.provincia}</p>
      <p>Cantón: {emisorData?.canton}</p>
      <p>Distrito: {emisorData?.distrito}</p>
      <p>Barrio: {emisorData?.barrio}</p>

      {/* Mostrar Productos y Servicios */}
      <h4 className="text-lg font-bold mb-4">Productos/Servicios:</h4>
      {prodsServsData?.length > 0 ? (
        <ul>
          {prodsServsData.map((prod, index) => (
            <li key={index}>
              {prod.descripcion} - {prod.cantidad} x {prod.precioBruto}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se han añadido productos o servicios.</p>
      )}

      {/* Mostrar datos de Exoneración */}
      <h4 className="text-lg font-bold mb-4">Exoneración:</h4>
      <p>Número Doc. Exoneración: {exoneraData?.numeroExoneracion}</p>
      <p>Fecha de Emisión: {exoneraData?.fechaEmision}</p>
      <p>Tipo de Exoneración: {exoneraData?.tipoExoneracion}</p>
      <p>Porcentaje: {exoneraData?.porcentaje}%</p>
      <p>Nombre Institución: {exoneraData?.nombreInstitucion}</p>

      {/* Mostrar datos de Referencias */}
      <h4 className="text-lg font-bold mb-4">Referencias:</h4>
      {refersData?.length > 0 ? (
        <ul>
          {refersData.map((ref, index) => (
            <li key={index}>
              {ref.tipoDocumento} - {ref.numeroDocumento} - {ref.fechaDocumento}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se han añadido referencias.</p>
      )}

      {/* Subir Archivo */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Archivo PDF o imagen JPG del documento de compra (Opcional)
        </label>
        <input
          type="file"
          accept="image/jpeg, application/pdf"
          onChange={handleFileChange}
          className="w-full border-2 border-gray-300 rounded-lg p-2"
        />
        {archivo && (
          <p className="mt-2 text-gray-600">Archivo seleccionado: {archivo.name}</p>
        )}
      </div>

      {/* Totales del Documento */}
      <h4 className="text-lg font-bold mb-4">Totales del Documento</h4>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">SubTotal</label>
          <input
            type="number"
            name="subTotal"
            value={totales.subTotal}
            onChange={handleTotalesChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Impuestos</label>
          <input
            type="number"
            name="impuestos"
            value={totales.impuestos}
            onChange={handleTotalesChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Descuentos</label>
          <input
            type="number"
            name="descuentos"
            value={totales.descuentos}
            onChange={handleTotalesChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Total</label>
          <input
            type="number"
            name="total"
            value={totales.total}
            readOnly
            className="w-full border-2 border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>
      </div>

      {/* Botón para aplicar documento */}
      <div className="mt-6">
        <button
          onClick={handleAplicarDocumento} // Llama a la función para aplicar el documento
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Aplicar Documento
        </button>
      </div>

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Factura registrada con éxito
            </h3>
            <p className="text-center text-gray-600 mb-4">
              ¡Gracias por registrar su factura de compra o gasto!
            </p>
            <button
              onClick={handleCloseModal} // Cambia a handleCloseModal para redirigir
              className="block w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
