// Settings.jsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext';
import { useProfileForm } from '../hooks/useProfileForm';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useAccountManagement } from '../hooks/useAccountManagement';
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import "../../index.css";

export function Settings() {
  const { user, setUser, token, setToken } = useUser();
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Hooks personalizados
  const { formData, handleChange } = useProfileForm(user);
  const { error, success, updateProfile } = useUpdateProfile(token, setUser, setToken);
  const { deleteAccount, logout } = useAccountManagement(setUser, setToken);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfile(formData, profileImage);
    setEditMode(false);
  };

  if (!user) {
    return <div>No hay usuario</div>; // Manejo de usuarios no autenticados
  }

  return (
    <>
      <Header />
      <div className="bg-blue-100 w-screen h-max">
        <div className="mx-auto py-16">
          <div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg max-w-6xl rounded-xl mx-auto bg-white">
            <h1 className="font-bold text-5xl p-10">Hola, {user.nombre}</h1>
            <h2 className="font-semibold text-3xl p-5">Rol: {user.role}</h2>

            <div className="grid grid-cols-2 p-10">
              <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="absolute w-36 h-36 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2 p-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="w-36 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                  >
                    {editMode ? 'Cancelar' : 'Editar perfil'}
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowConfirmDelete(true)}
                    className="w-36 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                  >
                    Eliminar cuenta
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="w-36 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>

            {editMode && (
              <form onSubmit={handleUpdateProfile} className="p-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Cédula</label>
                    <input
                      type="text"
                      name="cedula"
                      value={formData.cedula}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Rol</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="admin">Admin</option>
                      <option value="contador">Contador</option>
                      <option value="auditor">Auditor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Imagen de perfil</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="py-2 px-4 text-white bg-blue-600 rounded"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            )}

            {showConfirmDelete && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-5 rounded-lg">
                  <h3 className="text-lg">¿Estás seguro de que deseas eliminar tu cuenta?</h3>
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded"
                      onClick={() => deleteAccount(token)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={() => setShowConfirmDelete(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
