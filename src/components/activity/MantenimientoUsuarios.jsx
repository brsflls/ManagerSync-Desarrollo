import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../../index.css";
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';

export function MantenimientoUsuarios() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    role: 'vendedor', // Cambiar a 'vendedor' o según tu lógica
    password: '',
    password_confirmation: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [usuarios, setUsuarios] = useState([]); // Para listar los usuarios
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch para obtener la lista de usuarios al cargar el componente
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://managersyncbdf.test/api/usuarios', {
          headers: {
            'Authorization': `Bearer ${token}` // Asegúrate de manejar el token correctamente
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener usuarios');
        }

        const data = await response.json();
        setUsuarios(data.usuarios);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (event) => {
    const { id, value, type, files } = event.target;
    setFormData({
      ...formData,
      [id]: type === 'file' ? files[0] : value
    });
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
        headers: {
          'Authorization': `Bearer ${token}` // Incluye el token aquí
        },
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
        navigate('/usuarios'); // Redirigir a la lista de usuarios o donde sea necesario
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
          <h1 className="font-bold text-5xl text-center py-10">Mantenimiento de Usuarios</h1>

          {success && <p className="text-green-500 mt-2">{success}</p>}

          <form className="rounded-xl max-w-56 mx-auto mb-5 bg-white p-3" onSubmit={handleSubmit}>
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
            {errors.cedula && <p className="text-red-500">{errors.cedula[0]}</p>}
            {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}

            <div className="mb-2">
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de usuario</label>
              <input type="text" id="nombre" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
              <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-2">
              <label htmlFor="cedula" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cédula de identidad</label>
              <input type="text" id="cedula" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Cédula" value={formData.cedula} onChange={handleChange} required />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
              <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mb-2">
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña</label>
              <input type="password" id="password_confirmation" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.password_confirmation} onChange={handleChange} required />
              {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen de perfil</label>
              <input type="file" id="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" accept="image/*" onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2">
              <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white hover:bg-gray-100 hover:text-blue-700" onClick={() => navigate('/LogIn')}>Iniciar sesión</button>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrar Usuario</button>
            </div>
          </form>

          {/* Aquí puedes agregar una lista de usuarios */}
          <div>
            <h2 className="text-lg font-bold">Lista de Usuarios</h2>
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id}>{usuario.nombre} - {usuario.email}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
