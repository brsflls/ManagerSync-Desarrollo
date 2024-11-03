import { useState, useEffect } from 'react';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import { useAccountManagement } from '../hooks/useAccountManagement.js';
import { Sidebar } from '../Sidebar.jsx';
import { useUser } from '../hooks/UserContext';
import { Loading } from './Loading.jsx';

export function MantenimientoUsuarios() {
  const { token, user } = useUser(); // Obtener el token y la información del usuario del contexto
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    cedula_empresa: user?.cedula_empresa || '', // Cargar cédula de la empresa del usuario
    empresa: user?.empresa || '', // Cargar nombre de la empresa del usuario
    role: '', // Cambié el valor inicial a una cadena vacía para que el usuario seleccione
    password: '',
    password_confirmation: ''
  });
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [errors, setErrors] = useState({});
  const { logout } = useAccountManagement();

  // Función para obtener usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://managersyncbdf.test/api/usuarios/all', {
        headers: {
          'Authorization': `Bearer ${token}` // Usar el token del contexto
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [token]); // Agregar token como dependencia

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      const response = await fetch('http://managersyncbdf.test/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Usar el token del contexto
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors || {});
        return;
      }

      fetchUsuarios(); // Refetch usuarios después de agregar
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para manejar la eliminación de un usuario
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (!confirmDelete) return; // Cancelar si el usuario no confirma

    try {
      const response = await fetch(`http://managersyncbdf.test/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Usar el token del contexto
        }
      });

      if (response.ok) {
        fetchUsuarios(); // Refetch usuarios después de eliminar
      } else {
        console.error('Error al eliminar el usuario', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para manejar la edición de un usuario
  const handleEdit = (usuario) => {
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      cedula: usuario.cedula,
      cedula_empresa: usuario.cedula_empresa,
      empresa: usuario.empresa,
      role: usuario.role,
      password: '',
      password_confirmation: ''
    });
    setEditingUsuario(usuario.id);
  };

  // Función para manejar la actualización de un usuario
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUsuario = { ...formData };

    try {
      const response = await fetch(`http://managersyncbdf.test/api/usuarios/${editingUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Usar el token del contexto
        },
        body: JSON.stringify(updatedUsuario),
      });

      if (response.ok) {
        fetchUsuarios(); // Refetch usuarios después de actualizar
        resetForm();
      } else {
        console.error('Error al actualizar el usuario', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para restablecer el formulario
  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      cedula: '',
      cedula_empresa: user?.cedula_empresa || '', // Resetear cédula de empresa
      empresa: user?.empresa || '', // Resetear nombre de empresa
      role: '', // Cambié el valor inicial a una cadena vacía
      password: '',
      password_confirmation: ''
    });
    setEditingUsuario(null);
    setErrors({});
  };

  // Mostrar cargando mientras se obtienen usuarios
  if (loading) return <Loading/>;

  return (
    <>
    <Header/>
      <div className="bg-slate-300  w-screen flex h-max gap-0">
      <div className="basis-1/4 mr-4 h-full">
          <Sidebar logout={logout}/>
        </div>

        <div className="flex gap-12">
        <div className="py-2  h-min pt-12 p-6 mx-auto mt-6  mb-4 -ml-12 mr-9 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 -mt-2">{editingUsuario ? 'Actualizar Usuario' : 'Registrar Usuario'}</h1>
            <form onSubmit={editingUsuario ? handleUpdate : handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Cédula</label>
                <input
                  type="text"
                  name="cedula"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={formData.cedula}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
  <label className="block text-gray-700 font-semibold">Cédula Empresa</label>
  <input
    type="text"
    name="cedula_empresa"
    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
    value={formData.cedula_empresa}
    readOnly
  />
</div>

<div>
  <label className="block text-gray-700 font-semibold">Empresa</label>
  <input
    type="text"
    name="empresa"
    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
    value={formData.empresa}
    readOnly
  />
</div>

              <div className="mb-2">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Rol
                </label>
                <select
                  id="role"
                  name="role" // Asegúrate de incluir el atributo name
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.role}
                  onChange={handleChange}
                  required>
                  <option value="">Seleccione un rol</option> {/* Opción para seleccionar un rol */}
                  <option value="admin">Administrador</option>
                  <option value="contador">Contador</option>
                  <option value="empleado">Empleado</option>
                </select>
              </div>

              {!editingUsuario && (
                <>
                  <div>
                    <label className="block text-gray-700 font-semibold">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">Confirmar Contraseña</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                    />
                    {errors.password_confirmation && <p className="text-pink-700">{errors.password_confirmation}</p>}
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full mt-4 font-medium text-white bg-sky-900  hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-blue-200 p-2 rounded-md"
              >
                {editingUsuario ? 'Actualizar Usuario' : 'Registrar Usuario'}
              </button>
            </form>
            </div>
            </div>

            <div className="flex gap-16">
        <div className="flex-shrink-0 gap-4 mr-10 w-full py-2 h-min pt-12 p-6 mx-auto mt-6 pb-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 -mt-2">Usuarios Registrados</h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className='bg-gray-200 text-gray-600'>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Nombre</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Rol</th>
                  <th className="border px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td className="border px-4 py-2">{usuario.id}</td>
                    <td className="border px-6 py-2">{usuario.nombre}</td>
                    <td className="border px-6 py-2">{usuario.email}</td>
                    <td className="border px-3 py-2">{usuario.role}</td>
                    <td className="border pr-1 py-2 pl-4 ml-2">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="text-sm text-center font-medium mt-1 px-6 py-1 pl-4 mr-3 ml-1 gap-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-slate-200 hover:text-sky-800 transition duration-200">
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        className="text-sm text-center font-medium mt-1 px-6 py-1 rounded-xl gap-2 bg-gray-50 text-gray-600 hover:bg-slate-200 hover:text-sky-800 transition duration-200">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
      </div>
      <Footer />
    </>
  );
}
