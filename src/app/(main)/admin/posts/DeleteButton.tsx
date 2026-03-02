'use client'

import { useTransition } from 'react';
import { handleDeletePost } from '@/actions/postActions';
import styles from './posts.module.css';
import { TrashIcon } from '@/components/Icons';

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const onClickDelete = () => {
    // Confirmação nativa do navegador para evitar deleção acidental
    const confirmed = window.confirm("Tem certeza que deseja apagar esta matéria?");
    
    if (confirmed) {
      startTransition(() => {
        handleDeletePost(id);
      });
    }
  };

  return (
    <button 
      onClick={onClickDelete} 
      disabled={isPending} 
      className={styles.deleteBtn}
      style={{ opacity: isPending ? 0.5 : 1 }}
    >
      <TrashIcon/>
    </button>
  );
}