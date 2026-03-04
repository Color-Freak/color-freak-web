import Link from 'next/link';
import { getPartners } from '@/services/partnerService';
import { Pagination } from '@/components/features/Pagination';
import styles from '@/app/(main)/admin/posts/posts.module.css';
import layoutStyles from '@/app/layout.module.css';
import DeletePartnerButton from './DeletePartnerButton';
import { EditIcon } from '@/components/Icons';

type PageProps = {
    searchParams: Promise<{ page?: string }>;
};

export default async function AdminPartnersPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams.page) || 1;

    // Recebe o objeto desestruturado
    const { partners, totalPages } = await getPartners(currentPage, 10);

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
                                        <Link href={`/admin/partners/${partner.id}/edit`} className={styles.editBtn} title="Editar"><EditIcon /></Link>
                                        <DeletePartnerButton id={partner.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {partners.length === 0 && (
                            <tr><td colSpan={4} style={{ textAlign: 'center' }}>Nenhum parceiro encontrado.</td></tr>
                        )}
                    </tbody>
                </table>

                <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/partners" />
            </div>
        </div>
    );
}