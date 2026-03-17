import Link from 'next/link';
import { InstagramIcon, LinkedinIcon, GithubIcon, MailIcon } from '@/components/Icons'; // Ajuste o caminho se necessário
import styles from './SocialSideBar.module.css';

export function SocialSideBar() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Me acompanhe nas redes</h3>
      <div className={styles.iconGroup}>
        <Link href="https://www.instagram.com/amelperdomo/" target="_blank" className={styles.iconLink} aria-label="Instagram">
          <InstagramIcon />
        </Link>
        <Link href="https://www.linkedin.com/in/melissa-perdomo/" target="_blank" className={styles.iconLink} aria-label="LinkedIn">
          <LinkedinIcon />
        </Link>
        <Link href="https://github.com/melperdomo" target="_blank" className={styles.iconLink} aria-label="GitHub">
          <GithubIcon />
        </Link>
        <Link href="mailto:blogcolorfreak@gmail.com" className={styles.iconLink} aria-label="E-mail">
          <MailIcon />
        </Link>
      </div>
    </div>
  );
}