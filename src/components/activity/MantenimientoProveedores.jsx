import React, { useEffect, useState } from 'react';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';

export function MantenimientoProveedores() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [cedulaJuridica, setCedulaJuridica] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);

  const fetchProveedores = () => {
    fetch('http://localhost/managersyncbdf/public/api/proveedores/all')
      .then(response => response.json())
      .then(data => {
        setProveedores(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching proveedores:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const proveedor = {
      nombre,
      direccion,
      telefono,
      email,
      cedula_juridica: cedulaJuridica,
    };

    fetch('http://localhost/managersyncbdf/public/api/proveedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedor),
    })
      .then(response => response.json())
      .then(() => {
        setNombre('');
        setDireccion('');
        setTelefono('');
        setEmail('');
        setCedulaJuridica('');
        fetchProveedores(); // Refetch proveedores después de agregar
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost/managersyncbdf/public/api/proveedores/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchProveedores(); // Refetch proveedores después de eliminar
        } else {
          console.error('Error al eliminar el proveedor', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleEdit = (proveedor) => {
    setNombre(proveedor.nombre);
    setDireccion(proveedor.direccion);
    setTelefono(proveedor.telefono);
    setEmail(proveedor.email);
    setCedulaJuridica(proveedor.cedula_juridica);
    setEditingProveedor(proveedor.id);
    setModalVisible(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedProveedor = {
      nombre,
      direccion,
      telefono,
      email,
      cedula_juridica: cedulaJuridica,
    };

    fetch(`http://localhost/managersyncbdf/public/api/proveedores/${editingProveedor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProveedor),
    })
      .then(response => {
        if (response.ok) {
          fetchProveedores(); // Refetch proveedores después de actualizar
          setModalVisible(false);
          setEditingProveedor(null);
          setNombre('');
          setDireccion('');
          setTelefono('');
          setEmail('');
          setCedulaJuridica('');
        } else {
          console.error('Error al actualizar el proveedor', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  if (loading) return <p>Cargando proveedores...</p>;

  return (
    <>
      <Header />
      <div className="bg-blue-100 w-screen h-max">
        <div className="mx-auto py-16 max-w-6xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Registrar Proveedor</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">Nombre del proveedor</label>
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
                <textarea
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                ></textarea>
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
                <label className="block text-gray-700 font-semibold">Cédula Jurídica</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={cedulaJuridica}
                  onChange={(e) => setCedulaJuridica(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNombre('');
                    setDireccion('');
                    setTelefono('');
                    setEmail('');
                    setCedulaJuridica('');
                  }}
                  className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <h2 className="text-xl font-semibold mt-10 mb-4">Proveedores Registrados</h2>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Dirección</th>
                <th className="p-3 text-left">Teléfono</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Cédula Jurídica</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id} className="border-b border-gray-200">
                  <td className="p-3">{proveedor.nombre}</td>
                  <td className="p-3">{proveedor.direccion}</td>
                  <td className="p-3">{proveedor.telefono}</td>
                  <td className="p-3">{proveedor.email}</td>
                  <td className="p-3">{proveedor.cedula_juridica}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(proveedor)} 
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(proveedor.id)} 
                      className="text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal para editar proveedor */}
          {modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                <h2 className="text-2xl font-bold mb-4">Editar Proveedor</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold">Nombre del proveedor</label>
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
                    <textarea
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      required
                    ></textarea>
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
                    <label className="block text-gray-700 font-semibold">Cédula Jurídica</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={cedulaJuridica}
                      onChange={(e) => setCedulaJuridica(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Actualizar
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalVisible(false)}
                      className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

