import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

// Adicionamos o search no parâmetro
export async function getPosts(page: number = 1, limit: number = 9, search?: string) {
  const skip = (page - 1) * limit;

  // Montamos a condição do banco de dados tipada corretamente
  const whereCondition: Prisma.PostWhereInput = {
    published: true,
    // Se existir um 'search', adiciona a condição OR (Busca no título OU no conteúdo)
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      skip: skip,
      take: limit,
      where: whereCondition, // Passamos a condição montada aqui
      include: {
        partner: true,
        categories: true,
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count({
      where: whereCondition // Passamos a mesma condição para a contagem bater certo
    })
  ]);

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

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: { 
      slug: slug 
    },
    include: {
      author: true,
      categories: true,
      partner: true,
      products: true, // Trazemos os produtos indicados também
    },
  });

  return post;
}