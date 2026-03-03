'use server'

import { redirect } from 'next/navigation'
import { createPost, updatePost, deletePostById } from '@/services/postService' 
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

  // 2. Agrupa os dados
  const postData = {
    title,
    subtitle,
    slug,
    imageUrl: imageUrl || undefined,
    content,
    categoryIds,
    productIds,
    partnerId: partnerId ? partnerId : undefined
  };

  // 3. O ROTEADOR: Se tem ID, atualiza. Se não tem, cria.
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