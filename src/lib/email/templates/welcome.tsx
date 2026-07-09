import * as React from 'react';

interface WelcomeEmailProps {
  userName: string;
}

export function WelcomeEmail({ userName }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>¡Bienvenido a HealthCloud, {userName}!</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#666' }}>
        Estamos emocionados de tenerte con nosotros. Tu cuenta ha sido creada exitosamente.
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#666' }}>
        Para comenzar, por favor verifica tu correo electrónico haciendo clic en el enlace
        que te enviamos.
      </p>
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <p style={{ fontSize: '14px', color: '#999' }}>
          Saludos,
          <br />
          El equipo de HealthCloud
        </p>
      </div>
    </div>
  );
}
