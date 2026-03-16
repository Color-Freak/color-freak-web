import Link from 'next/link'
import styles from './Header.module.css' // Importação do CSS Module
import Image from 'next/image'
import bgHeader from '@/assets/bgpuro1.png'
import logoImg from '@/assets/color-freak-logo-white.png'

export function Header() {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${bgHeader.src})` }}
    >
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src={logoImg}
            alt="Logo Color Freak"
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>
    </header>
  )
}