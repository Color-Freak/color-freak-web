// src/app/(blog)/layout.tsx
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import styles from "../layout.module.css";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />

            <main className={styles.main}>
                {children}
            </main>

            <Footer />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        </>
    );
}