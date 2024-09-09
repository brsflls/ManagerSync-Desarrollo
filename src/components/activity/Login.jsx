import { useNavigate } from 'react-router-dom';
import "../../index.css";
import { Header } from '.././Header.jsx';
import { Footer } from '.././Footer.jsx';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    
    // Aquí puedes agregar tu lógica de autenticación
    
    // Si el inicio de sesión es exitoso, redirigimos a la página de Settings
    navigate('/Settings');
  };

  return (
    <>
      <Header />
      <div className="bg-blue-100 w-screen max-h-full pb-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-bold text-5xl text-center py-20">¡Bienvenido(a)!</h1>

          <form className="max-w-56 rounded-xl mx-auto bg-white mb-5 p-3" onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre de usuario
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
