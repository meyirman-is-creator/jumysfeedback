
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = true; // Replace with actual auth check logic

  const menuItems = [
    {
      label: "Мой профиль",
      href: "/profile",
      icon: <User size={20} />,
      active: pathname === "/profile",
    },
    {
      label: "Мои отзывы",
      href: "/profile/reviews",
      icon: <FileText size={20} />,
      active: pathname === "/profile/reviews",
    },
    {
      label: "Мои зарплаты",
      href: "/profile/salaries",
      icon: <DollarSign size={20} />,
      active: pathname === "/profile/salaries",
    },
    {
      label: "Добавить контент",
      href: "/profile/add",
      icon: <PlusCircle size={20} />,
      active: pathname === "/profile/add",
    },
  ];

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
              {isAdmin ? "Администратор" : "Пользователь"}
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
              <Link href="/auth/logout" className={styles.menuItem}>
                <span className={styles.menuIcon}>
                  <LogOut size={20} />
                </span>
                Выйти
              </Link>
            </ListItem>
          </List>
        </Box>

        <Box className={styles.content}>{children}</Box>
      </Box>
    </Container>
  );
}
