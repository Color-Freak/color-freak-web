import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Se só tiver 1 página no total, não mostra a paginação
  if (totalPages <= 1) return null;

  return (
    <div className={styles.container}>
      
      {/* Só renderiza o botão se a página atual for maior que 1 */}
      {currentPage > 1 && (
        <Link href={`/?page=${prevPage}`} className={styles.button}>
          &#60;
        </Link>
      )}

      <span className={styles.info}>
        {currentPage} de {totalPages}
      </span>

      {/* Só renderiza o botão se a página atual for menor que o total */}
      {currentPage < totalPages && (
        <Link href={`/?page=${nextPage}`} className={styles.button}>
          &#62;
        </Link>
      )}
      
    </div>
  );
}