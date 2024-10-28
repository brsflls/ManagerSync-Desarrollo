import { useState, useEffect } from 'react';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import { useAccountManagement } from '../hooks/useAccountManagement'; // Importa el hook
import { Sidebar } from '../Sidebar.jsx';

export function MantenimientoClientes() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [cedula, setCedula] = useState('');
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCliente, setEditingCliente] = useState(null);
  const { logout } = useAccountManagement(); // Usa el hook para obtener la función logout

  const fetchClientes = () => {
    fetch('http://localhost/managersyncbdf/public/api/clientes/all')
      .then(response => response.json())
      .then(data => {
        setClientes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cliente = { nombre, direccion, telefono, email, cedula };

    fetch('http://localhost/managersyncbdf/public/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then(response => response.json())
      .then(data => {
        fetchClientes(); // Refetch clientes después de agregar
        setNombre('');
        setDireccion('');
        setTelefono('');
        setEmail('');
        setCedula('');
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost/managersyncbdf/public/api/clientes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchClientes(); // Refetch clientes después de eliminar
        } else {
          console.error('Error al eliminar el cliente', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleEdit = (cliente) => {
    setNombre(cliente.nombre);
    setDireccion(cliente.direccion);
    setTelefono(cliente.telefono);
    setEmail(cliente.email);
    setCedula(cliente.cedula);
    setEditingCliente(cliente.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedCliente = { nombre, direccion, telefono, email, cedula };

    fetch(`http://localhost/managersyncbdf/public/api/clientes/${editingCliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCliente),
    })
      .then(response => {
        if (response.ok) {
          fetchClientes(); // Refetch clientes después de actualizar
          setEditingCliente(null);
          setNombre('');
          setDireccion('');
          setTelefono('');
          setEmail('');
          setCedula('');
        } else {
          console.error('Error al actualizar el cliente', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <>
      <Header/>
      <div className="bg-slate-300  w-screen flex h-max  gap-0">

      <div className="basis-1/4 mr-4 h-full">
          <Sidebar logout={logout}/>
        </div>

        <div className="flex gap-6">
            {/* Contenido principal */}
        <div className="basis-2/4 w-96 py-2 h-min pt-12 p-6 mx-auto mt-6  mb-4 -ml-20 bg-white rounded-lg shadow-lg" >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 -mt-4">Registrar clientes</h1>

            <form onSubmit={editingCliente ? handleUpdate : handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold text-base">Nombre</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md mb-0.5"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-base">Dirección</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md mb-0.5"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Teléfono</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md mb-0.5"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md mb-0.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Cédula</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md mb-0.5"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-5 my-4 py-2.5 text-center font-medium text-white bg-sky-900 rounded-xl hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-blue-200">
                  {editingCliente ? 'Actualizar' : 'Agregar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNombre('');
                    setDireccion('');
                    setTelefono('');
                    setEmail('');
                    setCedula('');
                    setEditingCliente(null);
                  }}
                  className="px-5 my-4 py-2.5 text-center font-medium rounded-2xl bg-gray-100 text-gray-600 hover:bg-slate-200 hover:text-sky-800 transition duration-200">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
          <div className="basis-2/4 py-2 pt-12 p-6 mx-auto mt-6 h-min mb-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 -mt-4">Clientes Registrados</h2>
          <table className="basis-2/4 py-2 pt-12 p-6 mx-auto mt-6  mb-4 bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Dirección</th>
                <th className="p-3 text-left">Teléfono</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Cédula</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-gray-200">
                  <td className="p-3">{cliente.nombre}</td>
                  <td className="p-3">{cliente.direccion}</td>
                  <td className="p-3">{cliente.telefono}</td>
                  <td className="p-3">{cliente.email}</td>
                  <td className="p-3">{cliente.cedula}</td>
                  <td className="p-3">

                    <button
                      onClick={() => handleEdit(cliente)}
                      className="text-sm text-center font-medium mt-1 px-6 py-1 rounded-xl bg-gray-50 text-gray-600 hover:bg-slate-200 hover:text-sky-800 transition duration-200" >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="text-sm font-medium mt-2 px-4 py-1 rounded-xl bg-gray-100 text-gray-600 hover:bg-slate-200 hover:text-sky-800 transition duration-200">
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
      <footer className="text-center w-full ">
        <Footer />
      </footer>
    </>
  );
}
