import { getPosts } from '@/services/postService'
import { PostCard } from '@/components/features/PostCard'
import { Pagination } from '@/components/features/Pagination'
import { PostWithDetails } from '@/types'

import styles from './page.module.css'
import layoutStyles from '@/app/layout.module.css'

// Ajuste na tipagem do searchParams
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> // <-- searchParams agora é uma Promise
}) {
  // Espera os parâmetros carregarem antes de extrair a página
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { posts, totalPages } = await getPosts(currentPage, 9);

  return (
    <div className={layoutStyles.contentContainer}>

      <div className={styles.grid}>
        {posts.map((post: PostWithDetails) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
      
    </div>
  )
}