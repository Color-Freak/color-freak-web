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
    const isBlogActive = pathname === '/' || pathname.startsWith('/post');
    const isProductsActive = pathname.startsWith('/products');
    const isAboutActive = pathname.startsWith('/about');
    const isGuideActive = pathname.startsWith('/label-guide');

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
                    <li>
                        <Link
                            href="/label-guide"
                            className={`${styles.link} ${isGuideActive ? styles.active : ''}`}
                        >
                            Guia de Rótulos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`${styles.link} ${isAboutActive ? styles.active : ''}`}
                        >
                            Sobre
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