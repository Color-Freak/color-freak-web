'use server'

import { redirect } from 'next/navigation'
import { createPost } from '@/services/postService'

export async function handleSavePost(formData: FormData) {
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const slug = formData.get('slug') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const content = formData.get('content') as string;
  
  // Captura todos os checkboxes marcados (retorna um array de strings com os IDs)
  const categoryIds = formData.getAll('categoryIds') as string[];
  const productIds = formData.getAll('productIds') as string[];
  const partnerId = formData.get('partnerId') as string;

  await createPost({
    title,
    subtitle,
    slug,
    imageUrl: imageUrl || undefined,
    content,
    categoryIds, // <-- Envia para o banco
    productIds,   // <-- Envia para o banco
    partnerId: partnerId ? partnerId : undefined
  });

  redirect('/');
}