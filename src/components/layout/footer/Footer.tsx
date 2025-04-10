"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Smartphone,
  Apple,
  Search,
  User,
  HelpCircle,
} from "lucide-react";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div className={styles.topSection}>
            <div className={styles.column}>
              <h6 className={styles.logo}>iWork</h6>
              <p className={styles.tagline}>
                Найдите свою идеальную работу и развивайте карьеру
              </p>
            </div>

            <div className={styles.column}>
              <h6 className={styles.columnTitle}>iWork</h6>
              <Link href="#" className={styles.footerLink}>
                О нас
              </Link>
              <Link href="#" className={styles.footerLink}>
                Карьера
              </Link>
              <Link href="#" className={styles.footerLink}>
                Инвесторам
              </Link>
              <Link href="#" className={styles.footerLink}>
                Контакты
              </Link>
            </div>

            <div className={styles.column}>
              <h6 className={styles.columnTitle}>Информация</h6>
              <Link href="#" className={styles.footerLink}>
                Помощь
              </Link>
              <Link href="#" className={styles.footerLink}>
                Условия использования
              </Link>
              <Link href="#" className={styles.footerLink}>
                Политика конфиденциальности
              </Link>
              <Link href="#" className={styles.footerLink}>
                Cookie
              </Link>
            </div>

            <div className={styles.column}>
              <h6 className={styles.columnTitle}>Загрузите приложение</h6>
              <div className={styles.appButtons}>
                <Button
                  variant="outline"
                  size="sm"
                  className={styles.appButton}
                >
                  <Apple className={styles.appIcon} size={18} />
                  <div className={styles.appText}>
                    <span className={styles.appDownload}>Скачать в</span>
                    <span className={styles.appStore}>App Store</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={styles.appButton}
                >
                  <Smartphone className={styles.appIcon} size={18} />
                  <div className={styles.appText}>
                    <span className={styles.appDownload}>Скачать в</span>
                    <span className={styles.appStore}>Google Play</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <Separator className={styles.separator} />

          <div className={styles.bottomSection}>
            <div className={styles.social}>
              <Button
                variant="ghost"
                size="icon"
                className={styles.socialButton}
              >
                <Facebook size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={styles.socialButton}
              >
                <Twitter size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={styles.socialButton}
              >
                <Instagram size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={styles.socialButton}
              >
                <Youtube size={18} />
              </Button>
            </div>

            <div className={styles.regionSection}>
              <Select defaultValue="Kazakhstan">
                <SelectTrigger className={styles.regionSelect}>
                  <SelectValue placeholder="Выберите регион" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kazakhstan">Казахстан</SelectItem>
                  <SelectItem value="USA">США</SelectItem>
                  <SelectItem value="Russia">Россия</SelectItem>
                  <SelectItem value="Germany">Германия</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={styles.copyright}>
              © {new Date().getFullYear()} iWork. Все права защищены.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
