// AdminNav.tsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './adminNav.module.css';
import { LogoutButton } from '@/components/features/LogoutButton';

export function AdminNav() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Matérias', path: '/admin/posts' },
        { name: 'Produtos', path: '/admin/products' },
        { name: 'Parceiros', path: '/admin/partners' },
        { name: 'Categorias', path: '/admin/categories' },
    ];

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {navItems.map((item) => {
                    // Verifica se a URL atual começa com o caminho do item (ex: /admin/posts/new também ativa a aba Matérias)
                    const isActive = pathname.startsWith(item.path);

                    return (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`${styles.link} ${isActive ? styles.active : ''}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
                <li className={styles.logoutItem}>
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}