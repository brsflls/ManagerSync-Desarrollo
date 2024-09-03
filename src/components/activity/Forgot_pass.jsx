import "../../index.css";



export function Forgot_pass() {
  
  return (
    <>
        {/*
      <h1 className="font-bold">
        <span className='text-4xl'>Manager</span>
        <span className='text-4xl text-blue-400'>Sync</span>
      </h1>*/}
        <div className="mx-auto max-w-2xl">
        <h1 className="font-bold text-5xl text-center py-20">Recuperar tu contraseña</h1>
       

         


        <form className="rounded-xl max-w-56  mx-auto bg-white p-3 ">
  <div className="mb-2">
    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de usuario</label>
    <input type="username" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Username" required />
  </div>
  <div className="mb-2">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
  </div>
<div className="grid grid-cols-2">
<button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar enlace</button>
  </div>
</form>


          </div>

    </>
    
  );
} 