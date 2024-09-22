// useUpdateProfile.js
import { useState } from 'react';

export const useUpdateProfile = (token, setUser, setToken) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const updateProfile = async (formData, profileImage) => {
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('email', formData.email);
    data.append('cedula', formData.cedula);
    data.append('role', formData.role);
    if (profileImage) {
      data.append('profile_image', profileImage);
    }

    try {
      const response = await fetch('http://managersyncbdf.test/api/update-Profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.errors ? result.errors : 'Error al actualizar el perfil');
      }

      setUser(result.user);
      if (result.token) {
        setToken(result.token);
        localStorage.setItem('token', result.token);
      }

      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, success, updateProfile };
};
