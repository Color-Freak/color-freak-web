import Link from 'next/link';
import styles from './CallToAction.module.css';

export function CallToAction() {
    return (
        <aside className={styles.ctaDestaque}>
            <p>
                <strong>Aproveite o menor preço!</strong> <br />Compre pelos cards de produtos ao longo desta matéria ou visite nossa página de{' '}
                <Link href="/products" className={styles.linkDestaque}>
                    Produtos Favoritos
                </Link>
                , onde reuni todos os itens que realmente funcionam para a saúde do nosso cabelo.
            </p>
        </aside>
    );
}