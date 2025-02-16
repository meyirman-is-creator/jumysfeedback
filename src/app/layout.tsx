import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import "./globals.css"
import styles from "./globals.module.scss";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layoutWrapper}>
          <Header />
          <main className={styles.content}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
