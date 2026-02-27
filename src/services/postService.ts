import { prisma } from '../lib/prisma';

export async function getPosts() {
  const posts = await prisma.post.findMany({
    take: 9,
    where: {
      published: true,
    },
    include: {
      partner: true,
      categories: true,
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts
}