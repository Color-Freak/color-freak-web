import Link from 'next/link'
import styles from './Sidebar.module.css'
import { Post } from '@prisma/client'

interface SidebarProps {
  latestPosts: Post[] 
}

export function Sidebar({ latestPosts }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Últimas Postagens</h3>
      
      <ul className={styles.list}>
        {latestPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}