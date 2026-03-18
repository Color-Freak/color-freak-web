import { prisma } from '@/lib/prisma' // Ajuste o caminho do seu prisma se necessário
import { ProductCard } from './ProductCard'

export async function InlineProductFetcher({ id }: { id: string }) {
    const product = await prisma.product.findUnique({
        where: { id: id }
    })

    if (!product) return null;

    return <ProductCard product={product} variant="horizontal" />
}