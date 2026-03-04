import { getCategoryById } from '@/services/categoryService';
import { notFound } from 'next/navigation';
import { CategoryForm } from '../../new/CategoryForm';

type EditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: EditPageProps) {
    const resolvedParams = await params;
    const categoryId = resolvedParams.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
        notFound();
    }

    return <CategoryForm category={category} />;
}