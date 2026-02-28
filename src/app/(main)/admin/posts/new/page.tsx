import { getAllCategories, getAllProducts, getAllPartners } from '@/services/postService'
import { PostForm } from './PostForm'

export default async function NewPostPage() {
  const [categories, products, partners] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getAllPartners()
  ]);

  return <PostForm categories={categories} products={products} partners={partners} />
}