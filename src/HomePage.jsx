import React from 'react';
import {Route, Routes} from "react-router-dom";

import { Header } from './components/Header.jsx';
import { Login } from "./components/activity/Login";
import { Register } from "./components/activity/Registro.jsx";
import{Forgot_pass}from "./components/activity/Forgot_pass";
import{Mantenimiento_productos}from "./components/activity/Mantenimiento_productos";
import{Compras}from "./components/activity/Compras";
import{Reporte_general}from "./components/activity/Reporte_general";
import{Ventas}from "./components/activity/Ventas";
import{Registro_cliente}from "./components/activity/Registro_cliente";
import{Registro_factura}from "./components/activity/Registro_factura";
import{Settings}from "./components/activity/Settings";
import './index.css'
import { LoadingPage } from '././LoadingPage.jsx';
import { Footer } from './components/Footer.jsx';


export function  HomePage() {

  return (
    <div className="container bg-blue-100  w-screen h-max  " >

{/*
<Register />
<Login /> 
<Forgot_pass/>
<LoadingPage/>
<Registro_factura/>
<Registro_cliente/>
<Mantenimiento_productos/> 
<Compras/> 
  <Ventas/> 
 <Reporte_general/> 
*/}

  <Header/>
  <Settings/> 
  <Footer/>

    </div>
    
  );
}
