import { prisma } from '../lib/prisma';
import { ProductData } from '@/types';

export async function getProducts() {
    return prisma.product.findMany({
        include: { partner: true, categories: true }, // Traz os dados relacionados para a tabela
        orderBy: { createdAt: 'desc' }
    });
}

export async function getProductById(id: string) {
    return prisma.product.findUnique({
        where: { id },
        include: { categories: true } // Essencial para o modo de edição preencher o React Select
    });
}

export async function createProduct(data: ProductData) {
    return prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            affiliateLink: data.affiliateLink,
            price: data.price,
            partnerId: data.partnerId || null, // Se não tiver parceiro, envia null direto
            categories: {
                connect: data.categoryIds.map(id => ({ id }))
            }
        }
    });
}

export async function updateProduct(id: string, data: ProductData) {
    return prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            affiliateLink: data.affiliateLink,
            price: data.price,
            partnerId: data.partnerId || null, // Se remover na edição, vira null
            categories: {
                set: data.categoryIds.map(id => ({ id }))
            }
        }
    });
}

export async function deleteProductById(id: string) {
    return prisma.product.delete({
        where: { id }
    });
}