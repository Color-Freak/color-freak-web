import { getPosts, getLatestPosts } from '@/services/postService'
import { PostCard } from '@/components/features/PostCard'
import { Pagination } from '@/components/features/Pagination'
import { SideBar } from '@/components/features/SideBar'
import { TopBar } from '@/components/features/TopBar';
import { PostWithDetails } from '@/types'
import { CategorySideBar } from '@/components/features/CategorySideBar';
import { getCategories } from '@/services/categoryService';

import styles from '@/app/page.module.css'
import layoutStyles from '@/app/layout.module.css'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; categoria?: string }>
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.q || '';
  const activeCategoryId = params.categoria;

  console.log("➡️ 1. A página pegou a categoria da URL:", activeCategoryId);

  // 3. Adicionamos a busca de categorias no nosso fluxo paralelo
  const [paginatedData, latestPosts, categoryData] = await Promise.all([
    getPosts(currentPage, 9, searchQuery, activeCategoryId),
    getLatestPosts(5),
    getCategories(1, 100) // Buscamos todas as categorias para a sidebar
  ]);

  const { posts, totalPages } = paginatedData;
  const categories = categoryData.categories; // <-- AQUI NASCE A 2ª VARIÁVEL QUE FALTAVA

  return (
    <main className={layoutStyles.contentContainer}>
      <div className={styles.container}>
        <TopBar showSearch={true} />

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

          <aside className={styles.rightColumn}>
            <SideBar latestPosts={latestPosts} />
            <CategorySideBar
              categories={categories}
              activeCategoryId={activeCategoryId}
              baseUrl="/"
            />
          </aside>

        </div>
      </div>
    </main>
  )
}