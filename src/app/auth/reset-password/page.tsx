"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ResetPasswordPage.module.scss";
import { useResetPassword } from "@/hooks/useAuthQuery";

// Функции для оценки силы пароля (сохраняем существующие функции)
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  return Math.min(5, strength);
};

const getStrengthLabel = (strength: number): string => {
  const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  return labels[strength - 1] || "Weak";
};

const getStrengthColor = (strength: number): string => {
  const colors = ["#f44336", "#ff9800", "#ffeb3b", "#4caf50", "#2e7d32"];
  return colors[strength - 1] || "#f44336";
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { 
    mutate: resetPassword, 
    isLoading, 
    error: apiError, 
    isSuccess 
  } = useResetPassword();

  // Редирект, если нет токена в URL
  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);
  
  // Обновляем силу пароля при его изменении
  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setPasswordStrength(0);
    }
  }, [password]);
  
  // Редирект после успешного сброса пароля
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
  }, [isSuccess, router]);
  
  const validateForm = () => {
    let isValid = true;
    
    // Проверка пароля
    if (password === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one digit");
      isValid = false;
    } else if (passwordStrength < 3) {
      setPasswordError("Password is too weak");
      isValid = false;
    } else {
      setPasswordError("");
    }
    
    // Проверка подтверждения пароля
    if (confirmPassword === "") {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }
    
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm() || !token) return;
    
    // Сбрасываем пароль
    resetPassword({
      token,
      new_password: password
    });
  };
  
  return (
    <Container maxWidth="sm" className={styles["reset-password-page"]}>
      <Typography variant="h4" className={styles["reset-password-page__title"]}>
        LOGO
      </Typography>
      <Typography variant="h6" className={styles["reset-password-page__subtitle"]}>
        Reset Password
      </Typography>
      
    
      
      {isSuccess && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
        >
          Your password has been reset successfully. Redirecting to login page...
        </Alert>
      )}
      
      <Box
        component="form"
        className={styles["reset-password-page__form"]}
        onSubmit={handleSubmit}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Create a new password for your account.
        </Typography>
        
        <TextField
          label="New Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          className={styles["reset-password-page__input"]}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) {
              setPasswordError("");
            }
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={isLoading || isSuccess}
        />
        
        {password && (
          <Box className={styles["reset-password-page__password-strength"]}>
            <LinearProgress
              variant="determinate"
              value={(passwordStrength / 5) * 100}
              sx={{ 
                height: 4, 
                borderRadius: 2, 
                backgroundColor: "#f0f0f0",
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getStrengthColor(passwordStrength)
                }
              }}
            />
            <Typography 
              variant="caption" 
              className={styles["reset-password-page__strength-text"]}
              sx={{ color: getStrengthColor(passwordStrength) }}
            >
              Password Strength: {passwordStrength > 0 ? getStrengthLabel(passwordStrength) : "Very Weak"}
            </Typography>
          </Box>
        )}
        
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          className={styles["reset-password-page__input"]}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (confirmPasswordError) {
              setConfirmPasswordError("");
            }
          }}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={isLoading || isSuccess}
        />
        
        <Button
          variant="contained"
          type="submit"
          className={styles["reset-password-page__submit"]}
          disabled={isLoading || isSuccess}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => router.push("/auth/login")}
          className={styles["reset-password-page__back"]}
          disabled={isLoading}
        >
          Back to Login
        </Button>
      </Box>
    </Container>
  );
}