import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: 'Color Freak | Cabelo Colorido, Descoloração e Cuidados Reais',
    template: '%s | Color Freak'
  },
  description: 'Conteúdo técnico e real sobre cabelo colorido, descoloração global, cronograma capilar e cuidados que funcionam na prática.',
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className} suppressHydrationWarning={true}>
        {/* O Header, a tag main e o Footer saíram daqui */}
        {children}
      </body>
    </html>
  );
}