'use client'

import { handleSaveCategory } from '@/actions/categoryActions'
import { Category } from '@prisma/client' 
import styles from '@/app/(blog)/admin/form.module.css'
import layoutStyles from '@/app/layout.module.css'
import { BackButton } from '@/components/BackButton'

interface CategoryFormProps {
    category?: Category; // Opcional: só existe quando estamos editando
}

export function CategoryForm({ category }: CategoryFormProps) {
    const isEditing = !!category;

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>{isEditing ? 'Editar Categoria' : 'Nova Categoria'}</h1>

                <div data-color-mode="light">
                    <form action={handleSaveCategory} className={styles.form}>
                        {/* Envia o ID secretamente se for edição */}
                        {isEditing && <input type="hidden" name="categoryId" value={category.id} />}

                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>Nome da Categoria</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                defaultValue={category?.name || ''} 
                                className={styles.input} 
                                required 
                            />
                        </div>

                        <div className={styles.formActions}>
                            <BackButton />
                            <button type="submit" className={styles.button}>
                                {isEditing ? 'Atualizar Categoria' : 'Salvar Categoria'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}