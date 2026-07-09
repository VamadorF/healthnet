import { Resend } from 'resend';

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@healthcloud.com';

let resendClient: Resend | null = null;

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY no está configurado');
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}
