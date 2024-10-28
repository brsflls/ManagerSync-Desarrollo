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
    <div className="bg-slate-300 w-screen max-h-full pb-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-bold lg:text-5xl text-4xl text-center py-20">¡Bienvenido(a)!</h1>

          <form className="rounded-xl max-w-56 mx-auto mb-5 bg-white p-3" onSubmit={handleSubmit}>
            {success && <p className="text-cyan-600 mt-2">{success}</p>}

            {errors.email && <p className="text-pink-700">{errors.email[0]}</p>}
            {errors.cedula && <p className="text-pink-700">{errors.cedula[0]}</p>}
            {errors.password_confirmation && <p className="text-pink-700">{errors.password_confirmation}</p>}

            <div className="mb-2">
              <label htmlFor="nombre" className="block mb-2 ml-0.5 text-sm font-medium text-gray-900">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="nombre"
                className="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="block mb-2 ml-0.5 text-sm font-medium text-gray-900 dark:text-white">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
                placeholder="nombre@email.com"
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
                className="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
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
                className="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
                value={formData.empresa}
                onChange={handleChange}
                required
              >
                <option value="fisica">Física</option>
                <option value="extranjera">Extranjera</option>
                <option value="juridica">Jurídica</option>
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
                  className={`shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5
                    ${cedulaEmpresaStatus === 'inscrito' ? 'border-cyan-600' : cedulaEmpresaStatus === 'no inscrito' ? 'border-pink-700' : ''
                  }`}
                  placeholder="Cédula de empresa"
                  value={formData.cedula_empresa}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={verificarCedulaEmpresa}
                  className="absolute right-0 top-0 mt-2 font-medium mr-2 bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs py-1 px-2 rounded"
                  disabled={isValidatingCedula}
                >
                  {isValidatingCedula ? 'Validando...' : 'Validar'}
                </button>
                {cedulaEmpresaStatus === 'inscrito' && <span className="absolute inset-y-0 right-10 flex items-center pr-3 text-cyan-600">✔</span>}
                {cedulaEmpresaStatus === 'no inscrito' && <p className="text-pink-700 mt-1">La cédula no se encuentra inscrita en el sistema de Hacienda.</p>}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
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
                className="shadow-sm mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
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
                id="profile_image"
                className="shadow-sm mb-5  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                  file:py-2 file:px-4 file:-ml-2
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-sky-50 file:text-sky-800
                  hover:file:bg-sky-100"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full text-sm px-5 py-2.5 text-center font-medium text-white bg-sky-900 rounded-xl hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-blue-200">
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
