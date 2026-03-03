import { prisma } from '../lib/prisma';

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
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