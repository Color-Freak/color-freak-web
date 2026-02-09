import { getPosts } from '../services/postService'
import { PostWithDetails } from '../types'
import { Category } from '@prisma/client'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-neutral-50 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-neutral-800">Blog Capilar</h1>
        <p className="text-neutral-600 mt-2">Dicas, resenhas e cronogramas.</p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {posts.map((post: PostWithDetails) => (
          <article 
            key={post.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-neutral-100 flex flex-col group"
          >
            <div className="p-6 flex flex-col flex-1">
              <div className="flex gap-2 mb-3">
                {post.categories.map((cat: Category) => (
                   <span key={cat.id} className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                     {cat.name}
                   </span>
                ))}
              </div>

              <h2 className="text-xl font-bold text-neutral-800 mb-2">
                {post.title}
              </h2>
              
              <p className="text-neutral-600 text-sm line-clamp-3 mb-4 flex-1">
                {post.subtitle || 'Leia mais sobre este assunto...'}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-50">
                {post.partner ? (
                   <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span>Parceria:</span>
                      <span className="font-bold" style={{ color: post.partner.color || '#000' }}>
                        {post.partner.name}
                      </span>
                   </div>
                ) : (
                  <span className="text-xs text-neutral-400">Post Autoral</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}