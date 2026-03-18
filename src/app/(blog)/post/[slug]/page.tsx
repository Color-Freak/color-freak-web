import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getLatestPosts } from '@/services/postService'
import { SideBar } from '@/components/features/SideBar'
import { ProductCard } from '@/components/features/ProductCard'
import { TopBar } from '@/components/features/TopBar'
import { TagList } from '@/components/features/TagList'
import { CallToAction } from '@/components/features/CallToAction'
import { SocialSideBar } from '@/components/features/SocialSideBar'
import { InlineProductFetcher } from '@/components/features/InlineProductFetcher'

import layoutStyles from '@/app/layout.module.css'
import styles from './post.module.css'

export const revalidate = 3600;

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
                            <TagList categories={post.categories} />
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
                            <ReactMarkdown
                                components={{
                                    // 1. Interceptamos o Parágrafo (<p>)
                                    p: (props) => {
                                        const { node, children } = props;

                                        // Criamos uma tipagem local limpa para os nós da árvore do Markdown
                                        type MarkdownNode = {
                                            tagName?: string;
                                            properties?: {
                                                href?: string;
                                            };
                                        };

                                        // Forçamos o TypeScript a entender o formato dos filhos sem usar 'any'
                                        const childrenNodes = node?.children as MarkdownNode[] | undefined;

                                        // Verifica se algum filho deste parágrafo é o nosso link de produto
                                        const hasProduct = childrenNodes?.some(
                                            (child) => child.tagName === 'a' && child.properties?.href?.startsWith('#produto:')
                                        );

                                        if (hasProduct) {
                                            // Se tem produto, renderiza uma <div> para manter o HTML válido
                                            return <div>{children}</div>;
                                        }

                                        // Se for texto normal, renderiza o <p> padrão
                                        return <p>{children}</p>;
                                    },

                                    // 2. Interceptamos o Link (<a>)
                                    a: (props) => {
                                        const href = props.href || '';

                                        if (href.startsWith('#produto:')) {
                                            // Limpa o prefixo e extrai apenas o ID do banco
                                            const productId = href.replace('#produto:', '');
                                            return <InlineProductFetcher id={productId} />;
                                        }

                                        // Links normais do blog continuam funcionando normalmente
                                        return (
                                            <a href={href} target="_blank" rel="noopener noreferrer">
                                                {props.children}
                                            </a>
                                        );
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        <CallToAction />

                    </article>

                    <aside className={styles.rightColumn}>
                        <div>
                            <div className={styles.productList}>
                                {post.products?.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                        <SideBar latestPosts={latestPosts} />
                        <SocialSideBar />
                    </aside>

                </div>
            </div>
        </div>
    )
}