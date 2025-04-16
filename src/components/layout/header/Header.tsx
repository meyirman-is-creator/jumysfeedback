// src/components/layout/header/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  ChevronDown,
  FileText,
  DollarSign,
  LogOut,
  Building,
  BarChart2,
} from "lucide-react";
import styles from "./Header.module.scss";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user, isAuthenticated, logoutUser } = useAuth();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check if the given path is active
  const isActive = (path: string) => {
    if (path === "/companies") {
      return pathname === "/companies" || pathname?.startsWith("/companies/");
    }
    return pathname === path;
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    closeDrawer();
    
    router.push("/auth/login");
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

            {isAuthenticated ? (
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
                        <span className={styles.userName}>
                          {user?.fullName}
                        </span>
                        <span className={styles.userEmail}>
                          {user?.email}
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
                      onClick={handleLogout}
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

                  {isAuthenticated ? (
                    <div className={styles.mobileMenuSecondary}>
                      <div className={styles.mobileProfileInfo}>
                        <User size={24} className={styles.mobileProfileIcon} />
                        <div>
                          <div className={styles.mobileUserName}>
                            {user?.fullName}
                          </div>
                          <div className={styles.mobileUserEmail}>
                            {user?.email}
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
                        onClick={handleLogout}
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
