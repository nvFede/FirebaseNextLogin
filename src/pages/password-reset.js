import React, { useState } from 'react';
import { resetPassword } from '@/hooks/useAuth'; // Adjust the import path as necessary

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      setMessage('Se ha enviado un correo para restablecer tu contraseña.');
      setError('');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h1>Restablecer Contraseña</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar enlace de restablecimiento</button>
      </form>
    </div>
  );
};

export default PasswordReset;
