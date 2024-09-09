import "../../index.css";


import { Header } from '.././Header.jsx';
import { Footer } from '.././Footer.jsx';
export function Registro_cliente() {
  
  return (
    <>
         <Header/>
          <div className=" bg-blue-100  w-screen h-max  " >
       
        <div className="mx-auto py-16 ">
            
      
       

         


  

<div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg max-w-6xl rounded-xl mx-auto bg-white">
    <h1 className="font-bold text-5xl py-5 ps-24 ">Registro de cliente</h1>
 

<form className=" grid grid-cols-3 ps-24 mx-auto">
  <div className="mb-5">
    <label for="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
    <input type="nombre" id="nombre" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nombre" required />
    <label for="direccion" className="block mb-2 pt-5 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
    <input type="direccion" id="direccion" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Dirección" required />
 
  </div>
  <div className="mb-5">
    <label for="apellidos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
    <input type="apellidos" id="apellidos" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Apellidos"required />
 
    <label for="correo_electronico" className="block pt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
    <input type="correo_electronico" id="correo_electronico" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"placeholder="Correo electrónico" required />
  </div>
  <div className="mb-5">
    <label for="Identificacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identificacion</label>
    <input type="identificacion" id="identificacion" className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"placeholder="Identificación" required />
    <label for="numero_telefono" className="block pt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de telefono</label>
    <input type="numero_telefono" id="numero_telefono" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Numero de telefono"required />
  
  </div>
  <div className="flex items-start mb-5">
   
   </div>
  
</form>


    
    <div className="text-end ">
    <button type="submit" className="m-3  text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancelar</button>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
  
    </div>
    
</div>

</div>

          </div>

          <Footer/>
    </>
    
  );
} 