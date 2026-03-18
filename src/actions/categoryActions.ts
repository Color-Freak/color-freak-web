'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createCategory, updateCategory, deleteCategoryById } from '@/services/categoryService'

export async function handleSaveCategory(formData: FormData) {
  const categoryId = formData.get('categoryId') as string | null;
  const name = formData.get('name') as string;

  const categoryData = { name };

  if (categoryId) {
    await updateCategory(categoryId, categoryData);
  } else {
    await createCategory(categoryData);
  }

  // Limpa o cache da listagem e do formulário de matérias
  revalidatePath('/admin/categories');
  revalidatePath('/admin/products/new');
  revalidatePath('/admin/posts/new'); 
  redirect('/admin/categories');
}

export async function handleDeleteCategory(id: string) {
  await deleteCategoryById(id);
  revalidatePath('/admin/categories');
}