import { getPosts } from '@/services/postService'
import { PostCard } from '@/components/features/PostCard'
import { PostWithDetails } from '@/types'

import styles from './page.module.css'
import layoutStyles from '@/app/layout.module.css'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className={layoutStyles.contentContainer}>        

      <div className={styles.grid}>
        
        {posts.map((post: PostWithDetails) => (
          <PostCard key={post.id} post={post} />
        ))}
        
      </div>
      
    </div>
  )
}