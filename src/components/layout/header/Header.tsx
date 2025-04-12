"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  FileText,
  DollarSign,
  LogOut,
  Building,
  BarChart2,
} from "lucide-react";
import styles from "./Header.module.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // Mock authentication state - in real app this would come from auth context
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle login status for demo purposes
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsMenuOpen(false); // Close the drawer after logout
  };

  // Check if the given path is active
  const isActive = (path:string) => {
    if (path === "/companies") {
      return pathname === "/companies" || pathname?.startsWith("/companies/");
    }
    return pathname === path;
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} onClick={closeDrawer}>
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
            <Button
              size="sm"
              className={styles.searchButton}
              onClick={closeDrawer}
            >
              Найти
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
            <Link
              href="/companies"
              className={`${styles.navLink} ${
                isActive("/companies") ? styles.activeLink : ""
              }`}
            >
              Компании
            </Link>
            <Link
              href="/salaries"
              className={`${styles.navLink} ${
                isActive("/salaries") ? styles.activeLink : ""
              }`}
            >
              Зарплаты
            </Link>

            {isLoggedIn ? (
              <div className={styles.profileSection}>
                <DropdownMenu>
                  <DropdownMenuTrigger className={styles.profileTrigger}>
                    <User size={18} className={styles.navIcon} />
                    <span>Профиль</span>
                    <ChevronDown size={16} className={styles.chevron} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={styles.profileDropdown}>
                    <DropdownMenuItem className={styles.profileItem}>
                      <div className={styles.profileInfo}>
                        <span className={styles.userName}>Иван Иванов</span>
                        <span className={styles.userEmail}>
                          ivan@example.com
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <Link href="/profile" className={styles.profileLink}>
                      <DropdownMenuItem>
                        <User size={16} className={styles.menuIcon} />
                        Мой профиль
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      href="/profile/reviews"
                      className={styles.profileLink}
                    >
                      <DropdownMenuItem>
                        <FileText size={16} className={styles.menuIcon} />
                        Мои отзывы
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      href="/profile/salaries"
                      className={styles.profileLink}
                    >
                      <DropdownMenuItem>
                        <DollarSign size={16} className={styles.menuIcon} />
                        Мои зарплаты
                      </DropdownMenuItem>
                    </Link>
                    <div className={styles.dropdownDivider}></div>
                    <Link href="/profile/add">
                      <Button size="sm" className={styles.reviewButton}>
                        Оставить отзыв
                      </Button>
                    </Link>
                    <div className={styles.dropdownDivider}></div>
                    <DropdownMenuItem
                      onClick={toggleLogin}
                      className={styles.logoutItem}
                    >
                      <LogOut size={16} className={styles.menuIcon} />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={styles.loginButton}
                  >
                    Войти
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className={styles.registerButton}>
                    Регистрация
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLogin}
                  className={styles.demoButton}
                >
                  (Demo: Log in)
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Navigation Drawer */}
          <div className={styles.mobileNav}>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button className={styles.menuToggle} onClick={toggleMenu}>
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className={styles.mobileMenu}>
                <SheetHeader className={styles.mobileMenuHeader}>
                  <SheetTitle className={styles.mobileLogo}>iWork</SheetTitle>
                </SheetHeader>

                <div className={styles.mobileMenuContent}>
                  <div className={styles.mobileMenuPrimary}>
                    <Link
                      href="/companies"
                      className={`${styles.mobileMenuItem} ${
                        isActive("/companies")
                          ? styles.mobileMenuItemActive
                          : ""
                      }`}
                      onClick={closeDrawer}
                    >
                      <Building size={20} />
                      <span>Компании</span>
                    </Link>
                    <Link
                      href="/salaries"
                      className={`${styles.mobileMenuItem} ${
                        isActive("/salaries") ? styles.mobileMenuItemActive : ""
                      }`}
                      onClick={closeDrawer}
                    >
                      <BarChart2 size={20} />
                      <span>Зарплаты</span>
                    </Link>
                  </div>

                  <div className={styles.mobileMenuDivider}></div>

                  {isLoggedIn ? (
                    <div className={styles.mobileMenuSecondary}>
                      <div className={styles.mobileProfileInfo}>
                        <User size={24} className={styles.mobileProfileIcon} />
                        <div>
                          <div className={styles.mobileUserName}>
                            Иван Иванов
                          </div>
                          <div className={styles.mobileUserEmail}>
                            ivan@example.com
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/profile"
                        className={`${styles.mobileMenuItem} ${
                          isActive("/profile")
                            ? styles.mobileMenuItemActive
                            : ""
                        }`}
                        onClick={closeDrawer}
                      >
                        <User size={20} />
                        <span>Мой профиль</span>
                      </Link>
                      <Link
                        href="/profile/reviews"
                        className={`${styles.mobileMenuItem} ${
                          isActive("/profile/reviews")
                            ? styles.mobileMenuItemActive
                            : ""
                        }`}
                        onClick={closeDrawer}
                      >
                        <FileText size={20} />
                        <span>Мои отзывы</span>
                      </Link>
                      <Link
                        href="/profile/salaries"
                        className={`${styles.mobileMenuItem} ${
                          isActive("/profile/salaries")
                            ? styles.mobileMenuItemActive
                            : ""
                        }`}
                        onClick={closeDrawer}
                      >
                        <DollarSign size={20} />
                        <span>Мои зарплаты</span>
                      </Link>

                      <Link href="/profile/add" onClick={closeDrawer}>
                        <Button className={styles.mobileAddButton}>
                          Оставить отзыв
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        className={styles.mobileLogoutButton}
                        onClick={toggleLogin}
                      >
                        <LogOut size={18} />
                        <span>Выйти</span>
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.mobileAuthButtons}>
                      <Link href="/auth/login" onClick={closeDrawer}>
                        <Button
                          variant="outline"
                          className={styles.mobileLoginButton}
                        >
                          Войти
                        </Button>
                      </Link>
                      <Link href="/auth/register" onClick={closeDrawer}>
                        <Button className={styles.mobileRegisterButton}>
                          Регистрация
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
