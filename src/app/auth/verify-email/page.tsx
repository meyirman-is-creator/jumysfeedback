"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Paper,
  Alert,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import styles from "./VerifyEmailPage.module.scss";
import { useVerifyEmail } from "@/hooks/useAuthQuery";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  
  const { mutate: verifyEmail, isLoading, isSuccess, error: verifyError } = useVerifyEmail();
  const [verified, setVerified] = useState(false);
  
  // Если токен есть в URL, автоматически верифицируем
  useEffect(() => {
    if (token) {
      verifyEmail(token, {
        onSuccess: () => {
          setVerified(true);
          // Редирект на логин после 3 секунд
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        }
      });
    }
  }, [token, verifyEmail, router]);

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Box className={styles.formWrapper}>
          <Box className={styles.logoContainer}>
            <Typography variant="h4" className={styles.logo}>
              IWork
            </Typography>
          </Box>

          {verified || isSuccess ? (
            <Box className={styles.successContainer}>
              <CheckCircleOutline className={styles.successIcon} />
              
              <Typography variant="h5" className={styles.title}>
                Email Verified Successfully
              </Typography>
              
              <Typography variant="body1" className={styles.message}>
                Your email has been successfully verified. You will be redirected to the login page shortly.
              </Typography>
              
              <Button
                fullWidth
                variant="contained"
                className={styles.loginButton}
                onClick={() => router.push('/auth/login')}
              >
                Go to Login
              </Button>
            </Box>
          
          ) : isLoading ? (
            <Box className={styles.loadingContainer}>
              <CircularProgress size={60} className={styles.loader} />
              <Typography variant="h6" className={styles.loadingText}>
                Verifying your email...
              </Typography>
            </Box>
          ) : (
            <>
              {/* Отображаем информацию о необходимости подтвердить email */}
              <Typography variant="h5" className={styles.title}>
                Please Verify Your Email
              </Typography>
              
              <Typography variant="body1" className={styles.subtitle}>
                We've sent a verification link to
                <Box component="span" fontWeight="bold"> {email}</Box>
              </Typography>
              
              {verifyError && (
                <Alert severity="error" className={styles.alert}>
                  {typeof verifyError === 'string' ? verifyError : 'Verification failed. Please try again.'}
                </Alert>
              )}
              
              <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                Please check your email and click on the verification link to activate your account.
                If you don't see the email, please check your spam folder.
              </Typography>
              
              <Box className={styles.actions}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => router.push('/auth/login')}
                  className={styles.verifyButton}
                >
                  Back to Login
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
  }