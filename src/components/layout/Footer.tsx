import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © Color Freak - Blog Editorial Desenvolvido por Melissa Perdomo
      </p>
      <p className={styles.disclaimer}>
        *Como associada da Amazon, eu recebo por compras qualificadas.
      </p>
    </footer>
  )
}