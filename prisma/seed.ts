import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando o seed (populando o banco)...')

  // 1. Limpeza (Ordem importa por causa das chaves estrangeiras!)
  // Primeiro deletamos quem "depende", depois quem "é dependência"
  await prisma.product.deleteMany()
  await prisma.post.deleteMany()
  await prisma.category.deleteMany()
  await prisma.partner.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Banco limpo.')

  // 2. Criar Usuário (Autora)
  const user = await prisma.user.create({
    data: {
      email: 'melissa@corraiz.com.br',
      name: 'Melissa Perdomo',
      password: 'senha-super-secreta-hash', 
    },
  })

  // 3. Criar Parceiro (Lola)
  const lola = await prisma.partner.create({
    data: {
      name: 'Lola Cosmetics',
      slug: 'lola-cosmetics',
      logoUrl: 'https://seeklogo.com/images/L/lola-cosmetics-logo-A5832717CD-seeklogo.com.png',
      color: '#e91e63', // Um rosa choque característico da marca
      website: 'https://lolacosmetics.com.br',
    },
  })

  // 4. Criar 3 Categorias
  const catCronograma = await prisma.category.create({ data: { name: 'Cronograma Capilar' } })
  const catProdutos = await prisma.category.create({ data: { name: 'Resenhas de Produtos' } })
  const catDicas = await prisma.category.create({ data: { name: 'Dicas para Loiras' } })

  // 5. Criar 3 Produtos (Vinculados à Lola)
  const prodMorte = await prisma.product.create({
    data: {
      name: 'Morte Súbita Máscara',
      description: 'Máscara de hidratação profunda para cabelos sedentos de vida.',
      imageUrl: 'https://m.media-amazon.com/images/I/61M-bLgQ8dL._AC_SX679_.jpg',
      price: 'R$ 39,90',
      affiliateLink: 'https://amazon.com.br/exemplo-link-afiliado',
      partnerId: lola.id,
      // Conectar categorias ao produto
      categories: {
        connect: [{ id: catCronograma.id }, { id: catProdutos.id }]
      }
    }
  })

  const prodDanos = await prisma.product.create({
    data: {
      name: 'Danos Vorazes Booster',
      description: 'Booster de reparação imediata com Cannabinoid Active System.',
      imageUrl: 'https://m.media-amazon.com/images/I/51e3eW+1lUL._AC_SX679_.jpg',
      price: 'R$ 55,00',
      affiliateLink: 'https://amazon.com.br/exemplo-link-afiliado-danos',
      partnerId: lola.id,
      categories: {
        connect: [{ id: catProdutos.id }]
      }
    }
  })

  const prodOleo = await prisma.product.create({
    data: {
      name: 'Óleo de Argan e Pracaxi',
      description: 'Finalizador para pontas duplas e frizz.',
      imageUrl: 'https://m.media-amazon.com/images/I/51+Zq1yFuyL._AC_SX679_.jpg',
      price: 'R$ 22,90',
      affiliateLink: 'https://amazon.com.br/exemplo-link-afiliado-oleo',
      partnerId: lola.id,
      categories: {
        connect: [{ id: catDicas.id }]
      }
    }
  })

  // 6. Criar 3 Posts (Conteúdo Rico)
  
  // Post 1: Focado em produto
  await prisma.post.create({
    data: {
      title: 'Resenha: Morte Súbita vale a pena?',
      subtitle: 'Testei a máscara mais famosa da internet e te conto tudo.',
      slug: 'resenha-morte-subita-lola',
      content: 'Aqui vai o texto completo em Markdown... # Título ## Subtitulo',
      imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop',
      published: true,
      authorId: user.id,
      partnerId: lola.id, // Post patrocinado ou sobre a marca
      categories: {
        connect: [{ id: catProdutos.id }]
      },
      products: {
        connect: [{ id: prodMorte.id }] // Linka o produto mencionado
      }
    }
  })

  // Post 2: Focado em Dica/Cronograma
  await prisma.post.create({
    data: {
      title: 'Como salvar o cabelo pós-descoloração',
      subtitle: 'O guia definitivo para recuperar a elasticidade.',
      slug: 'recuperar-cabelo-pos-descoloracao',
      content: 'Conteúdo sobre reconstrução ácida...',
      imageUrl: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?q=80&w=1000&auto=format&fit=crop',
      published: true,
      authorId: user.id,
      // Não tem partnerId obrigatório
      categories: {
        connect: [{ id: catCronograma.id }, { id: catDicas.id }]
      },
      products: {
        connect: [{ id: prodDanos.id }] // Recomenda o Danos Vorazes
      }
    }
  })

  // Post 3: Dica rápida (Draft/Rascunho)
  await prisma.post.create({
    data: {
      title: '5 erros ao usar óleo capilar',
      subtitle: 'Você pode estar fritando seu cabelo sem saber.',
      slug: 'erros-oleo-capilar',
      content: 'Texto em construção...',
      imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop',
      published: false, // Rascunho, não deve aparecer na Home
      authorId: user.id,
      categories: {
        connect: [{ id: catDicas.id }]
      },
      products: {
        connect: [{ id: prodOleo.id }]
      }
    }
  })

  console.log('✅ Seed finalizado com sucesso! Dados criados.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })