import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/services/productService';
import sharedStyles from '@/app/(blog)/admin/posts/posts.module.css';
import styles from './products.module.css';
import layoutStyles from '@/app/layout.module.css';
import DeleteProductButton from './DeleteProductButton';
import { EditIcon } from '@/components/Icons';
import { TagList } from '@/components/features/TagList';
import { Pagination } from '@/components/features/Pagination';
import { PageProps } from '@/types';
import { AdminFilterBar } from '@/components/features/AdminFilterBar';
import { getCategories } from '@/services/categoryService';

function getAffiliateBadge(link: string) {
    if (!link) return null;
    const lowerLink = link.toLowerCase();

    if (lowerLink.includes('shopee') || lowerLink.includes('shp.ee')) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" className={`${styles.badge} ${styles.badgeShopee}`} title="Ver preço">
                Shopee
            </a>
        );
    }

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={`${styles.badge} ${styles.badgeAmazon}`} title="Ver preço">
            Amazon
        </a>
    );
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
    // 1. Lemos a URL que a nossa barra de filtros acabou de atualizar
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams.page) || 1;

    // 2. Extraímos a busca e a categoria. Se estiverem vazias, passamos undefined para o banco ignorar
    const searchQuery = resolvedParams.search ? String(resolvedParams.search) : undefined;
    const categoryId = resolvedParams.category ? String(resolvedParams.category) : undefined;

    // 3. Agora sim! Passamos as variáveis capturadas para a função na ordem exata
    const { products, totalPages } = await getProducts(searchQuery, currentPage, 10, categoryId);

    // 4. Buscamos a lista de categorias para popular o <select>
    const { categories } = await getCategories(1, 100);

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={sharedStyles.container}>

                <div className={sharedStyles.header}>
                    <h1 className={sharedStyles.title}>Produtos</h1>

                    <Link href="/admin/products/new" className={layoutStyles.primaryButton}>
                        + Novo Produto
                    </Link>
                </div>

                <AdminFilterBar
                    categories={categories}
                    placeholder="Buscar por nome ou atalho do produto..."
                />

                <table className={sharedStyles.table}>
                    <thead>
                        <tr>
                            <th className={styles.columnImg}>Imagem</th>
                            <th>Produto</th>
                            <th>Afiliado</th>
                            <th>Atalho Markdown</th>
                            <th className={styles.columnCategories}>Categorias</th>
                            <th className={styles.columnActions}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    {product.imageUrl ? (
                                        <div className={styles.thumbnailWrapper}>
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                fill
                                                className={styles.thumbnailImage}
                                            />
                                        </div>
                                    ) : (
                                        <div className={styles.thumbnailWrapper} />
                                    )}
                                </td>
                                <td>
                                    <span className={sharedStyles.mainText}>{product.name}</span>
                                </td>
                                <td>
                                    {getAffiliateBadge(product.affiliateLink)}
                                </td>
                                <td>
                                    <code style={{ userSelect: 'all', fontSize: '0.85rem', color: '#555' }}>
                                        {`[${product.name}](#produto:${product.id})`}
                                    </code>
                                </td>
                                <td>
                                    <TagList categories={product.categories} />
                                </td>
                                <td>
                                    <div className={sharedStyles.actions}>
                                        <Link href={`/admin/products/${product.id}/edit`} className={sharedStyles.editBtn} title="Editar">
                                            <EditIcon />
                                        </Link>
                                        <DeleteProductButton id={product.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} className={styles.centerText}>Nenhum produto encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/admin/products"
                />

            </div>
        </div>
    );
}