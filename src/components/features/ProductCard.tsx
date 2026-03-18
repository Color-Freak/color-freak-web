"use client"

import { sendGAEvent } from '@next/third-parties/google'
import Image from 'next/image'
import { Product } from '@prisma/client' 
import styles from './ProductCard.module.css'

interface ProductCardProps {
    product: Product;
    variant?: 'vertical' | 'horizontal';
}

export function ProductCard({ product, variant = 'vertical' }: ProductCardProps) {
    const cardClass = `${styles.card} ${variant === 'horizontal' ? styles.horizontal : ''}`;
    return (
        <div className={cardClass}>

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
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                onClick={() => sendGAEvent({ event: 'clique_amazon', product_name: product.name })}
            >
                Ver na Amazon
            </a>

        </div>
    )
}