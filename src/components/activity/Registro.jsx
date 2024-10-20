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
    empresa: 'juridica', // Cambia esto según lo que necesites
    password: '',
    password_confirmation: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [cedulaEmpresaStatus, setCedulaEmpresaStatus] = useState(null);
  const [isValidatingCedula, setIsValidatingCedula] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value, type, files } = event.target;
    setFormData({
      ...formData,
      [id]: type === 'file' ? files[0] : value
    });
  };

  const verificarCedulaEmpresa = async () => {
    const cedulaEmpresa = formData.cedula_empresa;
    const esFisica = formData.empresa === 'fisica';
    const esJuridica = formData.empresa === 'juridica';

    // Validamos la longitud de la cédula dependiendo del tipo de empresa
    if ((esFisica && cedulaEmpresa.length !== 9) || (esJuridica && cedulaEmpresa.length !== 10)) {
      setCedulaEmpresaStatus(null);
      console.log('Cédula inválida según el tipo de empresa');
      return;
    }

    console.log('Verificando cédula de empresa:', cedulaEmpresa);
    setIsValidatingCedula(true);

    try {
      const response = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${cedulaEmpresa}`);
      const data = await response.json();

      console.log('Respuesta de la API:', data); // Ver respuesta de la API

      // Accediendo al estado en la propiedad situacion
      const estado = data.situacion.estado.toLowerCase(); // Convertimos a minúsculas para evitar problemas de comparación

      if (estado === 'no inscrito') {
        setCedulaEmpresaStatus('no inscrito');
      } else if (estado === 'inscrito') {
        setCedulaEmpresaStatus('inscrito');
      } else {
        setCedulaEmpresaStatus(null);
      }
    } catch (error) {
      console.error('Error al verificar la cédula de empresa:', error);
      setCedulaEmpresaStatus(null);
    } finally {
      setIsValidatingCedula(false);
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
              <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Identificador de empresa
              </label>
              <select
                id="empresa"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.empresa}
                onChange={handleChange}
                required
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
              <div className="relative">
                <input
                  type="text"
                  id="cedula_empresa"
                  className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    cedulaEmpresaStatus === 'inscrito' ? 'border-green-500' : cedulaEmpresaStatus === 'no inscrito' ? 'border-red-500' : ''
                  }`}
                  placeholder="Cédula-empresa"
                  value={formData.cedula_empresa}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={verificarCedulaEmpresa}
                  className="absolute right-0 top-0 mt-1 mr-2 bg-blue-500 text-white text-xs py-1 px-2 rounded"
                  disabled={isValidatingCedula}
                >
                  {isValidatingCedula ? 'Validando...' : 'Validar'}
                </button>
                {cedulaEmpresaStatus === 'inscrito' && <span className="absolute inset-y-0 right-10 flex items-center pr-3 text-green-500">✔</span>}
                {cedulaEmpresaStatus === 'no inscrito' && <p className="text-red-500 mt-1">La cédula no se encuentra inscrita en el sistema de Hacienda.</p>}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Contraseña"
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
                placeholder="Confirmar contraseña"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Imagen de perfil
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
