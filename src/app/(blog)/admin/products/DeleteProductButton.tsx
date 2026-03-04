'use client'

import { useTransition } from 'react';
import { handleDeleteProduct } from '@/actions/productActions';
import { TrashIcon } from '@/components/Icons';
import styles from '../posts/posts.module.css';

export default function DeleteProductButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const onClickDelete = () => {
        if (confirm('Tem certeza que deseja apagar este produto?')) {
            startTransition(() => {
                handleDeleteProduct(id);
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