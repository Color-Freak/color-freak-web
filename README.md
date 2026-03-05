# 🎨 Color Freak - Blog & Admin


O **Color Freak** é uma plataforma completa de conteúdo sobre colorimetria e cuidados capilares. O projeto consiste em um blog dinâmico voltado para o usuário final e um painel administrativo para a gestão de matérias, produtos recomendados e parcerias.

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT com Cookies HTTP-Only (Jose & Bcrypt)
- **Estilização:** CSS Modules
- **Conteúdo:** React Markdown

## 🛠️ Funcionalidades

### Área Pública

- **Home Dinâmica:** Listagem de matérias com paginação e filtros por categoria.
- **Busca Global:** Filtro de matérias por palavras-chave em tempo real.
- **Página de Produtos:** Vitrine de recomendações com filtros por categoria.
- **Leitura de Posts:** Renderização de conteúdo via Markdown com sugestão de produtos relacionados.
- **SEO Avançado:** Geração dinâmica de metadados, `sitemap.xml` e `robots.txt`.

### Painel Administrativo (CMS)

- **Autenticação Segura:** Sistema de login protegido por tokens JWT.
- **Gestão de Conteúdo (CRUD):** Criação, edição e exclusão de posts, categorias, produtos e parceiros.
- **Relacionamentos complexos:** Sistema de vinculação de múltiplos produtos e categorias a uma única matéria.

## 📦 Como rodar o projeto

1. **Clone o repositório:**
    
    `git clone https://github.com/sua-organizacao/color-freak.git`
    
2. **Instale as dependências:**
    
    `npm install`
    
3. **Configure as variáveis de ambiente:**
    
    Crie um arquivo `.env` na raiz do projeto seguindo o modelo:
    
    ```
    DATABASE_URL="sua_url_do_banco"
    JWT_SECRET="sua_chave_secreta"
    NEXT_PUBLIC_SITE_URL="http://localhost:3000"
    ```
    
4. **Rode as migrações do Prisma:**
    
    `npx prisma migrate dev`
    
5. **Inicie o servidor de desenvolvimento:**    

    `npm run dev`
    

## 👩‍💻 Autora

**Melissa Perdomo** – Desenvolvedora Full Stack.

Atualmente focada no ecossistema Node.js e TypeScript através da pós-graduação na FIAP.
