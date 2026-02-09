import { prisma } from '../lib/prisma';

export async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true, // Só mostra o que está publicado
    },
    include: {
      partner: true, // Faz o join com parceiros
      categories: true, // Faz o join com categorias
    },
    orderBy: {
      createdAt: 'desc', // Mais recentes primeiro
    },
  })

  return posts
}