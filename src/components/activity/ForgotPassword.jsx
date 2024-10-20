import { useState } from 'react';


export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => setEmail(e.target.value);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Resetear errores al enviar el formulario
      setErrors({});
  
      // Validar que el email tenga un formato correcto
      if (!email) {
        setErrors({ email: 'El correo electrónico es obligatorio.' });
        return;
      }
  
      try {
        const response = await fetch('http://managersyncbdf.test/api/password/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage(data.message);
          setEmail(''); // Limpiar el campo de email después de enviar
        } else {
          // Manejar errores específicos del servidor
          setErrors({ server: data.message || 'Ocurrió un error desconocido.' });
          setMessage('');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ server: 'Error occurred while sending the request.' });
        setMessage('');
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center">Recuperar Contraseña</h2>
          {message && <p className="text-green-500">{message}</p>}
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          {errors.server && <p className="text-red-500">{errors.server}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Enviar enlace de recuperación
            </button>
          </form>
        </div>
      </div>
    );
  }