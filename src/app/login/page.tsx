'use client'

import { useActionState } from 'react' // Boa prática: imports do React no topo
import Image from 'next/image'
import { handleLogin } from '@/actions/authActions'
import styles from './login.module.css'
import logoImg from '@/assets/1.png'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(handleLogin, null);

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.logoContainer}>
          <Image
            src={logoImg}
            alt="Logo Color Freak"
            width={280}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        <form action={formAction} className={styles.form}>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input type="password" id="password" name="password" className={styles.input} required />
          </div>

          {/* Exibe a mensagem de erro que vem lá do seu authAction.ts */}
          {state?.error && (
            <div className={styles.errorMessage}>
              {state.error}
            </div>
          )}

          {/* O isPending desativa o botão (disabled) para evitar cliques duplos */}
          <button type="submit" className={styles.button} disabled={isPending}>
            {isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

      </div>
    </main>
  )
}