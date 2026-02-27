import Image from 'next/image'
import { Product } from '@prisma/client' // Importa o tipo exato do banco
import styles from './ProductCard.module.css'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className={styles.card}>

            {/* 1. Imagem do Produto */}
            <div className={styles.imageWrapper}>
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className={styles.image}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: '#eee' }} />
                )}
            </div>

            {/* 2. Nome do Produto */}
            <h4 className={styles.name}>{product.name}</h4>

            {/* 4. Botão de Compra Afiliado */}
            <a
                href={product.affiliateLink}
                target="_blank" // Abre em nova aba
                rel="noopener noreferrer" // Regra de segurança obrigatória para links externos
                className={styles.button}
            >
                Comprar
            </a>

        </div>
    )
}