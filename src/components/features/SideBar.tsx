import Link from 'next/link'
import styles from './SideBar.module.css'
import { Post } from '@prisma/client'

interface SideBarProps {
  latestPosts: Post[] 
}

export function SideBar({ latestPosts }: SideBarProps) {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Últimas Matérias</h3>
      
      <ul className={styles.list}>
        {latestPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}