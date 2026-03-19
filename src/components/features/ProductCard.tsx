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

    // 1. Lemos o link e transformamos tudo em minúsculo para evitar erros de leitura
    const link = product.affiliateLink.toLowerCase();

    // 2. JS verifica se a URL contém as palavras-chave (incluindo links encurtados comuns)
    const isShopee = link.includes('shopee') || link.includes('shp.ee');

    // 3. Definimos o texto e o evento do Analytics de forma dinâmica
    const buttonText = isShopee ? 'Ver na Shopee' : 'Ver na Amazon';
    const analyticsEvent = isShopee ? 'clique_shopee' : 'clique_amazon';

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

            {/* 4. Botão de Compra Afiliado Dinâmico */}
            <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                onClick={() => sendGAEvent({ event: analyticsEvent, product_name: product.name })}
            >
                {buttonText}
            </a>

        </div>
    )
}