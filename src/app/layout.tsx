// src/app/layout.tsx
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import "./globals.css"
import styles from "./globals.module.scss";
import { TokenStorage } from "@/components/auth/TokenStorage";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ReduxProvider>
            <ReactQueryProvider>
              <TokenStorage />
              <div className={styles.layoutWrapper}>
                <Header />
                <main className={styles.content}>{children}</main>
                <Footer />
              </div>
            </ReactQueryProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}