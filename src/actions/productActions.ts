'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createProduct, updateProduct, deleteProductById } from '@/services/productService'

export async function handleSaveProduct(formData: FormData) {
  const productId = formData.get('productId') as string | null;
  
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const affiliateLink = formData.get('affiliateLink') as string;
  const price = formData.get('price') as string;
  
  // Captura os relacionamentos
  const partnerId = formData.get('partnerId') as string;
  const categoryIds = formData.getAll('categoryIds') as string[];

  const productData = { 
    name, 
    description: description || undefined,
    imageUrl,
    affiliateLink,
    price: price || undefined,
    partnerId: partnerId || undefined,
    categoryIds
  };

  if (productId) {
    await updateProduct(productId, productData);
  } else {
    await createProduct(productData);
  }

  // Limpa o cache para atualizar a tabela de produtos e o select no form de matérias
  revalidatePath('/admin/products');
  revalidatePath('/admin/posts/new');
  redirect('/admin/products');
}

export async function handleDeleteProduct(id: string) {
  await deleteProductById(id);
  revalidatePath('/admin/products');
}