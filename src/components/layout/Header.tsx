import Link from 'next/link'
import styles from './Header.module.css' // Importação do CSS Module
import Image from 'next/image'
import logoImg from '@/assets/cor-raiz-white-logo.png'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src={logoImg}
            alt="Logo CorRaiz"
            className={styles.logoImage} // <--- Aqui está o seu controle de estilo!
            priority // Carrega instantaneamente (importante para header)
          />
        </Link>
      </div>

      {/* Slogan do Blog (Lado Direito) */}
      <div className={styles.tagline}>
        Dicas, testes reais e reviews de produtos para cabelo colorido e descolorido.
      </div>

      {/* <nav className={styles.nav}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/sobre">Sobre</Link></li>
          <li><Link href="/ferramentas">Ferramentas</Link></li>
        </ul>
      </nav> */}
    </header>
  )
}