// app/auth/login/page.tsx
"use client"
import React from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  return (
    <Container maxWidth="sm" className={styles['login-page']}>
      <Typography variant="h4" className={styles['login-page__title']}>
        Login
      </Typography>

      <Box
        component="form"
        className={styles['login-page__form']}
        onSubmit={(e) => {
          e.preventDefault();
          // handle login logic
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          className={styles['login-page__input']}
          fullWidth
          required
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          className={styles['login-page__input']}
          fullWidth
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={styles['login-page__submit']}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};
