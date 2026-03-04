import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string; 
}

export function Pagination({ currentPage, totalPages, baseUrl = '/' }: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  if (totalPages <= 1) return null;

  // Função auxiliar para montar a URL correta preservando os filtros
  const createPageUrl = (page: number) => {
    if (baseUrl === '/') return `/?page=${page}`;
    // Se a baseUrl já tiver um "?", concatenamos com "&"
    return baseUrl.includes('?') ? `${baseUrl}&page=${page}` : `${baseUrl}?page=${page}`;
  };

  return (
    <div className={styles.container}>
      {currentPage > 1 && (
        <Link href={createPageUrl(prevPage)} className={styles.button}>
          &#60;
        </Link>
      )}

      <span className={styles.info}>
        {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link href={createPageUrl(nextPage)} className={styles.button}>
          &#62;
        </Link>
      )}
    </div>
  );
}