import { resend, FROM_EMAIL } from '@/lib/resend';
import { WelcomeEmail } from './templates/welcome';
import { captureException } from '@/lib/sentry';

export async function sendWelcomeEmail(to: string, userName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: '¡Bienvenido a HealthNet!',
      react: WelcomeEmail({ userName }),
    });

    if (error) {
      captureException(new Error(`Error al enviar email de bienvenida: ${error.message}`));
      throw error;
    }

    return data;
  } catch (error) {
    captureException(error as Error, { to, type: 'welcome_email' });
    throw error;
  }
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Restablecer tu contraseña',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #333;">Restablecer contraseña</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:
          </p>
          <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
            Restablecer contraseña
          </a>
          <p style="font-size: 14px; color: #999;">
            Si no solicitaste este cambio, puedes ignorar este correo.
          </p>
        </div>
      `,
    });

    if (error) {
      captureException(new Error(`Error al enviar email de reset: ${error.message}`));
      throw error;
    }

    return data;
  } catch (error) {
    captureException(error as Error, { to, type: 'password_reset_email' });
    throw error;
  }
}
