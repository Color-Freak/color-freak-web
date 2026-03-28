import { getLatestPosts } from '@/services/postService';
import layoutStyles from '@/app/layout.module.css';
import sharedStyles from '@/app/page.module.css'; // Importamos o seu layout padrão
import styles from './about.module.css'; // Importamos a tipografia do texto
import Image from 'next/image'; // Importamos o componente de Imagem do Next.js
import ProfileImg from '@/assets/mel-perfil.png'

import { SideBar } from '@/components/features/SideBar';
import { SocialSideBar } from '@/components/features/SocialSideBar';
import { TopBar } from '@/components/features/TopBar';
import { CallToAction } from '@/components/features/CallToAction';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre | Color Freak',
    description: 'Conheça o Color Freak: um blog com conteúdo técnico e real sobre cuidados com cabelo colorido, descolorido, crespo, cronograma capilar e cuidados que mantém os fios saudáveis.',
};

export default async function SobrePage() {
    const latestPosts = await getLatestPosts(5);

    return (
        <div className={layoutStyles.contentContainer}>
            <TopBar />
            {/* Trocamos o styles.container pelo seu mainLayout */}
            <div className={sharedStyles.mainLayout}>

                {/* ---- COLUNA ESQUERDA: TEXTO PRINCIPAL ---- */}
                <div className={sharedStyles.contentArea}>

                    <h1 className={sharedStyles.title}>Sobre o Color Freak</h1>

                    <article className={styles.articleContent}>
                        <p>O Color Freak nasceu para descomplicar os cuidados com cabelos coloridos e descoloridos. Mais do que um espaço de dicas, este é um laboratório real focado em autonomia, testes sinceros e informação com embasamento para quem ama transformar os fios, mas não abre mão da saúde capilar.</p>

                        <p>A ideia é traduzir rótulos, desmistificar promessas da indústria e compartilhar o que realmente funciona na prática, traduzindo a química capilar em informações simples, diretas e fáceis de aplicar na sua rotina.</p>

                        <p>O que você vai encontrar por aqui:</p>
                        <ul>
                            <li><strong>Resenhas de verdade:</strong> Testes de produtos com foco nos ingredientes e nos resultados reais a longo prazo.</li>
                            <li><strong>Informação didática:</strong> O porquê das coisas. Entenda o que seu cabelo precisa e como cada ativo age na fibra capilar.</li>
                            <li><strong>Autonomia:</strong> Conhecimento prático para você ter segurança ao descolorir, pintar e tratar seu cabelo em casa.</li>
                        </ul>

                        <h3>Quem faz o Color Freak?</h3>

                        {/* ---- NOVO BLOCO DE PERFIL ---- */}
                        <div className={styles.profileBlock}>

                            {/* Insira sua foto na pasta /public/img/ com o nome mel-perfil.jpg */}
                            <Image
                                src={ProfileImg}
                                alt="Foto da Melissa Perdomo, criadora do Color Freak"
                                className={styles.profileImage}
                                priority // Carrega essa imagem com prioridade
                            />

                            <div className={styles.textGroup}>
                                <p>Eu sou a Mel, muito prazer!</p>

                                <p>Minha relação com descolorantes e tinturas começou cedo: pinto e cuido do meu próprio cabelo sozinha desde os 16 anos. Hoje, aos 34, acumulo quase duas décadas de testes, erros, acertos e muita pesquisa sobre a ação de diferentes ingredientes e tratamentos nos fios.</p>

                                <p>Sou Desenvolvedora Full Stack, mas minha base vem da comunicação e do ensino. Também sou formada em Pedagogia e atuei por anos com marketing e redação.</p>
                            </div>
                        </div>

                        <p>Aproveite os conteúdos, pegue suas luvas e pincel, e sinta-se em casa! 💜</p>

                        <CallToAction />
                    </article>
                </div>

                {/* ---- COLUNA DIREITA: BARRAS LATERAIS ---- */}
                <aside className={sharedStyles.rightColumn}>
                    <SideBar latestPosts={latestPosts} />
                    <SocialSideBar />
                </aside>

            </div>
        </div>
    );
}