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
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./RegisterPage.module.scss";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Логика регистрации
  };

  return (
    <Container maxWidth="sm" className={styles["register-page"]}>
      <Typography variant="h4" className={styles["register-page__title"]}>
        LOGO
      </Typography>
      <Typography variant="h6" className={styles["register-page__subtitle"]}>
        Customer Registration
      </Typography>

      <Box
        component="form"
        className={styles["register-page__form"]}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Username"
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm password"
          type="password"
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          type="submit"
          className={styles["register-page__submit"]}
        >
          Sign Up
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push("/auth/login")}
          className={styles["register-page__signin"]}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
