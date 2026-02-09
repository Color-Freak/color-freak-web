export const runtime = 'nodejs';
import prisma from "../lib/prisma";

export default async function Home() {
  // 1. Buscando dados do banco (Server Side)
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      partner: true, // Traz os dados da Amazon/Shopee junto
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* Cabeçalho */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Cor Raiz 🌿</h1>
        <p className="text-gray-600">Dicas reais para cabelos reais.</p>
      </div>

      {/* Grid de Posts */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
            
            {/* Imagem do Post */}
            {post.imageUrl && (
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                {/* Badge do Parceiro (Se tiver) */}
                {post.partner && (
                  <span 
                    className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded text-white shadow-sm"
                    style={{ backgroundColor: post.partner.color || '#000' }}
                  >
                    {post.partner.name}
                  </span>
                )}
              </div>
            )}

            {/* Conteúdo */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {post.content}
              </p>
              
              <a href={`/blog/${post.slug}`} className="text-emerald-600 font-semibold hover:underline text-sm">
                Ler completo →
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}