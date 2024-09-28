// src/components/Compras.jsx

import "../../index.css";
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import { BackgroundAnimation } from './Background.jsx'; // Importar el componente de animación
import React, { useState, useEffect } from 'react';

export function Compras() {
    // Estado para los valores del formulario
    const [clientes, setClientes] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        cliente_id: '',
        proveedor_id: '',
        fecha: '',
        tipo_compra: 'compra',
        monto_total: '',
        estado: 'pendiente',
        referencia_factura: '',
        descripcion: '',
        metodo_pago: 'efectivo',
        impuesto: '',
        descuento: '',
        cantidad_items: '',
        usuario_id: ''
    });

    // Cargar los datos de clientes, proveedores y usuarios
    useEffect(() => {
        fetch('/api/clientes')
            .then(response => response.json())
            .then(data => setClientes(data));

        fetch('/api/proveedores')
            .then(response => response.json())
            .then(data => setProveedores(data));

        fetch('/api/usuarios')
            .then(response => response.json())
            .then(data => setUsuarios(data));
    }, []);

    // Manejar los cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Compra registrada:', data);
        })
        .catch(error => {
            console.error('Error registrando la compra:', error);
        });
    };

    return (
        <div className="bg-blue-100 relative">
            {/* Agregar el componente de animación */}
            <BackgroundAnimation /> 
            <Header />
            <div className="container mx-auto py-10 relative z-10"> {/* Añadir z-10 para superponer el contenido */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">Registrar Compra o Gasto</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Cliente */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Cliente (Opcional):</label>
                            <select
                                name="cliente_id"
                                value={formData.cliente_id}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                            >
                                <option value="">Selecciona un cliente</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Proveedor */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Proveedor (Opcional):</label>
                            <select
                                name="proveedor_id"
                                value={formData.proveedor_id}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                            >
                                <option value="">Selecciona un proveedor</option>
                                {proveedores.map(proveedor => (
                                    <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Fecha */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Fecha de Compra:</label>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            />
                        </div>

                        {/* Tipo de compra */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Tipo de Transacción:</label>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="compra"
                                    name="tipo_compra"
                                    value="compra"
                                    checked={formData.tipo_compra === 'compra'}
                                    onChange={handleChange}
                                    className="mr-2"
                                    required
                                />
                                <label htmlFor="compra" className="mr-4">Compra</label>
                                <input
                                    type="radio"
                                    id="gasto"
                                    name="tipo_compra"
                                    value="gasto"
                                    checked={formData.tipo_compra === 'gasto'}
                                    onChange={handleChange}
                                    className="mr-2"
                                    required
                                />
                                <label htmlFor="gasto">Gasto</label>
                            </div>
                        </div>

                        {/* Monto total */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Monto Total:</label>
                            <input
                                type="number"
                                name="monto_total"
                                value={formData.monto_total}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            />
                        </div>

                        {/* Estado */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Estado:</label>
                            <select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="completada">Completada</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </div>

                        {/* Referencia factura */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Referencia de Factura (Opcional):</label>
                            <input
                                type="text"
                                name="referencia_factura"
                                value={formData.referencia_factura}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                            />
                        </div>

                        {/* Descripción */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Descripción (Opcional):</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                            />
                        </div>

                        {/* Método de pago */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Método de Pago:</label>
                            <select
                                name="metodo_pago"
                                value={formData.metodo_pago}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            >
                                <option value="efectivo">Efectivo</option>
                                <option value="tarjeta">Tarjeta</option>
                                <option value="transferencia">Transferencia</option>
                            </select>
                        </div>

                        {/* Impuesto */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Impuesto (Opcional):</label>
                            <input
                                type="number"
                                name="impuesto"
                                value={formData.impuesto}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                            />
                        </div>

                        {/* Descuento */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Descuento (Opcional):</label>
                            <input
                                type="number"
                                name="descuento"
                                value={formData.descuento}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                            />
                        </div>

                        {/* Cantidad de items */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Cantidad de Items:</label>
                            <input
                                type="number"
                                name="cantidad_items"
                                value={formData.cantidad_items}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            />
                        </div>

                        {/* Usuario */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Usuario:</label>
                            <select
                                name="usuario_id"
                                value={formData.usuario_id}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            >
                                <option value="">Selecciona un usuario</option>
                                {usuarios.map(usuario => (
                                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Botón de envío */}
                        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                            Registrar Compra
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
