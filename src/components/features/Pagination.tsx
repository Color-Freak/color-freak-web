import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string; // Colocamos o '?' para ser opcional. Assim não quebra a sua Home que já está usando ele.
}

// Definimos o baseUrl padrão como '/' para manter o comportamento antigo se nada for passado
export function Pagination({ currentPage, totalPages, baseUrl = '/' }: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Se só tiver 1 página no total, não mostra a paginação
  if (totalPages <= 1) return null;

  return (
    <div className={styles.container}>
      
      {/* Só renderiza o botão se a página atual for maior que 1 */}
      {currentPage > 1 && (
        <Link href={baseUrl === '/' ? `/?page=${prevPage}` : `${baseUrl}?page=${prevPage}`} className={styles.button}>
          &#60;
        </Link>
      )}

      <span className={styles.info}>
        {currentPage} de {totalPages}
      </span>

      {/* Só renderiza o botão se a página atual for menor que o total */}
      {currentPage < totalPages && (
        <Link href={baseUrl === '/' ? `/?page=${nextPage}` : `${baseUrl}?page=${nextPage}`} className={styles.button}>
          &#62;
        </Link>
      )}
      
    </div>
  );
}