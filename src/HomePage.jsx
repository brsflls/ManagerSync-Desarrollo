import React from 'react';
import {Route, Routes} from "react-router-dom";

import { Header } from './components/Header.jsx';
import { Login } from "./components/activity/Login";
import { Register } from "./components/activity/Register";
import{Forgot_pass}from "./components/activity/Forgot_pass";
import{Mantenimiento_productos}from "./components/activity/Mantenimiento_productos";
import './index.css'
import { LoadingPage } from '././LoadingPage.jsx';
import { Footer } from './components/Footer.jsx';


export function  HomePage() {

  return (
    <div className="container bg-blue-100  w-screen h-screen " >

{/*<Login /> 
<Login /> 
<Register />
<Forgot_pass/>
<Login /> 
<  Mantenimiento_productos/> <Footer/>
*/}

  <Header/>
  <LoadingPage/>
  

    </div>
    
  );
}
