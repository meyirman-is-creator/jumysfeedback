"use client";

import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./ForgotPasswordPage.module.scss";
import { authAPI } from "@/services/apiClient";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      await authAPI.forgotPassword(email);
      setSuccessMessage("Password reset instructions have been sent to your email. Please check your inbox.");
    } catch (error) {
      // Don't reveal whether the email exists in the system for security reasons
      setSuccessMessage("If your email is registered, you will receive password reset instructions. Please check your inbox.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className={styles["forgot-password-page"]}>
      <Typography variant="h4" className={styles["forgot-password-page__title"]}>
        LOGO
      </Typography>
      <Typography variant="h6" className={styles["forgot-password-page__subtitle"]}>
        Forgot Password
      </Typography>

      {errorMessage && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
        >
          {successMessage}
        </Alert>
      )}

      <Box
        component="form"
        className={styles["forgot-password-page__form"]}
        onSubmit={handleSubmit}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Enter your email address and we'll send you instructions to reset your password.
        </Typography>
        
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          className={styles["forgot-password-page__input"]}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError && e.target.value.trim() !== "") {
              setEmailError("");
            }
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          disabled={isLoading}
        />

        <Button
          variant="contained"
          type="submit"
          className={styles["forgot-password-page__submit"]}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Instructions"}
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push("/auth/login")}
          className={styles["forgot-password-page__back"]}
          disabled={isLoading}
        >
          Back to Login
        </Button>
      </Box>
    </Container>
  );
}