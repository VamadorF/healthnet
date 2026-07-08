import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <AuthCard
      title="Crear cuenta"
      description="Regístrate para acceder a HealthNet"
      footer={
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Inicia sesión
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
