import styles from './TagList.module.css';
import { TagListProps } from '@/types';

export function TagList({ categories }: TagListProps) {
    if (!categories || categories.length === 0) {
        return (
            <div className={styles.tagContainer}>
                <span className={styles.tag}>Sem categoria</span>
            </div>
        );
    }

    return (
        <div className={styles.tagContainer}>
            {categories.map((cat) => (
                <span key={cat.id} className={styles.tag}>
                    #{cat.name}
                </span>
            ))}
        </div>
    );
}