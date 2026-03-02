import { getPostById, getAllCategories, getAllProducts, getAllPartners } from '@/services/postService';
import { PostForm } from '../../new/PostForm';

import { notFound } from 'next/navigation';

// Tipagem para capturar o parâmetro [id] da URL
type EditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPageProps) {
    const resolvedParams = await params;
    const postId = resolvedParams.id;

    // Executa todas as buscas em paralelo para máxima velocidade
    const [post, categories, products, partners] = await Promise.all([
        getPostById(postId),
        getAllCategories(),
        getAllProducts(),
        getAllPartners()
    ]);

    // Se o ID não existir na base de dados, mostra a página 404 automática do Next.js
    if (!post) {
        notFound();
    }

    // Passamos o "post" como uma nova propriedade para o componente
    return <PostForm categories={categories} products={products} partners={partners} post={post} />;
}