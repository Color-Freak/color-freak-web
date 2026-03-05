import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',          // Bloqueia o painel administrativo
                '/api/',            // Bloqueia rotas de API internas
                '/_next/',          // Bloqueia arquivos internos do Next.js
            ],
        },
        // Substitua pelo seu domínio real quando fizer o deploy
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}