import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from "../hooks/UserContext"; // Hook para manejar el estado del usuario
import { LoadingPage } from '../../LoadingPage.jsx';
import { Login } from '../activity/Login.jsx';
import { Register } from '../activity/Registro.jsx';
import { Sidebar } from '../Sidebar.jsx';
import { HomePage } from '../../HomePage.jsx';
import { Registro_factura } from '../activity/Registro_factura.jsx';
import { Reporte_general } from '../activity/Reporte_general.jsx';
import { Ventas } from '../activity/Ventas.jsx';
import { Compras } from '../activity/Compras.jsx';
import { Settings } from '../activity/Settings.jsx';
import { Forgot_pass } from '../activity/Forgot_pass.jsx';
import { MantenimientoProductos } from '../activity/MantenimientoProductos.jsx';
import { MantenimientoClientes } from '../activity/MantenimientoClientes.jsx';
import { MantenimientoProveedores } from '../activity/MantenimientoProveedores.jsx';
import ProtectedRoute from './ProtectedRoute'; // Ajusta la ruta
import { Detalle_facturas } from '../activity/Detalle_facturas.jsx';
import { Punto_venta } from '../activity/Punto_venta.jsx';
import { ConsultarCompras } from '../activity/ConsultarCompras.jsx';

// Ruta para redirigir si el usuario está logueado
function PublicRoute({ children }) {
  const { user } = useUser(); // Hook para obtener usuario logueado
  return user ? <Navigate to="/Settings" /> : children;
}

export function RouteMain() {
  return (
    <Router>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/" element={<LoadingPage />} />
        <Route path="/LogIn" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/Registro" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/Sidebar" element={<ProtectedRoute><Sidebar /></ProtectedRoute>} />
        <Route path="/Registro_factura" element={<Registro_factura />} />
        <Route path="/Punto_venta" element={<ProtectedRoute><Punto_venta /></ProtectedRoute>} />
        <Route path="/Detalle_facturas" element={<ProtectedRoute><Detalle_facturas /></ProtectedRoute>} />
        <Route path="/Reporte_general" element={<Reporte_general />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/ConsultarCompras" element={<ConsultarCompras />} />
        <Route path="/MantenimientoProductos" element={
          <ProtectedRoute>
            <MantenimientoProductos />
          </ProtectedRoute>} />
        <Route path="/MantenimientoProveedores" element={
          <ProtectedRoute>
            <MantenimientoProveedores />
          </ProtectedRoute>} />
        <Route path="/MantenimientoClientes" element={
          <ProtectedRoute>
            <MantenimientoClientes />
          </ProtectedRoute>} />
        <Route path="/Settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/forgot_pass" element={<Forgot_pass />} />
      </Routes>
    </Router>
  );
}
