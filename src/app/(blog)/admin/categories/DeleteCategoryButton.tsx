'use client'

import { useTransition } from 'react';
import { handleDeleteCategory } from '@/actions/categoryActions';
import { TrashIcon } from '@/components/Icons';
import styles from '../posts/posts.module.css'; // Importando o CSS que já existe!

export default function DeleteCategoryButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const onClickDelete = () => {
        if (confirm('Tem certeza que deseja apagar esta categoria?')) {
            startTransition(() => {
                handleDeleteCategory(id);
            });
        }
    };

    return (
        <button 
            onClick={onClickDelete} 
            disabled={isPending} 
            className={styles.deleteBtn}
            style={{ opacity: isPending ? 0.5 : 1 }}
            title="Apagar"
        >
            <TrashIcon />
        </button>
    );
}