import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} Color Freak - Desenvolvido por Melissa Perdomo
      </p>

      <p className={styles.text}>
        Color Freak é um projeto editorial independente e não possui vínculo com marcas comerciais citadas no conteúdo.
      </p>
    </footer>
  )
}