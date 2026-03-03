import Link from 'next/link';
import { getCategories } from '@/services/categoryService';
import styles from '../posts/posts.module.css'; // Reutilizando a inteligência visual
import layoutStyles from '@/app/layout.module.css';
import DeleteCategoryButton from './DeleteCategoryButton';
import { EditIcon } from '@/components/Icons';

export default async function AdminCategoriesPage() {
    // Busca as categorias do banco
    const categories = await getCategories();

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h1 className={styles.title}>Categorias</h1>
                    <Link href="/admin/categories/new" className={styles.newButton}>
                        + Nova Categoria
                    </Link>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome da Categoria</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>
                                    <span className={styles.mainText}>{category.name}</span>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        <Link 
                                            href={`/admin/categories/${category.id}/edit`} 
                                            className={styles.editBtn}
                                            title="Editar"
                                        >
                                            <EditIcon />
                                        </Link>
                                        <DeleteCategoryButton id={category.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={2} style={{ textAlign: 'center' }}>
                                    Nenhuma categoria encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
}