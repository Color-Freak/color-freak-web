import { Prisma } from '@prisma/client'

/**
 * Definição de um Post que inclui os dados do Parceiro e Categorias.
 * Usamos isso no Card e na Página do Post.
 */
export type PostWithDetails = Prisma.PostGetPayload<{
  include: {
    partner: true
    categories: true
  }
}>

// Se no futuro tivermos "ProductWithPartner", colocaremos aqui também.