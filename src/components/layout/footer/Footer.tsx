"use client"; // Если используете новый App Router в Next.js

import {
  Box,
  Typography,
  Divider,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import {
  FaAndroid,
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { TbBrandX } from "react-icons/tb"; // пример иконки «X»
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <>
      <Divider sx={{ mt: 4 }} />
      <Box className={styles.footer}>
        <Box className={styles.topSection}>
          {/* Левая колонка (Логотип) */}
          <Box className={styles.column}>
            <Typography variant="h6" className={styles.logo}>
              LOGO
            </Typography>
          </Box>

          {/* Средняя колонка (Iwork) */}
          <Box className={styles.column}>
            <Typography variant="subtitle1" className={styles.columnTitle}>
              Iwork
            </Typography>
            <Link href="#">About / Press</Link>
            <Link href="#">Contact Us</Link>
          </Box>

          {/* Правая колонка (Information) */}
          <Box className={styles.column}>
            <Typography variant="subtitle1" className={styles.columnTitle}>
              Information
            </Typography>
            <Link href="#">Help</Link>
            <Link href="#">Terms of Use</Link>
            <Link href="#">Privacy &amp; Ad Choices</Link>
          </Box>
        </Box>

        {/* Нижняя часть футера */}
        <Box className={styles.bottomSection}>
          {/* Левая часть (Download the App) */}
          <Box className={styles.downloadSection}>
            <Typography variant="body2" className={styles.downloadText}>
              Download the App
            </Typography>
            <Box className={styles.iconRow}>
              <IconButton>
                <FaAndroid />
              </IconButton>
              <IconButton>
                <FaApple />
              </IconButton>
            </Box>
          </Box>

          {/* Центр (Соцсети) */}
          <Box className={styles.socialSection}>
            <IconButton>
              <FaUser />
            </IconButton>
            <IconButton>
              <FaSearch />
            </IconButton>
            <IconButton>
              <FaFacebookF />
            </IconButton>
            <IconButton>
              <TbBrandX />
            </IconButton>
            <IconButton>
              <FaInstagram />
            </IconButton>
            <IconButton>
              <FaTiktok />
            </IconButton>
            <IconButton>
              <BsYoutube />
            </IconButton>
          </Box>

          {/* Правая часть (Регион) */}
          <Box className={styles.regionSection}>
            <Select value="Kazakhstan" className={styles.regionSelect}>
              <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
    </>
  );
}
