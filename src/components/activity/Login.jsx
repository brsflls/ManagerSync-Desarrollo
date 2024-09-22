import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext.jsx';
import "../../index.css";
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';

export function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { setUser, setToken } = useUser(); // Usar el contexto
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://managersyncbdf.test/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.usuario); // Guardar el usuario en el contexto
        setToken(data.token); // Guardar el token en el contexto
        navigate('/Settings');
      } else {
        if (data.message) {
          setErrors({ server: data.message }); // Mostrar mensaje específico del backend
        } else {
          setErrors({ server: 'Credenciales incorrectas. Por favor intenta de nuevo.' });
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrors({ server: 'Hubo un problema al intentar iniciar sesión.' });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-blue-100 w-screen max-h-full pb-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-bold text-5xl text-center py-20">¡Bienvenido(a)!</h1>
          <form className="max-w-56 rounded-xl mx-auto bg-white mb-5 p-3" onSubmit={handleLogin}>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {errors.server && <p className="text-red-500 mb-5">{errors.server}</p>}
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
