'use client'

import Select from 'react-select'
import { handleSaveProduct } from '@/actions/productActions'
import { Category, Partner, Product } from '@prisma/client'
import styles from '@/app/(main)/admin/form.module.css'
import layoutStyles from '@/app/layout.module.css'
import { BackButton } from '@/components/BackButton'

interface ProductFormProps {
    categories: Category[];
    partners: Partner[];
    product?: Product & {
        categories?: Category[];
    };
}

export function ProductForm({ categories, partners, product }: ProductFormProps) {
    const isEditing = !!product;

    const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
    const defaultCategories = product?.categories?.map(cat => ({ value: cat.id, label: cat.name })) || [];

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h1>

                <div data-color-mode="light">
                    <form action={handleSaveProduct} className={styles.form}>
                        {isEditing && <input type="hidden" name="productId" value={product.id} />}

                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>Nome do Produto *</label>
                            <input type="text" id="name" name="name" defaultValue={product?.name || ''} className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="description" className={styles.label}>Descrição</label>
                            <input type="text" id="description" name="description" defaultValue={product?.description || ''} className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="imageUrl" className={styles.label}>Link da Imagem *</label>
                            <input type="url" id="imageUrl" name="imageUrl" defaultValue={product?.imageUrl || ''} className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="affiliateLink" className={styles.label}>Link Afiliado *</label>
                            <input type="url" id="affiliateLink" name="affiliateLink" defaultValue={product?.affiliateLink || ''} className={styles.input} required />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="price" className={styles.label}>Preço</label>
                                <input type="text" id="price" name="price" defaultValue={product?.price || ''} className={styles.input} placeholder="Ex: R$ 199,90" />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="partnerId" className={styles.label}>Parceiro</label>
                                <select id="partnerId" name="partnerId" defaultValue={product?.partnerId || ''} className={styles.input}>
                                    <option value="">Nenhum</option>
                                    {partners.map((partner) => (
                                        <option key={partner.id} value={partner.id}>{partner.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Categorias *</label>
                            <Select isMulti name="categoryIds" options={categoryOptions} defaultValue={defaultCategories} placeholder="Selecione as categorias..." />
                        </div>

                        <div className={styles.formActions}>
                            <BackButton />
                            <button type="submit" className={styles.button}>
                                {isEditing ? 'Atualizar Produto' : 'Salvar Produto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}