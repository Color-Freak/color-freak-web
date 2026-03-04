import { prisma } from '../lib/prisma';
import { PartnerData } from '@/types';

export async function getPartners(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [partners, totalCount] = await Promise.all([
    prisma.partner.findMany({
      orderBy: { name: 'asc' },
      skip,
      take: limit
    }),
    prisma.partner.count()
  ]);

  return { partners, totalPages: Math.ceil(totalCount / limit) };
}

export async function getPartnerById(id: string) {
  return prisma.partner.findUnique({
    where: { id }
  });
}

export async function createPartner(data: PartnerData) {
  return prisma.partner.create({ data });
}

export async function updatePartner(id: string, data: PartnerData) {
  return prisma.partner.update({
    where: { id },
    data
  });
}

export async function deletePartnerById(id: string) {
  return prisma.partner.delete({
    where: { id }
  });
}