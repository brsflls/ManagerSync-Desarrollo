import { useState, useEffect } from 'react';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import { useAccountManagement } from '../hooks/useAccountManagement.js';
import { Sidebar } from '../Sidebar.jsx';
import { useUser } from '../hooks/UserContext'; // Importar el contexto de usuario

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
  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <>
      <Header />
      <div className="bg-slate-300 grid grid-cols-8 w-screen h-max">
        <div>
          <Sidebar logout={logout} />
        </div>

        <div className="col-span-7 py-16">
          <div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg max-w-6xl rounded-xl mx-auto bg-white">
            <h1 className="text-2xl font-bold mb-6">{editingUsuario ? 'Actualizar Usuario' : 'Registrar Usuario'}</h1>
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
                  required
                >
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
                    {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md"
              >
                {editingUsuario ? 'Actualizar Usuario' : 'Registrar Usuario'}
              </button>
            </form>

            <h2 className="text-xl font-bold mt-8">Usuarios Registrados</h2>
            <table className="min-w-full mt-4">
              <thead>
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
                    <td className="border px-4 py-2">{usuario.nombre}</td>
                    <td className="border px-4 py-2">{usuario.email}</td>
                    <td className="border px-4 py-2">{usuario.role}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="bg-yellow-500 text-white p-1 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
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
