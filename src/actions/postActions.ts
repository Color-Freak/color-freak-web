'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { createPost, updatePost, deletePostById } from '@/services/postService';
import { revalidatePath } from 'next/cache';

export async function handleSavePost(formData: FormData) {
  const postId = formData.get('postId') as string | null;
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const slug = formData.get('slug') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const content = formData.get('content') as string;
  const categoryIds = formData.getAll('categoryIds') as string[];
  const productIds = formData.getAll('productIds') as string[];
  const partnerId = formData.get('partnerId') as string;

  // 3. Lemos o cookie para pegar o Token do usuário logado
  const cookieStore = await cookies();
  const token = cookieStore.get('color-freak-token')?.value;

  if (!token) {
    throw new Error('Usuário não autenticado. Faça login novamente.');
  }

  const payload = await verifyToken(token);

  if (!payload || !payload.userId) {
    throw new Error('Sessão inválida.');
  }

  const postData = {
    title,
    subtitle,
    slug,
    imageUrl: imageUrl || undefined,
    content,
    categoryIds,
    productIds,
    partnerId: partnerId ? partnerId : undefined,
    authorId: payload.userId as string
  };

  if (postId) {
    await updatePost(postId, postData);
  } else {
    await createPost(postData);
  }

  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function handleDeletePost(id: string) {
  await deletePostById(id);
  revalidatePath('/admin/posts');
}