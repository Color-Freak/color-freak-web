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

// Adicione estas duas funções para buscar as opções disponíveis
export async function getAllCategories() {
  return prisma.category.findMany();
}

export async function getAllProducts() {
  return prisma.product.findMany();
}

export async function getAllPartners() {
  return prisma.partner.findMany();
}

// Atualize o createPost para receber os arrays de categorias e produtos
export async function createPost(data: {
  title: string;
  subtitle: string;
  slug: string;
  imageUrl?: string;
  content: string;
  categoryIds: string[]; // <-- NOVO
  productIds: string[];  // <-- NOVO
  partnerId?: string;
}) {
  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      imageUrl: data.imageUrl,
      content: data.content,
      published: true,
      authorId: "d7a8b9c0-1234-5678-abcd-ef1234567890", // O ID hardcoded que usamos antes
      partnerId: data.partnerId || null,
      categories: {
        connect: data.categoryIds.map(id => ({ id }))
      },
      products: {
        connect: data.productIds.map(id => ({ id }))
      }
    },
  });

  return newPost;
}