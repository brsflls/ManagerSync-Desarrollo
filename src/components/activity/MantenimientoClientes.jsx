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
      <Header />
      <div className="bg-slate-300  grid grid-cols-8 w-screen h-max  ">
      <div>
          <Sidebar logout={logout} /> {/* Pasa la función logout al Sidebar */}
        </div>

        <div className=" col-span-7 py-16 ">
          <div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg max-w-6xl rounded-xl mx-auto bg-white">
            <h1 className="text-2xl font-bold mb-6">Registrar Cliente</h1>
            <form onSubmit={editingCliente ? handleUpdate : handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">Nombre</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Dirección</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Teléfono</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Cédula</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
                >
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
                  className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
          <div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg max-w-6xl rounded-xl mx-auto">

          <h2 className="text-xl font-semibold mt-10 mb-4">Clientes Registrados</h2>
          

          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
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
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
