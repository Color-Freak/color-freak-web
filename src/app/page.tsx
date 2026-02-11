// import { PostCard } from '@/components/features/PostCard' // (Descomente quando for usar)
import layoutStyles from '@/app/layout.module.css' // Importando o container global

export default async function Home() {
  // const posts = await getPosts()

  return (
    <>
      {/* Conteúdo dentro do container (Ocupa 80% e centraliza) */}
      <div className={layoutStyles.contentContainer}>

        {/* Grid de posts (Futuro) */}
        {/* <div className={styles.grid}>
          {posts.map((post: any) => (
             // <PostCard key={post.id} post={post} />
             <p key={post.id}>{post.title}</p>
          ))}
        </div> */}

      </div>
    </>
  )
}