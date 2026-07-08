'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { updateAvatarPath, updateProfile } from '@/app/profile/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProfileFormProps {
  userId: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 2 * 1024 * 1024;

export function ProfileForm({ userId, email, fullName, avatarUrl }: ProfileFormProps) {
  const [name, setName] = useState(fullName);
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileSubmit = (formData: FormData) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      setSuccess('Perfil actualizado correctamente');
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WebP');
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('La imagen no puede superar 2 MB');
      return;
    }

    setIsUploading(true);

    try {
      const extension = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
      const path = `${userId}/avatar.${extension}`;
      const supabase = createClient();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true, cacheControl: '3600' });

      if (uploadError) throw uploadError;

      const result = await updateAvatarPath(path);
      if (result.error) throw new Error(result.error);

      const { data: signedData, error: signedError } = await supabase.storage
        .from('avatars')
        .createSignedUrl(path, 3600);

      if (signedError) throw signedError;

      setPreviewUrl(signedData.signedUrl);
      setSuccess('Avatar actualizado correctamente');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir el avatar');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-gray-500">
              {name.charAt(0).toUpperCase() || email.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sube una imagen JPG, PNG o WebP (máx. 2 MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            disabled={isUploading}
            className="text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
          />
          {isUploading && (
            <p className="text-sm text-gray-500">Subiendo avatar...</p>
          )}
        </div>
      </section>

      <form action={handleProfileSubmit} className="space-y-4">
        <Input
          id="full_name"
          name="full_name"
          label="Nombre completo"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          disabled
        />

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
            <p className="text-sm text-green-800 dark:text-green-300">{success}</p>
          </div>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </form>
    </div>
  );
}
