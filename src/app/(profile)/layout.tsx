// src/app/(profile)/layout.tsx - FULL FILE WITH CHANGES

"use client"; // CHANGE: Make sure "use client" directive is at the top

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Avatar,
} from "@mui/material";
import {
  User,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";
import styles from "./ProfileLayout.module.scss";
import { useAuth } from "@/hooks/useAuth"; // CHANGE: Import useAuth

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter(); // CHANGE: Add router
  const { isAuthenticated, logout } = useAuth(); // CHANGE: Use auth hook
  const isAdmin = true; // Replace with actual auth check logic

  // CHANGE: Add authentication check
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  // CHANGE: Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      label: "Мой профиль",
      href: "/profile",
      icon: <User size={20} />,
      active: pathname === "/profile",
    },
    {
      label: "Мои отзывы",
      href: "/reviews",
      icon: <FileText size={20} />,
      active: pathname === "/reviews",
    },
    {
      label: "Мои зарплаты",
      href: "/salaries",
      icon: <DollarSign size={20} />,
      active: pathname === "/salaries",
    },
    {
      label: "Добавить контент",
      href: "/add",
      icon: <PlusCircle size={20} />,
      active: pathname === "/add",
    },
  ];

  // CHANGE: Add logout handler
  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <Container maxWidth="lg" className={styles.profileLayout}>
      <Box className={styles.profileGrid}>
        <Box className={styles.sidebar}>
          <Box className={styles.userInfo}>
            <Avatar
              src="/images/avatar-placeholder.jpg"
              alt="User profile"
              className={styles.avatar}
            />
            <Typography variant="h6" className={styles.userName}>
              John Doe
            </Typography>
            <Typography variant="body2" className={styles.userRole}>
              {!isAdmin ? "Администратор" : "Пользователь"}
            </Typography>
          </Box>

          <Divider className={styles.divider} />

          <List className={styles.menuList}>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <Link
                  href={item.href}
                  className={`${styles.menuItem} ${
                    item.active ? styles.activeMenuItem : ""
                  }`}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              </ListItem>
            ))}

            <Divider className={styles.divider} sx={{ my: 2 }} />

            <ListItem disablePadding>
              {/* CHANGE: Replace Link with Box for logout */}
              <Box
                component="div"
                className={styles.menuItem}
                onClick={handleLogout}
                sx={{ cursor: "pointer" }}
              >
                <span className={styles.menuIcon}>
                  <LogOut size={20} />
                </span>
                Выйти
              </Box>
            </ListItem>
          </List>
        </Box>

        <Box className={styles.content}>{children}</Box>
      </Box>
    </Container>
  );
}