import Link from 'next/link';
import { Category } from '@prisma/client';
import styles from './CategorySideBar.module.css'; // <-- Importando o arquivo novo

interface CategorySideBarProps {
    categories: Category[];
    activeCategoryId?: string;
    baseUrl: string;
}

export function CategorySideBar({ categories, activeCategoryId, baseUrl }: CategorySideBarProps) {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.title}>Categorias</h2>
            <ul className={styles.list}>
                <li>
                    <Link
                        href={baseUrl}
                        className={!activeCategoryId ? styles.active : styles.link}
                    >
                        Todas as Categorias
                    </Link>
                </li>

                {categories.map((category) => (
                    <li key={category.id}>
                        <Link
                            href={`${baseUrl}?categoria=${category.id}`}
                            className={activeCategoryId === category.id ? styles.active : styles.link}
                        >
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}