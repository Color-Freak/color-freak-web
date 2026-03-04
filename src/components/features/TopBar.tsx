'use client' // Obrigatório para podermos ler a URL atual no Next.js

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar'; // Ajuste o caminho se necessário
import styles from './TopBar.module.css';

interface TopBarProps {
    showSearch?: boolean;
}

export function TopBar({ showSearch = false }: TopBarProps) {
    const pathname = usePathname();

    // Regras de negócio para saber qual aba está ativa:
    // O Blog é ativo se estivermos na Home ('/') ou lendo uma matéria (ex: '/post/slug')
    const isBlogActive = pathname === '/' || pathname.startsWith('/post');
    // Os Produtos são ativos apenas dentro da rota de produtos
    const isProductsActive = pathname.startsWith('/products');

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li>
                        <Link
                            href="/"
                            className={`${styles.link} ${isBlogActive ? styles.active : ''}`}
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            className={`${styles.link} ${isProductsActive ? styles.active : ''}`}
                        >
                            Produtos
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* A Barra de Pesquisa continua respeitando a prop */}
            {showSearch && (
                <div className={styles.searchWrapper}>
                    <SearchBar />
                </div>
            )}
        </div>
    );
}