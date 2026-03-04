import { getProducts } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import { ProductCard } from '@/components/features/ProductCard';
import { Pagination } from '@/components/features/Pagination';
import { TopBar } from '@/components/features/TopBar';
import Link from 'next/link';
import styles from './products.module.css';
import layoutStyles from '@/app/layout.module.css';

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

                    {/* COLUNA DIREITA: Sidebar de Categorias */}
                    <aside className={styles.sidebar}>
                        <h2 className={styles.sidebarTitle}>Filtrar por Categoria</h2>
                        <ul className={styles.categoryList}>
                            <li>
                                <Link
                                    href="/products"
                                    className={!activeCategoryId ? styles.categoryLinkActive : styles.categoryLink}
                                >
                                    Todos os Produtos
                                </Link>
                            </li>

                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/products?categoria=${category.id}`}
                                        className={activeCategoryId === category.id ? styles.categoryLinkActive : styles.categoryLink}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </main>
    );
}