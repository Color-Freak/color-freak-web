'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createPartner, updatePartner, deletePartnerById } from '@/services/partnerService'

export async function handleSavePartner(formData: FormData) {
  const partnerId = formData.get('partnerId') as string | null;
  
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const logoUrl = formData.get('logoUrl') as string;
  const color = formData.get('color') as string;
  const website = formData.get('website') as string;

  // Empacotamos os dados. Se a string vier vazia do formulário, mandamos undefined para o banco
  const partnerData = { 
    name, 
    slug,
    logoUrl: logoUrl || undefined,
    color: color || undefined,
    website: website || undefined,
  };

  if (partnerId) {
    await updatePartner(partnerId, partnerData);
  } else {
    await createPartner(partnerData);
  }

  // Limpa o cache da listagem de parceiros e também do formulário de matérias
  revalidatePath('/admin/partners');
  revalidatePath('/admin/posts/new'); 
  revalidatePath('/admin/products/new'); 
  redirect('/admin/partners');
}

export async function handleDeletePartner(id: string) {
  await deletePartnerById(id);
  revalidatePath('/admin/partners');
}