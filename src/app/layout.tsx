// src/app/layout.tsx
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import "./globals.css"
import styles from "./globals.module.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ReactQueryProvider>
            <div className={styles.layoutWrapper}>
              <Header />
              <main className={styles.content}>{children}</main>
              <Footer />
            </div>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}