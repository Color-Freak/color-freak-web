import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} CorRaiz - Desenvolvido por Melissa Perdomo
      </p>
    </footer>
  )
}