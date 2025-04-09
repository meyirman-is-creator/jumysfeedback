"use client";

import React, { useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.scss";
import { useLogin } from "@/hooks/useAuthQuery";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isLoading, error: loginError, isSuccess } = useLogin();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  // Если логин успешен, перенаправляем на главную
  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  const validateForm = () => {
    let valid = true;

    if (username.trim() === "") {
      setUsernameError(true);
      valid = false;
    } else {
      setUsernameError(false);
    }

    if (password.trim() === "") {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Используем хук для логина
    login({ username, password });
  };

  // Обработчики для OAuth
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleLinkedInSignIn = () => {
    signIn('linkedin', { callbackUrl: '/' });
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
          label="Email"
          variant="outlined"
          fullWidth
          required
          className={styles["login-page__input"]}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (usernameError && e.target.value.trim() !== "") {
              setUsernameError(false);
            }
          }}
          error={usernameError}
          helperText={usernameError ? "Email is required" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          disabled={isLoading}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          className={styles["login-page__input"]}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError && e.target.value.trim() !== "") {
              setPasswordError(false);
            }
          }}
          error={passwordError}
          helperText={passwordError ? "Password is required" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={isLoading}
        />

        <FormControlLabel
          control={
            <Checkbox 
              className={styles["login-page__checkbox"]} 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
          }
          label="Remember me"
          className={styles["login-page__remember"]}
        />

        <Button
          variant="contained"
          type="submit"
          className={styles["login-page__submit"]}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "LOGIN"}
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push("/auth/register")}
          className={styles["login-page__signup"]}
          disabled={isLoading}
        >
          SIGN UP
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              cursor: 'pointer', 
              textDecoration: 'underline',
              color: '#800000',
              '&:hover': {
                color: '#660000'
              }
            }}
            onClick={() => router.push('/auth/forgot-password')}
          >
            Forgot Password?
          </Typography>
        </Box>

        {/* Добавляем OAuth кнопки */}
        <Typography align="center" variant="body2" sx={{ mt: 2, mb: 1 }}>
          Or login with
        </Typography>
        
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleGoogleSignIn} 
          sx={{ mb: 1 }}
        >
          Login with Google
        </Button>
        
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleLinkedInSignIn}
        >
          Login with LinkedIn
        </Button>
      </Box>
    </Container>
  );
}