// pages/reset-password.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { oobCode } = router.query; // Código de la operación de Firebase

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para cambiar la contraseña usando Firebase
  };

  return (
    <div>
      <h1>Restablecer Contraseña</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva Contraseña"
          required
        />
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
