import Link from 'next/link';
import { getPartners } from '@/services/partnerService';
import styles from '../posts/posts.module.css';
import layoutStyles from '@/app/layout.module.css';
import DeletePartnerButton from './DeletePartnerButton';
import { EditIcon } from '@/components/Icons';

export default async function AdminPartnersPage() {
    const partners = await getPartners();

    return (
        <div className={layoutStyles.contentContainer}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h1 className={styles.title}>Parceiros</h1>
                    <Link href="/admin/partners/new" className={styles.newButton}>
                        + Novo Parceiro
                    </Link>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Slug</th>
                            <th>Website</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partners.map((partner) => (
                            <tr key={partner.id}>
                                <td>{partner.name}</td>
                                <td>{partner.slug}</td>
                                <td>{partner.website || '-'}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <Link href={`/admin/partners/${partner.id}/edit`} className={styles.editBtn} title="Editar">
                                            <EditIcon />
                                        </Link>
                                        <DeletePartnerButton id={partner.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {partners.length === 0 && (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center' }}>Nenhum parceiro encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}