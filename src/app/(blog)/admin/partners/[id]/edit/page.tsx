import { getPartnerById } from '@/services/partnerService';
import { notFound } from 'next/navigation';
import { PartnerForm } from '../../new/PartnerForm';

type EditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditPartnerPage({ params }: EditPageProps) {
    const resolvedParams = await params;
    const partnerId = resolvedParams.id;

    const partner = await getPartnerById(partnerId);

    if (!partner) {
        notFound();
    }

    return <PartnerForm partner={partner} />;
}