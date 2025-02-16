"use client";

import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Логика входа
  };

  return (
    <Container maxWidth="sm" className={styles["login-page"]}>
      <Typography variant="h4" className={styles["login-page__title"]}>
        LOGO
      </Typography>
      <Typography variant="h6" className={styles["login-page__subtitle"]}>
        Customer Login
      </Typography>

      <Box
        component="form"
        className={styles["login-page__form"]}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          className={styles["login-page__input"]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          className={styles["login-page__input"]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <Box className={styles["login-page__forgot-password"]}>
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </Box>

        <Button
          variant="contained"
          type="submit"
          className={styles["login-page__submit"]}
        >
          LOGIN
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push("/auth/register")}
          className={styles["login-page__signup"]}
        >
          SIGN UP
        </Button>
      </Box>
    </Container>
  );
}
