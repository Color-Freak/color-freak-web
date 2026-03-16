import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link' // 1. Adicionado para o CTA
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getLatestPosts } from '@/services/postService'
import { SideBar } from '@/components/features/SideBar'
import { ProductCard } from '@/components/features/ProductCard'
import { TopBar } from '@/components/features/TopBar'

import layoutStyles from '@/app/layout.module.css'
import styles from './post.module.css'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post não encontrado | Color Freak',
        }
    }

    return {
        title: `${post.title} | Color Freak`,
        description: post.subtitle,
        openGraph: {
            title: post.title,
            description: post.subtitle,
            images: post.imageUrl ? [post.imageUrl] : [],
            type: 'article',
        },
    }
}

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

                <TopBar />

                <div className={styles.layout}>

                    <article className={styles.mainContent}>

                        <header className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <h2 className={styles.subtitle}>{post.subtitle}</h2>
                            <div className={styles.meta}>
                                {formattedDate} por <span>{post.author?.name || 'Redação'}</span>
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
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* 2. Bloco de Destaque / CTA adicionado aqui */}
                        <aside className={styles.ctaDestaque}>
                            <p>
                                <strong>Aproveite o menor preço!</strong> <br />Compre pelos cards de produtos ao longo desta matéria ou visite nossa página de{' '}
                                <Link href="/products" className={styles.linkDestaque}>
                                    Produtos Favoritos
                                </Link>
                                , onde reuni todos os itens que realmente funcionam para a saúde do nosso cabelo.
                            </p>
                        </aside>

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