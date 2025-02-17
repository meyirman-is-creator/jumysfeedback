"use client";

import React from "react";
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
} from "@mui/material";
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (!valid) return;

    // Логика входа (например, запрос к серверу)

    // После успешного входа делаем редирект на главную страницу "/"
    router.push("/");
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (usernameError && e.target.value.trim() !== "") {
              setUsernameError(false);
            }
          }}
          error={usernameError}
          helperText={usernameError ? "Username is required" : ""}
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
        />

        <FormControlLabel
          control={<Checkbox className={styles["login-page__checkbox"]} />}
          label="Remember me"
          className={styles["login-page__remember"]}
        />

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
