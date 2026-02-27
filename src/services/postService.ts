import { prisma } from '../lib/prisma';

export async function getPosts(page: number = 1, limit: number = 9) {
  // Matemática simples: se estou na página 2 e o limite é 9, devo pular os 9 primeiros.
  const skip = (page - 1) * limit;

  // Promise.all executa as duas buscas no banco ao mesmo tempo (mais rápido)
  const [posts, totalPosts] = await Promise.all([
    // Busca 1: Pega apenas os 9 posts da página atual
    prisma.post.findMany({
      skip: skip,
      take: limit,
      where: { published: true },
      include: {
        partner: true,
        categories: true,
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    }),

    // Busca 2: Conta quantos posts publicados existem no total
    prisma.post.count({
      where: { published: true }
    })
  ]);

  // Math.ceil arredonda para cima. Ex: 12 posts / 9 = 1.33 (2 páginas)
  const totalPages = Math.ceil(totalPosts / limit);

  return { posts, totalPages };
}

export async function getLatestPosts(limit: number = 6) {
  const latestPosts = await prisma.post.findMany({
    take: limit, // Traz apenas a quantidade necessária (melhor performance)
    where: { published: true },
    orderBy: { createdAt: 'desc' }, // Garante que são os mais recentes
  });

  return latestPosts;
}