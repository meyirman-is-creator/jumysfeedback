// src/components/layout/header/Header.tsx - FULL FILE WITH CHANGES

"use client"; 

import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, Avatar } from "@mui/material";
import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "./Header.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import ClientOnly from '@/components/ClientOnly';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    router.push("/auth/login");
  };

  const handleProfileClick = () => {
    handleClose();
    router.push("/profile");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #e1e1e1",
      }}
    >
      <Toolbar className={styles.header}>
        <Typography variant="h6" className={styles.logo}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            LOGO
          </Link>
        </Typography>
        <Box className={styles.nav}>
          <Link href="/companies" className={styles.link}>
            Companies
          </Link>
          <Link href="/salary-explorer" className={styles.link}>
            Salaries
          </Link>
          <Link href="/search" className={styles.link}>
            <FaSearch className={styles.icon} /> Search
          </Link>
          
          {/* CHANGE: Use ClientOnly for code that depends on isAuthenticated */}
          <ClientOnly 
            fallback={
              <span className={styles.link}>
                <FaUser className={styles.icon} />
              </span>
            }
          >
            {isAuthenticated ? (
              <>
                <Box
                  component="div"
                  onClick={handleClick}
                  className={styles.link}
                  style={{ cursor: 'pointer' }}
                >
                  {user?.profile_image ? (
                    <Avatar 
                      src={user.profile_image} 
                      alt={`${user.first_name || ''} ${user.last_name || ''}`}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <FaUser className={styles.icon} />
                  )}
                </Box>
                
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/auth/login" className={styles.link}>
                <FaUser className={styles.icon} />
              </Link>
            )}
          </ClientOnly>
        </Box>
      </Toolbar>
    </AppBar>
  );
}