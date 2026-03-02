'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import Image from 'next/image' // 1. Importe o Image
import styles from './SearchBar.module.css'

// 2. Importe o seu SVG (ajuste o nome do arquivo para o correto)
import searchIcon from '@/assets/icons/search-icon.svg' 

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`)
    } else {
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSearch} className={styles.container}>
      <input
        type="text"
        placeholder="Digite uma palavra chave..."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.button} aria-label="Buscar">
        <Image 
          src={searchIcon} 
          alt="Ícone de busca" 
          width={20} 
          height={20} 
        />
      </button>
    </form>
  )
}