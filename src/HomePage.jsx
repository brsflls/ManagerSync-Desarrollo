import React from 'react';
import { Login } from "./components/activity/Login";
import { Register } from "./components/activity/Register";
import{Forgot_pass}from "./components/activity/Forgot_pass";
import{Mantenimiento_productos}from "./components/activity/Mantenimiento_productos";
import './index.css'


export function  HomePage() {

  return (
    <div className="container bg-blue-100  w-screen h-screen " >

{/*<Login /> <Login />  <Register />
     <Forgot_pass/><Login /> 
*/}
   
   <  Mantenimiento_productos/>
      
    </div>
  );
}
