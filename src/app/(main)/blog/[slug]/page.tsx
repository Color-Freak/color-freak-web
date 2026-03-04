import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown' // 1. Importe a biblioteca
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

                        {/* 2. Envolva o conteúdo com o ReactMarkdown */}
                        <div className={styles.content}>
                            <ReactMarkdown>
                                {`Aqui vai o texto introdutório.

# Este é um Título Real
## E aqui um subtítulo

Agora sim o Markdown consegue entender, porque demos um "Enter" antes das hashtags.`}
                            </ReactMarkdown>
                        </div>

                    </article>

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