import { prisma } from '../lib/prisma';
import { ProductData } from '@/types';

export async function getProducts(categoryId?: string, page: number = 1, limit: number = 12) {
    const skip = (page - 1) * limit;

    const whereClause = categoryId ? {
        categories: { some: { id: categoryId } }
    } : {};

    const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
            where: whereClause,
            include: { partner: true, categories: true },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        }),
        prisma.product.count({ where: whereClause })
    ]);

    return {
        products,
        totalPages: Math.ceil(totalCount / limit)
    };
}

export async function getProductById(id: string) {
    return prisma.product.findUnique({
        where: { id },
        include: { categories: true }
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
            partnerId: data.partnerId || null,
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
            partnerId: data.partnerId || null,
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