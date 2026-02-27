import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPostBySlug, getLatestPosts } from '@/services/postService'
import { SideBar } from '@/components/features/SideBar'
import { ProductCard } from '@/components/features/ProductCard'

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

                        <SideBar latestPosts={latestPosts} />

                        <div>
                            <div className={styles.productList}>
                                {post.products?.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>

                    </aside>

                </div>

            </div>
        </div>
    )
}