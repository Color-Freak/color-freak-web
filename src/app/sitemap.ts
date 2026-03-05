import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true }
    })
  
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

      const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticRoutes, ...postRoutes]
}