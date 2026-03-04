import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/services/productService';
import sharedStyles from '@/app/(blog)/admin/posts/posts.module.css';
import styles from './products.module.css';
import layoutStyles from '@/app/layout.module.css';
import DeleteProductButton from './DeleteProductButton';
import { EditIcon } from '@/components/Icons';

// COMO DEVE FICAR:
export default async function AdminProductsPage() {
    const { products } = await getProducts(undefined, 1, 100);

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={sharedStyles.container}>

                <div className={sharedStyles.header}>
                    <h1 className={sharedStyles.title}>Produtos</h1>
                    <Link href="/admin/products/new" className={sharedStyles.newButton}>
                        + Novo Produto
                    </Link>
                </div>

                <table className={sharedStyles.table}>
                    <thead>
                        <tr>
                            <th className={styles.columnImg}>Imagem</th>
                            <th>Produto</th>
                            <th>Descrição</th>
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
                                    {product.description && (
                                        <span className={`${sharedStyles.subText} ${styles.truncatedText}`}>
                                            {product.description}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <div className={styles.tagContainer}>
                                        {product.categories.map(cat => (
                                            <span key={cat.id} className={styles.tag}>
                                                #{cat.name}
                                            </span>
                                        ))}
                                    </div>
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
                                <td colSpan={4} className={styles.centerText}>Nenhum produto encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}