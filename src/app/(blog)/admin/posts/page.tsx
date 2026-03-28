import Link from 'next/link';
import { getAdminPosts } from '@/services/postService';
import styles from './posts.module.css';
import layoutStyles from '@/app/layout.module.css';
import DeleteButton from './DeleteButton';
import { EditIcon } from '@/components/Icons';
import { Pagination } from '@/components/features/Pagination';
import { TagList } from '@/components/features/TagList';
import { PageProps } from '@/types';
import { AdminFilterBar } from '@/components/features/AdminFilterBar';
import { getCategories } from '@/services/categoryService';

export default async function AdminPostsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams.page) || 1;

    // 1. Lemos os parâmetros de busca e categoria da URL
    const searchQuery = resolvedParams.search ? String(resolvedParams.search) : undefined;
    const categoryId = resolvedParams.category ? String(resolvedParams.category) : undefined;

    // 2. Passamos os filtros para a função
    const { posts, totalPages } = await getAdminPosts(currentPage, 10, searchQuery, categoryId);

    // 3. Buscamos a lista de categorias para popular o <select>
    const { categories } = await getCategories(1, 100);

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h1 className={styles.title}>Matérias Publicadas</h1>
                    <Link href="/admin/posts/new" className={layoutStyles.primaryButton}>
                        + Nova Matéria
                    </Link>
                </div>

                <AdminFilterBar
                    categories={categories}
                    placeholder="Buscar por nome ou atalho do produto..."
                />

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Categorias</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</td>
                                <td>{post.published ? 'Publicado' : 'Rascunho'}</td>

                                <td>
                                    <TagList categories={post.categories} />
                                </td>

                                <td>
                                    <div className={styles.actions}>
                                        <Link href={`/admin/posts/${post.id}/edit`} className={styles.editBtn}>
                                            <EditIcon />
                                        </Link>
                                        <DeleteButton id={post.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>Nenhuma matéria encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/admin/posts"
                />

            </div>
        </div>
    );
}