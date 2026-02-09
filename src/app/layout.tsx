import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import styles from "./layout.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // Cria uma variável CSS para usarmos se precisar
});

export const metadata: Metadata = {
  title: "Cor-Raiz | Cabelo Colorido, Descoloração e Cuidados Reais",
  description:
    "Conteúdo técnico e real sobre cabelo colorido, descoloração global, cronograma capilar e cuidados que funcionam na prática.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Header />

        <main className={styles.container}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}