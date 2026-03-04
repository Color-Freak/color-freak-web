import { prisma } from '../lib/prisma';

export async function getCategories(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [categories, totalCount] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      skip,
      take: limit
    }),
    prisma.category.count()
  ]);

  return { categories, totalPages: Math.ceil(totalCount / limit) };
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id }
  });
}

export async function createCategory(data: { name: string }) {
  return prisma.category.create({ data });
}

export async function updateCategory(id: string, data: { name: string }) {
  return prisma.category.update({
    where: { id },
    data
  });
}

export async function deleteCategoryById(id: string) {
  return prisma.category.delete({
    where: { id }
  });
}