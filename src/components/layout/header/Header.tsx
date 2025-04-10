"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Menu, X } from "lucide-react";
import styles from "./Header.module.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            iWork
          </Link>

          <div className={styles.searchBar}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <Input
                type="text"
                placeholder="Поиск по компаниям"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <Button size="sm" className={styles.searchButton}>
              Найти
            </Button>
          </div>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
            <Link href="/companies" className={styles.navLink}>
              Компании
            </Link>
            <Link href="/salaries" className={styles.navLink}>
              Зарплаты
            </Link>
            <Link href="/profile" className={styles.navLink}>
              <User size={18} className={styles.navIcon} />
              Профиль
            </Link>
          </nav>

          <button className={styles.menuToggle} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>
    </header>
  );
}
