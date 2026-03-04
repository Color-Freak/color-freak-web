import { getCategories } from '@/services/categoryService';
import { getPartners } from '@/services/partnerService';
import { ProductForm } from './ProductForm';

export default async function NewProductPage() {
    const [{ categories }, { partners }] = await Promise.all([
        getCategories(1, 100), 
        getPartners(1, 100)    
    ]);

    return <ProductForm categories={categories} partners={partners} />;
}