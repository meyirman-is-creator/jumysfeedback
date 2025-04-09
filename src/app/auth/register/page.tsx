"use client";

import React, { useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./RegisterPage.module.scss";
import { useRegister } from "@/hooks/useAuthQuery";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isLoading, error: registerError, isSuccess } = useRegister();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Если регистрация успешна, перенаправляем на страницу подтверждения email
  useEffect(() => {
    if (isSuccess) {
      router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
    }
  }, [isSuccess, router, email]);

  const validateForm = () => {
    let isValid = true;

    // Validation for first name
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validation for last name
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    // Validation for email - используем формат RFC5322
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validation for password - минимум 8 символов, одна цифра и заглавная буква
    if (password === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one digit");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validation for confirm password - должен совпадать с password
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

    if (!validateForm()) return;

    // Вызываем хук регистрации
    register({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
  };

  // Обработчики для OAuth
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleLinkedInSignIn = () => {
    signIn('linkedin', { callbackUrl: '/' });
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
          label="First Name"
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (e.target.value.trim() !== "") {
              setFirstNameError("");
            }
          }}
          error={Boolean(firstNameError)}
          helperText={firstNameError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          disabled={isLoading}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (e.target.value.trim() !== "") {
              setLastNameError("");
            }
          }}
          error={Boolean(lastNameError)}
          helperText={lastNameError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          disabled={isLoading}
        />

        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value.trim() !== "") {
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

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value !== "") {
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
          disabled={isLoading}
        />

        <TextField
          label="Confirm password"
          type={showConfirmPassword ? "text" : "password"}
          variant="outlined"
          required
          fullWidth
          className={styles["register-page__input"]}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (e.target.value !== "") {
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
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={isLoading}
        />

        <Button
          variant="contained"
          type="submit"
          className={styles["register-page__submit"]}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push("/auth/login")}
          className={styles["register-page__signin"]}
          disabled={isLoading}
        >
          Sign In
        </Button>

        {/* Добавляем OAuth кнопки */}
        <Typography align="center" variant="body2" sx={{ mt: 2, mb: 1 }}>
          Or sign up with
        </Typography>
        
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleGoogleSignIn} 
          sx={{ mb: 1 }}
        >
          Sign up with Google
        </Button>
        
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleLinkedInSignIn}
        >
          Sign up with LinkedIn
        </Button>
      </Box>
    </Container>
  );
}