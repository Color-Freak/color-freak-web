'use client'

import Image from 'next/image'
import { handleLogin } from '@/actions/authActions'
import styles from './login.module.css'
import logoImg from '@/assets/color-freak-logo-white.png'

export default function LoginPage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* Container do Logo do Color Freak */}
        <div className={styles.logoContainer}>
          <Image 
            src={logoImg}
            alt="Logo Color Freak" 
            width={180} 
            priority // Diz ao navegador para carregar essa imagem primeiro
            style={{ objectFit: 'contain' }}
          />
        </div>

        <form action={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input type="password" id="password" name="password" className={styles.input} required />
          </div>

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
        
      </div>
    </main>
  )
}