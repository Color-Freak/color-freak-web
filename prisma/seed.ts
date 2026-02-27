import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando o seed (populando o banco)...')

  // 1. Limpeza
  await prisma.product.deleteMany()
  await prisma.post.deleteMany()
  await prisma.category.deleteMany()
  await prisma.partner.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Banco limpo.')

  // 2. Criar Usuário
  const user = await prisma.user.create({
    data: {
      email: 'melissa@colorfreak.com.br',
      name: 'Melissa Perdomo',
      password: 'senha-super-secreta-hash',
    },
  })

  // 3. Criar Parceiro
  const lola = await prisma.partner.create({
    data: {
      name: 'Lola Cosmetics',
      slug: 'lola-cosmetics',
      logoUrl: 'https://lolacosmetics.admin.core.dcg.com.br/Custom/Content/Themes/Lola/Imagens/novo-logo-lola.png',
      color: '#e91e63',
      website: 'https://lolacosmetics.com.br',
    },
  })

  // 4. Criar Categorias
  const catCronograma = await prisma.category.create({ data: { name: 'Cronograma Capilar' } })
  const catProdutos = await prisma.category.create({ data: { name: 'Resenhas de Produtos' } })
  const catDicas = await prisma.category.create({ data: { name: 'Dicas para Loiras' } })

  // 5. Criar Produtos
  const prodMorte = await prisma.product.create({
    data: {
      name: 'Morte Súbita Máscara',
      description: 'Máscara de hidratação profunda para cabelos sedentos de vida.',
      imageUrl: 'https://d2l4mdyojly1ma.cloudfront.net/Custom/Content/Products/45/69/45694_morte-subita-mascara-450g-ps-19629-23_z8_638791867917059124.webp',
      price: 'R$ 39,90',
      affiliateLink: 'https://www.lolacosmetics.com.br/morte-subita-mascara-450g-ps-19629-23-p45694',
      partnerId: lola.id,
      categories: { connect: [{ id: catCronograma.id }, { id: catProdutos.id }] }
    }
  })

  const prodDanos = await prisma.product.create({
    data: {
      name: 'Danos Vorazes Booster',
      description: 'Booster de reparação imediata com Cannabinoid Active System.',
      imageUrl: 'https://m.media-amazon.com/images/I/71n8RVxgL+L._AC_SL1500_.jpg',
      price: 'R$ 55,00',
      affiliateLink: 'https://www.amazon.com.br/Danos-Vorazes-Booster-Lola-Cosmetics/dp/B08PPG53MC/ref=asc_df_B08PPG53MC?mcid=0f6dfbd7fa9633669a3e009811aa171b&tag=googleshopp00-20&linkCode=df0&hvadid=709963977542&hvpos=&hvnetw=g&hvrand=8454024721854781167&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100482&hvtargid=pla-1437214259508&psc=1&language=pt_BR&gad_source=1',
      partnerId: lola.id,
      categories: { connect: [{ id: catProdutos.id }] }
    }
  })

  const prodOleo = await prisma.product.create({
    data: {
      name: 'Óleo de Argan e Pracaxi',
      description: 'Finalizador para pontas duplas e frizz.',
      imageUrl: 'https://m.media-amazon.com/images/I/51tWM3YzpAL._AC_SL1500_.jpg',
      price: 'R$ 22,90',
      affiliateLink: 'https://www.amazon.com.br/Oleo-Finalizador-Lola-Cosmetics/dp/B07RFJ75MJ/ref=asc_df_B07RFJ75MJ?mcid=0ced0f95acdb3ded82ecb1818caa8d2a&tag=googleshopp00-20&linkCode=df0&hvadid=709963977506&hvpos=&hvnetw=g&hvrand=16598233803204864771&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100482&hvtargid=pla-1097018349552&psc=1&language=pt_BR&gad_source=1',
      partnerId: lola.id,
      categories: { connect: [{ id: catDicas.id }] }
    }
  })

  // 7. Gerar 10 posts dinâmicos para testar paginação (Todos True)
  console.log('🔄 Gerando posts adicionais para paginação...')

  for (let i = 1; i <= 10; i++) {
    await prisma.post.create({
      data: {
        title: `Teste de Paginação - Post Fictício ${i}`,
        subtitle: `Este é o post número ${i} gerado automaticamente para preencher o grid do site.`,
        slug: `post-ficticio-paginacao-${i}`,
        content: `Conteúdo de teste para a paginação. Post número ${i}.`,
        imageUrl: `https://img.freepik.com/fotos-gratis/woman-using-hair-product-side-view_23-2149659594.jpg`,
        published: true,
        authorId: user.id,
        categories: { connect: [{ id: catCronograma.id }] }
      }
    })
  }

  // Post 1 (True)
  await prisma.post.create({
    data: {
      title: 'Resenha: Morte Súbita vale a pena?',
      subtitle: 'Testei a máscara mais famosa da internet e te conto tudo.',
      slug: 'resenha-morte-subita-lola',
      content: 'Aqui vai o texto completo em Markdown... # Título ## Subtitulo',
      imageUrl: 'https://scontent-gru1-2.cdninstagram.com/v/t51.82787-15/627941724_18093340798965708_7541734339721138790_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=108&ig_cache_key=MzgyOTY2MzMzODE5NzA0MzQ0OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTU2Ni5oZHIuQzMifQ%3D%3D&_nc_ohc=iZe00gJCmrsQ7kNvwGNk-O9&_nc_oc=AdluFMhC6qayC1ix9-fcBpYWvxw-heFM9KjMxmxva-TLGrP0SoUrAABasTfHqPKAdv0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_gid=ja8jafDwOMrATyXcEYx0xA&oh=00_AfuLk0jWMmrI_CHukS2RQ5kwu3-TSfNkKDzK2GvMkvlWGg&oe=69A76114',
      published: true,
      authorId: user.id,
      partnerId: lola.id,
      categories: { connect: [{ id: catProdutos.id }] },
      products: { connect: [{ id: prodMorte.id }] }
    }
  })

  // Post 2 (True)
  await prisma.post.create({
    data: {
      title: 'Como salvar o cabelo pós-descoloração',
      subtitle: 'Você já ouviu falar em capilaridade? Entenda como fazer o protocolo pós química em casa e recupere a saúde do fio.',
      slug: 'recuperar-cabelo-pos-descoloracao',
      content: 'Conteúdo sobre reconstrução ácida...',
      imageUrl: 'https://img.freepik.com/fotos-gratis/beautiful-blond-girl-in-dress-playing-with-hair-and-smiling-looking-thoughtful-standing-on-white-copy-space_176420-41096.jpg',
      published: true,
      authorId: user.id,
      categories: { connect: [{ id: catCronograma.id }, { id: catDicas.id }] },
      products: { connect: [{ id: prodDanos.id }] }
    }
  })

  // Post 3 (False - Rascunho)
  await prisma.post.create({
    data: {
      title: '5 erros ao usar óleo capilar',
      subtitle: 'Você pode estar fritando seu cabelo sem saber.',
      slug: 'erros-oleo-capilar',
      content: 'Texto em construção...',
      imageUrl: 'https://img.freepik.com/fotos-gratis/woman-using-hair-product-side-view_23-2149659594.jpg',
      published: false,
      authorId: user.id,
      categories: { connect: [{ id: catDicas.id }] },
      products: { connect: [{ id: prodOleo.id }] }
    }
  })

  console.log('✅ Seed finalizado com sucesso! Total de 13 posts criados (12 publicados, 1 rascunho).')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })