import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../../index.css";
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';

export function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    cedula_empresa: '',
    role: 'admin',
    empresa: 'Juridica',
    password: '',
    password_confirmation: '',
    image: null
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(formData.role === 'admin'); // Estado para controlar si es admin
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value, type, files } = event.target;
    setFormData({
      ...formData,
      [id]: type === 'file' ? files[0] : value
    });

    // Si cambia el rol, actualizamos el estado isAdmin
    if (id === 'role') {
      setIsAdmin(value === 'admin');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: 'Las contraseñas no coinciden' });
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key === 'image' ? 'profile_image' : key, formData[key]);
    }

    try {
      const response = await fetch('http://managersyncbdf.test/api/register', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors || {});
        return;
      }
  
      const data = await response.json();
      setSuccess('Usuario registrado correctamente.');
      setTimeout(() => {
        navigate('/LogIn');
      }, 2000);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-blue-100 w-screen h-max">
        <div className="mx-auto max-w-2xl pb-10">
          <h1 className="font-bold text-5xl text-center py-10">¡Bienvenido(a)!</h1>

          <form className="rounded-xl max-w-56 mx-auto mb-5 bg-white p-3" onSubmit={handleSubmit}>
            {success && <p className="text-green-500 mt-2">{success}</p>}

            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
            {errors.cedula && <p className="text-red-500">{errors.cedula[0]}</p>}
            {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}

            <div className="mb-2">
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="nombre"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@flowbite.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="cedula" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Cédula de identidad
              </label>
              <input
                type="text"
                id="cedula"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cédula"
                value={formData.cedula}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Rol
              </label>
              <select
                id="role"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="admin">Administrador</option>
                <option value="contador">Contador</option>
                <option value="empleado">Empleado</option>
              </select>
            </div>

            {isAdmin && (
              <>
                <div className="mb-2">
                  <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    identificador de empresa
                  </label>
                  <select
                    id="empresa"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.empresa}
                    onChange={handleChange}
                    required={isAdmin}
                  >
                    <option value="fisica">Fisica</option>
                    <option value="extranjera">Extranjera</option>
                    <option value="juridica">Juridica</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="cedula_empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Cédula de empresa
                  </label>
                  <input
                    type="text"
                    id="cedula_empresa"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Cédula-empresa"
                    value={formData.cedula_empresa}
                    onChange={handleChange}
                    required={isAdmin}
                  />
                </div>
              </>
            )}

            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="password_confirmation"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
              {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Imagen de perfil
              </label>
              <input
                type="file"
                id="profile_image"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
