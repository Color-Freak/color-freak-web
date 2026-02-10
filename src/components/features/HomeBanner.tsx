import Image from 'next/image'
import styles from './HomeBanner.module.css'
import bannerImg from '@/assets/bgpuro3.jpg' 

export function HomeBanner() {
  return (
    <div className={styles.container}>
      <Image
        src={bannerImg}
        alt="Destaque do Blog"
        fill // Mantemos o fill pois é comportamento (responsividade), não estilo
        priority // Performance (LCP)
        className={styles.image} // <--- O estilo visual agora vem daqui
        sizes="(max-width: 768px) 100vw, 90vw" // Dica para o navegador baixar a img certa
      />
    </div>
  )
}