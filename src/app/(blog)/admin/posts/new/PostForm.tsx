'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Select from 'react-select'
import { handleSavePost } from '@/actions/postActions'
import { Category, Product, Partner, Post } from '@prisma/client'
import styles from '@/app/(blog)/admin/form.module.css'
import layoutStyles from '@/app/layout.module.css'
import { BackButton } from '@/components/BackButton'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface PostFormProps {
    categories: Category[];
    products: Product[];
    partners: Partner[];
    post?: Post & {
        categories?: Category[];
        products?: Product[];
    };
}

export function PostForm({ categories, products, partners, post }: PostFormProps) {
    const [content, setContent] = useState(post?.content || '');
    const isEditing = !!post;

    const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
    const productOptions = products.map(prod => ({ value: prod.id, label: prod.name }));

    const defaultCategories = post?.categories?.map(cat => ({ value: cat.id, label: cat.name })) || [];
    const defaultProducts = post?.products?.map(prod => ({ value: prod.id, label: prod.name })) || [];

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>{isEditing ? 'Editar Matéria' : 'Nova Matéria'}</h1>

                <div data-color-mode="light">
                    <form action={handleSavePost} className={styles.form}>
                        {isEditing && <input type="hidden" name="postId" value={post?.id} />}

                        <div className={styles.inputGroup}>
                            <label htmlFor="title" className={styles.label}>Título *</label>
                            <input type="text" id="title" name="title" defaultValue={post?.title || ''} className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="subtitle" className={styles.label}>Subtítulo</label>
                            <input type="text" id="subtitle" name="subtitle" defaultValue={post?.subtitle || ''} className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="slug" className={styles.label}>URL da Matéria (Slug) *</label>
                            <input type="text" id="slug" name="slug" defaultValue={post?.slug || ''} className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="imageUrl" className={styles.label}>Link da Imagem de Capa</label>
                            <input type="url" id="imageUrl" name="imageUrl" defaultValue={post?.imageUrl || ''} className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="partnerId" className={styles.label}>Parceiro / Patrocinador</label>
                            <select id="partnerId" name="partnerId" defaultValue={post?.partnerId || ''} className={styles.input}>
                                <option value="">Nenhum</option>
                                {partners.map((partner) => (
                                    <option key={partner.id} value={partner.id}>{partner.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Categorias *</label>
                            <Select instanceId="post-categories-select" isMulti name="categoryIds" options={categoryOptions} defaultValue={defaultCategories} placeholder="Selecione as categorias..." />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Produtos Indicados *</label>
                            <Select instanceId="products-categories-select" isMulti name="productIds" options={productOptions} defaultValue={defaultProducts} placeholder="Selecione os produtos..." />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Conteúdo da Matéria *</label>
                            <MDEditor value={content} onChange={(val) => setContent(val || '')} height={400} />
                            <input type="hidden" name="content" value={content} />
                        </div>

                        <div className={styles.formActions}>
                            <BackButton />

                            {/* Agrupamos os botões na direita com um gap */}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    type="submit"
                                    name="actionType"
                                    value="draft"
                                    className={styles.button}
                                    style={{ backgroundColor: 'transparent', color: 'var(--cor4)', border: '1px solid var(--cor4)' }}
                                >
                                    {isEditing ? 'Atualizar Rascunho' : 'Salvar Rascunho'}
                                </button>

                                <button
                                    type="submit"
                                    name="actionType"
                                    value="publish"
                                    className={styles.button}
                                >
                                    {isEditing ? 'Atualizar Matéria' : 'Publicar Matéria'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}