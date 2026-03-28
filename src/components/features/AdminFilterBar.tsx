"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import layoutStyles from '@/app/layout.module.css';
import styles from './AdminFilterBar.module.css';

interface Category {
    id: string;
    name: string;
}

interface AdminFilterBarProps {
    categories: Category[];
    placeholder?: string;
}

export function AdminFilterBar({ categories, placeholder = "Buscar..." }: AdminFilterBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');

        if (search) params.set('search', search);
        else params.delete('search');

        if (category) params.set('category', category);
        else params.delete('category');

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleFilter} className={styles.filterForm}>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className={styles.filterInput}
            />
            
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className={styles.filterSelect}
            >
                <option value="">Todas as categorias</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            
            <button type="submit" className={layoutStyles.secondaryButton}>
                Filtrar
            </button>
        </form>
    );
}