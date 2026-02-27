// 1. Importe a nova função getLatestPosts
import { getPosts, getLatestPosts } from '@/services/postService'
import { PostCard } from '@/components/features/PostCard'
import { Pagination } from '@/components/features/Pagination'
import { Sidebar } from '@/components/features/Sidebar'
import { PostWithDetails } from '@/types'

import styles from './page.module.css'
import layoutStyles from '@/app/layout.module.css'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // 2. Executa as duas procuras ao mesmo tempo
  const [paginatedData, latestPosts] = await Promise.all([
    getPosts(currentPage, 9), // Busca os posts da página atual
    getLatestPosts(6)         // Busca os 5 mais recentes de sempre
  ]);

  const { posts, totalPages } = paginatedData;

  return (
    <div className={layoutStyles.contentContainer}>

      <div className={styles.mainLayout}>
        
        <div className={styles.contentArea}>
          <div className={styles.grid}>
            {posts.map((post: PostWithDetails) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>

        {/* 3. Passa a lista correta e independente para a Sidebar */}
        <Sidebar latestPosts={latestPosts} />

      </div>
      
    </div>
  )
}