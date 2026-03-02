'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Select from 'react-select' // 1. Importação do React Select adicionada
import { handleSavePost } from '@/actions/postActions'
import { Category, Product, Partner } from '@prisma/client'
import styles from './admin.module.css'
import layoutStyles from '@/app/layout.module.css'
import { BackButton } from '@/components/BackButton'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

// Definimos a Interface com os tipos reais
interface PostFormProps {
    categories: Category[];
    products: Product[];
    partners: Partner[];
}

export function PostForm({ categories, products, partners }: PostFormProps) {
    const [content, setContent] = useState('');

    // 2. Transformamos as listas do banco no formato { value, label } que o react-select exige
    const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
    const productOptions = products.map(prod => ({ value: prod.id, label: prod.name }));

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

                        {/* Categorias usando React Select */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Categorias</label>
                            <Select
                                isMulti
                                name="categoryIds"
                                options={categoryOptions}
                                placeholder="Selecione as categorias..."
                            />
                        </div>

                        {/* Produtos usando React Select */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Produtos Indicados</label>
                            <Select
                                isMulti
                                name="productIds"
                                options={productOptions}
                                placeholder="Selecione os produtos..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Conteúdo da Matéria</label>
                            <MDEditor value={content} onChange={(val) => setContent(val || '')} height={400} />
                            <input type="hidden" name="content" value={content} />
                        </div>

                        <div className={styles.formActions}>
                            <BackButton />

                            <button type="submit" className={styles.button}>
                                Publicar Matéria
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}