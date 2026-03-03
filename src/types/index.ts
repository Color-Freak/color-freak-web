import { Prisma } from '@prisma/client'

/**
 * Definição de um Post que inclui os dados do Parceiro e Categorias.
 * Usamos isso no Card e na Página do Post.
 */
export type PostWithDetails = Prisma.PostGetPayload<{
  include: {
    partner: true;
    categories: true;
    author: true;
  }
}>

// Tipagem de parceiros
export type PartnerData = {
  name: string;
  slug: string;
  logoUrl?: string;
  color?: string;
  website?: string;
};

// Tipagem de produtos
export type ProductData = {
  name: string;
  description?: string;
  imageUrl: string;
  affiliateLink: string;
  price?: string;
  partnerId?: string;
  categoryIds: string[]; // <-- Recebe os IDs do React Select
};