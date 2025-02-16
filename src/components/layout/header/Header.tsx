"use client"; // если используете новую файловую структуру Next.js (App Router)

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";
import styles from "./Header.module.scss";

export default function Header() {
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
          LOGO
        </Typography>
        <Box className={styles.nav}>
          <Link href="/companies" className={styles.link}>
            Companies
          </Link>
          <Link href="/salaries" className={styles.link}>
            Salaries
          </Link>
          <Link href="/search" className={styles.link}>
            <FaSearch className={styles.icon} /> Search
          </Link>
          <Link href="/profile" className={styles.link}>
            <FaUser className={styles.icon} />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
