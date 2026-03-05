import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

// Busca matérias para a listagem da home e aceita filtro por palavra chave
export async function getPosts(page: number = 1, limit: number = 9, search?: string, categoryId?: string) {
  console.log("⚙️ 2. O motor recebeu a categoria:", categoryId);
  const skip = (page - 1) * limit;

  const whereCondition: Prisma.PostWhereInput = {
    published: true,
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ],
    }),
    // Condição de filtro por categoria (injetada dinamicamente se o ID existir)
    ...(categoryId && {
      categories: { some: { id: categoryId } },
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


// Busca os posts mais recentes para o SideBar
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

// Busca todas as categorias para o cadastro de matéria
export async function getAllCategories() {
  return prisma.category.findMany();
}

// Busca todos os produtos para o cadastro de matéria
export async function getAllProducts() {
  return prisma.product.findMany();
}

// Busca todos os parceiros para o cadastro de matéria
export async function getAllPartners() {
  return prisma.partner.findMany();
}

// Cria uma nova matéria
export async function createPost(data: {
  title: string;
  subtitle: string;
  slug: string;
  imageUrl?: string;
  content: string;
  categoryIds: string[]; // <-- NOVO
  productIds: string[];  // <-- NOVO
  partnerId?: string;
  authorId: string;
}) {
  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      imageUrl: data.imageUrl,
      content: data.content,
      published: true,
      authorId: data.authorId,
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

// Busca os posts para a listagem do admin
export async function getAdminPosts(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  // Promise.all executa as duas consultas no banco ao mesmo tempo para ganhar velocidade
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true
      }
    }),
    prisma.post.count() // Conta o total real de matérias no banco
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    posts,
    totalPages,
    currentPage: page
  };
}

// Deleta a matéria pelo ID
export async function deletePostById(id: string) {
  return prisma.post.delete({
    where: { id }
  });
}

// Busca a matéria para a página de edição
export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      categories: true,
      products: true,
    }
  });
}

// Tipagem simplificada baseada no que a Action envia
type PostUpdateData = {
  title: string;
  subtitle: string;
  slug: string;
  imageUrl?: string;
  content: string;
  categoryIds: string[];
  productIds: string[];
  partnerId?: string;
};

// Atualiza uma matéria já existente
export async function updatePost(id: string, data: PostUpdateData) {
  return prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      imageUrl: data.imageUrl,
      content: data.content,
      partnerId: data.partnerId,

      // O 'set' apaga as relações antigas e cria as novas exatamente como vieram do form
      categories: {
        set: data.categoryIds.map(categoryId => ({ id: categoryId }))
      },
      products: {
        set: data.productIds.map(productId => ({ id: productId }))
      }
    }
  });
}