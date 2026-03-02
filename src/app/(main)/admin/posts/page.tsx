import Link from 'next/link';
import { getAdminPosts } from '@/services/postService';
import styles from './posts.module.css';
import layoutStyles from '@/app/layout.module.css';
import DeleteButton from './DeleteButton';
import { EditIcon } from '@/components/Icons';

export default async function AdminPostsPage() {
    const posts = await getAdminPosts();

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h1 className={styles.title}>Matérias Publicadas</h1>
                    <Link href="/admin/posts/new" className={styles.newButton}>
                        + Nova Matéria
                    </Link>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Data</th>
                            <th>Status</th>
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
                                    <div className={styles.actions}>
                                        <Link href={`/admin/posts/${post.id}/edit`} className={styles.editBtn}>
                                            <EditIcon /> {/* 2. Coloque o ícone ao lado do texto */}
                                        </Link>
                                        <DeleteButton id={post.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center' }}>Nenhuma matéria encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
}