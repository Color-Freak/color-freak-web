import { Metadata } from 'next';
import { getLatestPosts } from '@/services/postService';
import layoutStyles from '@/app/layout.module.css';
import sharedStyles from '@/app/page.module.css';
import styles from './labelGuide.module.css';

import { SideBar } from '@/components/features/SideBar';
import { SocialSideBar } from '@/components/features/SocialSideBar';
import { TopBar } from '@/components/features/TopBar';
import { CallToAction } from '@/components/features/CallToAction';

// 1. Otimização de SEO injetada direto pelo Next.js
export const metadata: Metadata = {
    title: 'Guia de Rótulos | Color Freak',
    description: 'Decifre o rótulo do seu cosmético. O guia prático para você entender o que está passando no cabelo e não ser mais enganada pelas embalagens.',
};

export default async function GuiaDeRotulosPage() {
    const latestPosts = await getLatestPosts(5);

    return (
        <div className={layoutStyles.contentContainer}>
            <TopBar />
            
            <div className={sharedStyles.mainLayout}>

                {/* ---- COLUNA ESQUERDA: TEXTO PRINCIPAL ---- */}
                <div className={sharedStyles.contentArea}>

                    <h1 className={sharedStyles.title}>Guia de Rótulos</h1>

                    <article className={styles.articleContent}>
                        <h2>O guia prático para você decifrar o rótulo do seu cosmético e não ser mais enganada pelas embalagens.</h2>

                        <h3>1. Limpeza (Os Tensoativos)</h3>
                        <p>O que faz o shampoo espumar e limpar. Nem todo &ldquo;limpante&rdquo; é igual.</p>
                        <ul>
                            <li><strong>Sodium Lauryl Sulfate (SLS):</strong> Um sulfato forte de limpeza agressiva. Pode ressecar fios coloridos.</li>
                            <li><strong>Sodium Laureth Sulfate (SLES):</strong> Um sulfato médio e mais comum. Limpa bem, mas exige hidratação depois.</li>
                            <li><strong>Lauryl Glucoside / Coco-Glucoside:</strong> Um tensoativo &ldquo;verde&rdquo; de limpeza suave (Low Poo). Mantém a oleosidade natural.</li>
                            <li><strong>Cocamidopropyl Betaine:</strong> Um anfótero que limpa sem ressecar. Muito usado em Co-wash.</li>
                        </ul>

                        <h3>2. Hidratação (Os Umectantes)</h3>
                        <p>Ingredientes que &ldquo;puxam&rdquo; e seguram a água dentro do fio.</p>
                        <ul>
                            <li><strong>Glycerin (Glicerina):</strong> O umectante mais comum. Retém a umidade.</li>
                            <li><strong>Panthenol (Vitamina B5):</strong> Dá maciez e brilho. Ajuda na regeneração.</li>
                            <li><strong>Aloe Barbadensis Leaf Extract (Babosa):</strong> Hidratação profunda e calmante para o couro.</li>
                            <li><strong>Propylene Glycol:</strong> Ajuda os outros ativos a penetrarem no fio.</li>
                            <li><strong>Sodium Hyaluronate (Ácido Hialurônico):</strong> Consegue reter até 1000 vezes o seu peso em água. Hidratação de altíssimo impacto.</li>
                            <li><strong>Sodium PCA:</strong> Umectante natural presente na nossa pele. Ajuda a reter a umidade e a cor no fio descolorido.</li>
                            <li><strong>Ceramides (Ceramidas):</strong> Lipídio natural que age preenchendo as cutículas, mantendo a hidratação lá dentro.</li>
                        </ul>

                        <h3>3. Nutrição (Óleos e Manteigas)</h3>
                        <p>Ingredientes que repõem a gordura (lipídios) e dão brilho e peso ao fio.</p>
                        <ul>
                            <li><strong>Cocos Nucifera Oil (Óleo de Coco):</strong> Penetra na fibra. Ótimo para proteção pré-sol.</li>
                            <li><strong>Butyrospermum Parkii Butter (Manteiga de Karité):</strong> Nutrição pesada para fios secos/crespos.</li>
                            <li><strong>Argania Spinosa Kernel Oil (Argan):</strong> Rico em Vitamina E. Dá brilho e reduz frizz.</li>
                            <li><strong>Orbignya Oleifera Seed Oil (Babaçu):</strong> Cria uma barreira que repele a água do mar (hidrofóbico).</li>
                        </ul>

                        <h3>4. Reconstrução (As Proteínas)</h3>
                        <p>Ingredientes que repõem a massa e a estrutura do fio. Procure pela palavra <strong>&ldquo;Hydrolyzed&rdquo;</strong> (Hidrolisada), que significa que a molécula foi &ldquo;quebrada&rdquo; para conseguir entrar no fio.</p>
                        <ul>
                            <li><strong>Hydrolyzed Keratin (Queratina):</strong> A base do cabelo. Dá força, mas em excesso pode enrijecer.</li>
                            <li><strong>Hydrolyzed Rice/Soy Protein (Arroz/Soja):</strong> Reconstrução mais leve e hidratante.</li>
                            <li><strong>Arginine, Serine, Threonine:</strong> Aminoácidos que preenchem as falhas da fibra capilar.</li>
                            <li><strong>Hydrolyzed Collagen (Colágeno):</strong> Melhora a elasticidade e a flexibilidade do fio, evitando a quebra de cabelos muito processados.</li>
                            <li><strong>Hydrolyzed Elastin (Elastina):</strong> Trabalha em conjunto com o colágeno para devolver a resistência &ldquo;elástica&rdquo; natural do cabelo saudável.</li>
                        </ul>

                        <h3>5. Selamento e pH (Os Ácidos)</h3>
                        <p>Responsáveis por fechar as cutículas e dar o brilho espelhado.</p>
                        <ul>
                            <li><strong>Lactic Acid (Ácido Lático):</strong> Regula o pH e ajuda a relaxar a fibra de forma suave.</li>
                            <li><strong>Citric Acid (Ácido Cítrico):</strong> Ajusta o pH para deixar o produto compatível com o fio.</li>
                            <li><strong>Vinegar (Vinagre):</strong> O selante natural mais potente para baixar o pH pós-química.</li>
                        </ul>

                        <h3>6. Os &ldquo;Polêmicos&rdquo; (Silicones e Petrolatos)</h3>
                        <p>Aqui é onde você descobre se o produto é liberado ou não.</p>
                        
                        <div className={styles.highlightBox}>
                            <p><strong>Regra Geral:</strong></p>
                            <ul>
                                <li>Terminou em <strong>-cone</strong>, <strong>-conol</strong> ou <strong>-xane</strong>? É silicone.</li>
                                <li>Tem <strong>Mineral Oil</strong>, <strong>Paraffinum Liquidum</strong> ou <strong>Petrolatum</strong>? É derivado de petróleo (proibido para Low/No Poo).</li>
                            </ul>
                        </div>

                        <ul>
                            <li><strong>Cyclopentasiloxane / Dimethicone:</strong> Silicones que criam barreira térmica. Se forem insolúveis, exigem shampoo com sulfato para sair.</li>
                            <li><strong>Isopropyl Myristate:</strong> Um amaciante que ajuda o produto a deslizar, mas pode pesar em fios finos.</li>
                        </ul>

                        <h3>7. Os Álcoois (Os Bons e os Ruins)</h3>
                        <p>Muitos produtos têm álcool na fórmula, mas eles se dividem em dois grupos completamente opostos.</p>
                        <ul>
                            <li><strong>Os Bons (Álcoois Graxos/Emolientes):</strong> <code>Cetearyl Alcohol</code>, <code>Cetyl Alcohol</code>, <code>Stearyl Alcohol</code>. São álcoois hidratantes. Dão a textura cremosa à máscara, ajudam a desembaraçar e condicionam o fio.</li>
                            <li><strong>Os Ruins (Álcoois Secantes):</strong> <code>Alcohol</code>, <code>Alcohol Denat</code>, <code>Ethanol</code>, <code>Isopropyl Alcohol</code>. Evaporam rápido e levam a água do cabelo junto. Causam ressecamento severo se estiverem no topo da lista de ingredientes.</li>
                        </ul>

                        <h3>8. Agentes Condicionantes (Os Desembaraçadores)</h3>
                        <p>São os tensoativos catiônicos. Eles têm carga positiva, que gruda na carga negativa do cabelo danificado, anulando o frizz e &ldquo;derretendo&rdquo; o fio.</p>
                        <ul>
                            <li><strong>Behentrimonium Methosulfate (BTMS):</strong> O melhor amigo do cabelo descolorido. Desembaraça profundamente sem pesar.</li>
                            <li><strong>Behentrimonium Chloride / Cetrimonium Chloride:</strong> Agentes antiestáticos excelentes para alinhar as cutículas e dar a sensação de maciez imediata.</li>
                            <li><strong>Polyquaternium (seguido de um número, ex: Polyquaternium-7):</strong> Polímeros que formam um filme protetor e ajudam a manter o cacho definido ou o liso alinhado.</li>
                        </ul>

                        <h3>9. Pigmentos e Matizadores (A Magia da Cor)</h3>
                        <p>Se você usa máscaras colorantes ou shampoos desamareladores, são esses ativos que estão depositando cor no seu cabelo.</p>
                        <ul>
                            <li><strong>Acid Violet 43 / CI 60730:</strong> O famoso pigmento roxo/violeta. É ele que anula o fundo de clareamento amarelo dos loiros.</li>
                            <li><strong>Basic Blue 99, Basic Red 51, etc.:</strong> Corantes diretos (Basic + Cor + Número) usados em máscaras pigmentantes e tonalizantes sem amônia (fantasia). Eles não abrem a cutícula, apenas aderem por fora.</li>
                            <li><strong>Mica:</strong> Mineral que adiciona aquele brilho cintilante ao próprio creme (efeito visual no produto, não trata o cabelo).</li>
                        </ul>

                        <h3>10. Conservantes e Antioxidantes</h3>
                        <p>O que impede a sua máscara de criar fungos no banheiro e protege a cor de desbotar.</p>
                        <ul>
                            <li><strong>Phenoxyethanol:</strong> O conservante mais seguro e comum atualmente nas fórmulas liberadas.</li>
                            <li><strong>Methylchloroisothiazolinone / Methylisothiazolinone (Kathon CG):</strong> Conservantes potentes, muito comuns em produtos de farmácia. Podem causar alergia em couros cabeludos sensíveis.</li>
                            <li><strong>Parabenos (Methylparaben, Propylparaben):</strong> Conservantes polêmicos, evitados por marcas &ldquo;liberadas&rdquo;, mas muito eficazes contra bactérias.</li>
                            <li><strong>Tocopheryl Acetate / Tocopherol (Vitamina E):</strong> Antioxidante poderoso. Evita que os óleos da fórmula fiquem rançosos e protege o cabelo contra a oxidação (desbotamento) pelo sol.</li>
                        </ul>

                        <h3>Como usar este guia?</h3>
                        <p>Sempre que estiver na dúvida em uma loja ou olhando para o seu armário, procure o termo aqui. Se um produto diz ser &ldquo;Reconstrutor&rdquo;, mas não tem nenhuma proteína ou aminoácido nos primeiros 5 ingredientes do rótulo, você já sabe: <strong>é marketing, não é tratamento.</strong></p>

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