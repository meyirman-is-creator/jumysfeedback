"use client";

import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./RegisterPage.module.scss";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [usernameError, setUsernameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    // Validation for username
    if (username.trim() === "") {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Validation for email
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validation for password
    if (password === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8 || password.length > 20) {
      setPasswordError("Password must be between 8 and 20 characters");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one digit");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validation for confirm password
    if (confirmPassword === "") {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!isValid) return;

    // Registration logic (e.g., API call) goes here
    // After successful registration, navigate to the home page
    router.push("/");
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (e.target.value.trim() !== "") {
              setUsernameError("");
            }
          }}
          error={Boolean(usernameError)}
          helperText={usernameError}
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
