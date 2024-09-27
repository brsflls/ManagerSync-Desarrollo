import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadingPage } from '../../LoadingPage.jsx';
import { Login } from '../activity/Login.jsx';
import { Register } from '../activity/Registro.jsx';
import { Sidebar } from '../Sidebar.jsx';
import { HomePage } from '../../HomePage.jsx';
import { Registro_cliente } from '../activity/Registro_cliente.jsx';
import { Registro_factura } from '../activity/Registro_factura.jsx';
import { Reporte_general } from '../activity/Reporte_general.jsx';
import { Ventas } from '../activity/Ventas.jsx';
import { Compras } from '../activity/Compras.jsx';
import { Settings } from '../activity/Settings.jsx';
import { Forgot_pass } from '../activity/Forgot_pass.jsx';
import { MantenimientoProductos } from '../activity/MantenimientoProductos.jsx';
import { MantenimientoProveedores } from '../activity/MantenimientoProveedores.jsx';
import ProtectedRoute from './ProtectedRoute'; // Ajusta la ruta

export function RouteMain() {
  return (
    <Router>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/" element={<LoadingPage />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Sidebar" element={<Sidebar/>} />
        <Route path="/Registro_cliente" element={<Registro_cliente />} />
        <Route path="/Registro_factura" element={<Registro_factura />} />
        <Route path="/Reporte_general" element={<Reporte_general />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/MantenimientoProductos" element={  <ProtectedRoute>
          <MantenimientoProductos/>
          </ProtectedRoute>} />

          <Route path="/MantenimientoProveedores" element={  <ProtectedRoute>
          <MantenimientoProveedores/>
          </ProtectedRoute>} />
        <Route path="/Settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/forgot_pass" element={<Forgot_pass />} />
      
        {/* Puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}
