import { getPosts, getLatestPosts } from '@/services/postService'
import { PostCard } from '@/components/features/PostCard'
import { Pagination } from '@/components/features/Pagination'
import { SideBar } from '@/components/features/SideBar'
import { SearchBar } from '@/components/features/SearchBar' // <-- Importe a barra
import { PostWithDetails } from '@/types'

import styles from '@/app/page.module.css'
import layoutStyles from '@/app/layout.module.css'

export default async function Home({
  searchParams,
}: {
  // Adicionamos a tipagem do 'q' na Promise
  searchParams: Promise<{ page?: string; q?: string }>
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.q || ''; // Captura a busca da URL

  // Passamos o searchQuery como 3º argumento
  const [paginatedData, latestPosts] = await Promise.all([
    getPosts(currentPage, 9, searchQuery), 
    getLatestPosts(5)
  ]);

  const { posts, totalPages } = paginatedData;

  return (
    <div className={layoutStyles.contentContainer}>
      
      {/* Título e subtítulo removidos. A SearchBar entra direto aqui no topo */}
      <SearchBar />

      <div className={styles.mainLayout}>
        
        <div className={styles.contentArea}>
          {/* Se a busca não retornar nada, damos um feedback ao usuário */}
          {posts.length === 0 ? (
            <p style={{ color: 'var(--cor2)' }}>Nenhuma matéria encontrada para &quot;{searchQuery}&quot;.</p>
          ) : (
            <div className={styles.grid}>
              {posts.map((post: PostWithDetails) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>

        <SideBar latestPosts={latestPosts} />

      </div>
      
    </div>
  )
}