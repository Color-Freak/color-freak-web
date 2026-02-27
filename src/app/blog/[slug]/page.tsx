import { notFound } from 'next/navigation'
import Image from 'next/image'
// 1. Importe a função dos últimos posts e o componente Sidebar
import { getPostBySlug, getLatestPosts } from '@/services/postService'
import { SideBar } from '@/components/features/SideBar'

import layoutStyles from '@/app/layout.module.css'
import styles from './post.module.css'

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;

    // 2. Executa as duas buscas ao mesmo tempo no banco de dados
    const [post, latestPosts] = await Promise.all([
        getPostBySlug(resolvedParams.slug),
        getLatestPosts(5)
    ]);

    if (!post) {
        notFound()
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>

                <div className={styles.layout}>

                    {/* --- COLUNA ESQUERDA: A matéria inteira --- */}
                    <article className={styles.mainContent}>

                        <header className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <h2 className={styles.subtitle}>{post.subtitle}</h2>
                            <div className={styles.meta}>
                                por {post.author?.name || 'Redação'} <span>- {formattedDate}</span>
                            </div>
                        </header>

                        {post.imageUrl && (
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className={styles.image}
                                    priority
                                />
                            </div>
                        )}

                        <div className={styles.content}>
                            {post.content}
                        </div>

                    </article>

                    {/* --- COLUNA DIREITA: Posts + Produtos --- */}
                    <aside className={styles.rightColumn}>

                        {/* 3. Renderiza a Sidebar de matérias recentes no topo */}
                        <SideBar latestPosts={latestPosts} />

                        {/* 4. Bloco de Produtos logo abaixo */}
                        <div>
                            <h3 className={styles.sidebarTitle}>Produtos Indicados</h3>

                            {post.products && post.products.length > 0 ? (
                                <p>Tem {post.products.length} produto(s) para mostrar aqui!</p>
                            ) : (
                                <p style={{ fontSize: '0.9rem', color: 'var(--cor2)' }}>Nenhum produto indicado nesta matéria.</p>
                            )}
                        </div>

                    </aside>

                </div>

            </div>
        </div>
    )
}