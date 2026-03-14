'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { SearchIconCustom } from '../Icons'
import styles from './SearchBar.module.css'

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
        placeholder="Busque por palavra chave..."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.button} aria-label="Buscar">
        <SearchIconCustom className={styles.searchIcon} />
      </button>
    </form>
  )
}