import { getCategories } from '@/services/categoryService';
import { getPartners } from '@/services/partnerService';
import { ProductForm } from './ProductForm';

export default async function NewProductPage() {
    // Executa as duas consultas ao mesmo tempo
    const [categories, partners] = await Promise.all([
        getCategories(),
        getPartners()
    ]);

    return <ProductForm categories={categories} partners={partners} />;
}