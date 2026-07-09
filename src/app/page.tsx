import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="z-10 w-full max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Bienvenido a HealthCloud</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Plataforma de salud con autenticación, perfiles y almacenamiento seguro
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button size="lg">Crear cuenta</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg">
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
