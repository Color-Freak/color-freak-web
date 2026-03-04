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
            <Link href={`/post/${post.slug}`} className={styles.imageWrapper}>
                {post.imageUrl ? (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className={styles.image}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: '#eee' }} />
                )}
            </Link>

            <div className={styles.content}>

                <div className={styles.textGroup}>
                    {post.categories && post.categories.length > 0 && (
                        <div className={styles.categories}>
                            {post.categories.map((category) => (
                                <span key={category.id} className={styles.categoryTag}>
                                    #{category.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <Link href={`/post/${post.slug}`}>
                        <h3 className={styles.title}>{post.title}</h3>
                    </Link>

                    <Link href={`/post/${post.slug}`}>
                        <p className={styles.subtitle}>
                            {post.subtitle}
                        </p>
                    </Link>

                    <Link href={`/post/${post.slug}`}>
                        <div className={styles.meta}>
                            {formattedDate}
                        </div>
                    </Link>
                </div>

                <Link href={`/post/${post.slug}`} className={styles.button}>
                    Ler mais
                </Link>

            </div>
        </div>
    )
}