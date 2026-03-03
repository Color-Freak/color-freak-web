import { getProductById } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import { getPartners } from '@/services/partnerService';
import { notFound } from 'next/navigation';
import { ProductForm } from '../../new/ProductForm';

type EditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditPageProps) {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    // Traz o produto atual e as listas para preencher os selects
    const [product, categories, partners] = await Promise.all([
        getProductById(productId),
        getCategories(),
        getPartners()
    ]);

    if (!product) {
        notFound();
    }

    return <ProductForm categories={categories} partners={partners} product={product} />;
}