import Image from 'next/image'
import Link from 'next/link'
import { PostWithDetails } from '@/types'
import styles from './PostCard.module.css'

interface PostCardProps {
    post: PostWithDetails
}

export function PostCard({ post }: PostCardProps) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className={styles.card}>
            <Link href={`/blog/${post.slug}`} className={styles.imageWrapper}>
                {post.imageUrl ? (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className={styles.image} // Usando o CSS Module ao invés de string solta
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: '#eee' }} />
                )}
            </Link>

            <div className={styles.content}>
                <Link href={`/blog/${post.slug}`}>
                    <h3 className={styles.title}>{post.title}</h3>
                </Link>

                {/* Linha de Meta: "by Autor / Data" */}
                <Link href={`/blog/${post.slug}`}>
                    <div className={styles.meta}>
                        por <span className={styles.author}>{post.author?.name || 'Redação'}</span> / {formattedDate}
                    </div>
                </Link>

                {/* Resumo ou subtítulo */}
                <Link href={`/blog/${post.slug}`}>
                    <p className={styles.excerpt}>
                        {post.subtitle}
                    </p>
                </Link>

                {/* Botão Leia Mais */}
                <Link href={`/blog/${post.slug}`} className={styles.button}>
                    Ler mais
                </Link>
            </div>
        </div>
    )
}