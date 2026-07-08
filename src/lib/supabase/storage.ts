import { createClient } from './server';

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublicUrl(bucket: string, path: string) {
  const supabase = await createClient();

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function getSignedUrl(
  bucket: string,
  path: string,
  expiresIn: number = 3600
) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}

export async function deleteFile(bucket: string, path: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    throw error;
  }

  return true;
}

export async function listFiles(bucket: string, path?: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path);

  if (error) {
    throw error;
  }

  return data;
}
