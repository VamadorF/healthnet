import { AuthCard } from '@/components/auth/auth-card';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Nueva contraseña"
      description="Ingresa tu nueva contraseña para continuar"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
