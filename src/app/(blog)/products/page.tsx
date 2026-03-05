import { getProducts } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import { ProductCard } from '@/components/features/ProductCard';
import { Pagination } from '@/components/features/Pagination';
import { TopBar } from '@/components/features/TopBar';
import { CategorySideBar } from '@/components/features/CategorySideBar';
import styles from './products.module.css';
import layoutStyles from '@/app/layout.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Produtos Recomendados | Color Freak',
    description: 'Confira nossa seleção de produtos recomendados para cabelos descoloridos e coloridos.',
};

type PageProps = {
    searchParams: Promise<{ categoria?: string; page?: string }>;
};

export default async function ProdutosPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const activeCategoryId = resolvedParams.categoria;

    const currentPage = Number(resolvedParams.page) || 1;
    const [productData, categoryData] = await Promise.all([
        getProducts(activeCategoryId, currentPage, 12), 
        getCategories(1, 100)
    ]);

    const products = productData.products;
    const totalPages = productData.totalPages;
    const categories = categoryData.categories;

    return (
        <main className={layoutStyles.contentContainer}>
            <div className={styles.container}>

                <TopBar />
                
                <h1 className={styles.title}>Nossos Produtos Favoritos</h1>

                <div className={styles.mainLayout}>
                    {/* COLUNA ESQUERDA: Grade de Produtos */}
                    <div className={styles.contentArea}>
                        <div className={styles.grid}>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {products.length === 0 && (
                            <p className={styles.emptyMessage}>
                                Nenhum produto encontrado para esta categoria.
                            </p>
                        )}

                        {/* Paginação */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            baseUrl={activeCategoryId ? `/products?categoria=${activeCategoryId}` : '/products'}
                        />
                    </div>

                    {/* COLUNA DIREITA: Nosso Componente Reutilizado! */}
                    <CategorySideBar 
                        categories={categories} 
                        activeCategoryId={activeCategoryId} 
                        baseUrl="/products"
                    />
                </div>
            </div>
        </main>
    );
}