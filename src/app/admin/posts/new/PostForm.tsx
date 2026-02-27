'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { handleSavePost } from '@/actions/postActions'
// 1. Importamos os tipos oficiais do seu banco de dados
import { Category, Product, Partner } from '@prisma/client' 
import styles from './admin.module.css'
import layoutStyles from '@/app/layout.module.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

// 2. Definimos a Interface com os tipos reais
interface PostFormProps {
    categories: Category[];
    products: Product[];
    partners: Partner[];
}

export function PostForm({ categories, products, partners }: PostFormProps) {
    const [content, setContent] = useState('');

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>Nova Matéria</h1>

                <div data-color-mode="light">
                    <form action={handleSavePost} className={styles.form}>
                        {/* Título, Subtítulo, Slug e Imagem (Caminho padrão) */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="title" className={styles.label}>Título</label>
                            <input type="text" id="title" name="title" className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="subtitle" className={styles.label}>Subtítulo</label>
                            <input type="text" id="subtitle" name="subtitle" className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="slug" className={styles.label}>URL da Matéria (Slug)</label>
                            <input type="text" id="slug" name="slug" placeholder="ex: resenha-morte-subita" className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="imageUrl" className={styles.label}>Link da Imagem de Capa</label>
                            <input type="url" id="imageUrl" name="imageUrl" className={styles.input} />
                        </div>

                        {/* Parceiro */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="partnerId" className={styles.label}>Parceiro / Patrocinador</label>
                            <select id="partnerId" name="partnerId" className={styles.input}>
                                <option value="">Nenhum</option>
                                {partners.map((partner) => (
                                    <option key={partner.id} value={partner.id}>
                                        {partner.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Categorias */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Categorias</label>
                            <div className={styles.checkboxGrid}>
                                {categories.map((cat) => (
                                    <label key={cat.id} className={styles.checkboxItem}>
                                        <input type="checkbox" name="categoryIds" value={cat.id} />
                                        {cat.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Produtos */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Produtos Indicados</label>
                            <div className={styles.checkboxGrid}>
                                {products.map((prod) => (
                                    <label key={prod.id} className={styles.checkboxItem}>
                                        <input type="checkbox" name="productIds" value={prod.id} />
                                        {prod.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Conteúdo da Matéria</label>
                            <MDEditor value={content} onChange={(val) => setContent(val || '')} height={400} />
                            <input type="hidden" name="content" value={content} />
                        </div>

                        <button type="submit" className={styles.button}>Publicar Matéria</button>
                    </form>
                </div>
            </div>
        </div>
    )
}