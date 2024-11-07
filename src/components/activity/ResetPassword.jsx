import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Header } from '../Header.jsx';
export function ResetPassword() {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Crea una instancia de navigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const emailFromUrl = query.get('email');
    setEmail(emailFromUrl);
  }, [location]);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handlePasswordConfirmationChange = (e) => setPasswordConfirmation(e.target.value); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validaciones
    if (!password || !passwordConfirmation) {
      setErrors({ password: 'Ambas contraseñas son obligatorias.' });
      return;
    }
    if (password !== passwordConfirmation) {
      setErrors({ password: 'Las contraseñas no coinciden.' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://managersyncbdf.test/api/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, password_confirmation: passwordConfirmation, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Contraseña restablecida con éxito.');
        setPassword('');
        setPasswordConfirmation('');
        
        // Redirige al usuario al login después de un restablecimiento exitoso
        navigate('/login'); 
      } else {
        setErrors({ server: data.message || 'Ocurrió un error.' });
      }
    } catch (error) {
      setErrors({ server: 'Ocurrió un error al enviar la solicitud.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="bg-slate-500 w-screen max-h-full pb-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-bold lg:text-5xl text-4xl text-center py-20">Restablecer Contraseña</h2>
        {message && <p className="text-green-500">{message}</p>}
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        {errors.server && <p className="text-red-500">{errors.server}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Nueva Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-600'} rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300`}
          >
            {loading ? 'Cargando...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  </>
  );
}
