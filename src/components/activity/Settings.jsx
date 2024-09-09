import "../../index.css";

import { Header } from '.././Header.jsx';
import { Footer } from '.././Footer.jsx';


export function Settings() {
  
  return (
    <>
      <Header/>
    <div className=" bg-blue-100  w-screen h-max  " >
       
        <div className="mx-auto py-16 ">
      
       

         


  

<div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg max-w-6xl rounded-xl mx-auto bg-white">
    <h1 className="font-bold text-5xl p-10 ">Hola, @user</h1>

    <div className="grid grid-cols-2 p-10">
<div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-36 h-36 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>

<div class="grid grid-cols-1 gap-2 p-4">
        
        <div class="flex justify-end">
            <button type="button" class="w-36 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cerrar sesión</button>
        </div>
        <div class="flex justify-end">
            <button type="button" class="w-36 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
        </div>
        <div class="flex justify-end">
            <button type="button" class="w-36 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
        </div>
    </div>

    </div>
    
    
</div>



          </div>
          </div>
          <Footer/>
    </>
    
  );
} 