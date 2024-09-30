// Settings.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/UserContext";

import { Header } from "../Header.jsx";
import { Detalle_facturas } from "./Detalle_facturas.jsx";
import { Footer } from "../Footer.jsx";
import "../../index.css";

export function Punto_venta() {
  return (
    <>
      <Header />

      <div className="bg-blue-100 w-screen   pt-2 h-max grid grid-cols-8 gap-3">
        <div className="col-span-6">
          <div className="relativep-5 p-3 overflow-x-auto shadow-md sm:rounded-lg max-w-6xl  rounded-xl mx-auto bg-white">
            <div className="grid grid-cols-2  gap-4 p-3">
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Buscar cliente..."
              />

              <div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Crear un Cliente
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600">
                    Editar Cliente{" "}
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600">
                    Crear Exoneración
                  </button>
                </div>
              </div>
            </div>


            

<ul className="flex flex-wrap pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
    <li className="me-2">
        <a href="#" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Contado</a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Credito</a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Preforma</a>
    </li>
  
</ul>


<div className="grid grid-cols-6 p-2 gap-1">

<div className="col-span-1 ">
<input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Cantidad"
              />
</div>
<div className="col-span-2"> 
<input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nombre o codigo de producto"
              />


</div>
<div className="col-span-1"> 
<svg
      className="w-6 h-6 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 4a6 6 0 106 6 6 6 0 00-6-6zm0 12a8 8 0 108-8 8 8 0 00-8 8zm9 0l-3-3"
      />
    </svg>

</div>

<div className="col-span-1"> 
<input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Precio"
              />


</div>
<div className="col-span-1"> 
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
Agregar
                  </button>

</div>

</div>



            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="p-3 text-left"> </th>
                    <th className="p-3 text-left">Codigo</th>
                    <th className="p-3 text-left">Descripcion</th>
                    <th className="p-3 text-left">I.V.A</th>
                    <th className="p-3 text-left">Precio</th>
                    <th className="p-3 text-left">Cantidad</th>
                    <th className="p-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pt-2 pr-6 col-span-2 ">
          <Detalle_facturas />
        </div>
      </div>
      <Footer />
    </>
  );
}
