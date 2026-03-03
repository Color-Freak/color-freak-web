'use client'

import { handleSavePartner } from '@/actions/partnerActions'
import { Partner } from '@prisma/client'
import styles from '../../posts/new/admin.module.css'
import layoutStyles from '@/app/layout.module.css'
import { BackButton } from '@/components/BackButton'

interface PartnerFormProps {
    partner?: Partner;
}

export function PartnerForm({ partner }: PartnerFormProps) {
    const isEditing = !!partner;

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>{isEditing ? 'Editar Parceiro' : 'Novo Parceiro'}</h1>

                <div data-color-mode="light">
                    <form action={handleSavePartner} className={styles.form}>
                        {isEditing && <input type="hidden" name="partnerId" value={partner.id} />}

                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>Nome do Parceiro</label>
                            <input type="text" id="name" name="name" defaultValue={partner?.name || ''} className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="slug" className={styles.label}>Slug (URL única)</label>
                            <input type="text" id="slug" name="slug" defaultValue={partner?.slug || ''} className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="website" className={styles.label}>Website (Opcional)</label>
                            <input type="url" id="website" name="website" defaultValue={partner?.website || ''} className={styles.input} placeholder="https://..." />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="logoUrl" className={styles.label}>URL da Logo (Opcional)</label>
                            <input type="url" id="logoUrl" name="logoUrl" defaultValue={partner?.logoUrl || ''} className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="color" className={styles.label}>Cor da Marca (Hexadecimal - Opcional)</label>
                            <input type="text" id="color" name="color" defaultValue={partner?.color || ''} className={styles.input} placeholder="Ex: #EE40A2" />
                        </div>

                        <div className={styles.formActions}>
                            <BackButton />
                            <button type="submit" className={styles.button}>
                                {isEditing ? 'Atualizar Parceiro' : 'Salvar Parceiro'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}