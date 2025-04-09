"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./VerificationPage.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { authAPI } from "@/services/apiClient";

export default function VerificationPage() {
  const router = useRouter();
  const { verify, isLoading, error, clearAuthError, verificationEmail } = useAuth();

  // State for the verification code (6 digits)
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  // References for the code input fields
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Focus the first input when component mounts
  useEffect(() => {
    if (inputRefs[0]?.current) {
      inputRefs[0].current.focus();
    }
  }, []);

  // Redirect if no verification email is set
  useEffect(() => {
    // Check for token in URL
    const searchParams = new URLSearchParams(window.location.search);
    const tokenFromURL = searchParams.get('token');
    
    if (tokenFromURL) {
      // If token is in URL, automatically verify
      handleVerifyWithToken(tokenFromURL);
    } else if (!verificationEmail) {
      // If no token and no verification email, redirect to register
      router.push('/auth/register');
    }
  }, [verificationEmail, router]);

  // Handle countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);


  const handleVerifyWithToken = async (token: string) => {
    setIsVerifying(true);
    setVerificationError("");
    
    try {
      const success = await verify(token);
      if (success) {
        setSuccessMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setVerificationError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setVerificationError("An error occurred during verification. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    // Check if input is a digit
    if (!/^\d*$/.test(value)) return;

    // Update the code state
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus to the next input or submit if all filled
    if (value && index < 5) {
      inputRefs[index + 1]?.current?.focus();
    } else if (value && index === 5) {
      // All digits entered, can auto-submit if needed
      handleVerifyCode();
    }
  };

  // Handle key press for backspace
  const handleKeyDown = (
    index: number, 
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    // Explicitly type cast the event
    const event = e as React.KeyboardEvent<HTMLInputElement>;
    
    // If backspace is pressed and current input is empty, focus to the previous input
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    
    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setCode(digits);
      
      // Focus the last input
      inputRefs[5]?.current?.focus();
    }
  };

  // Handle verification
  const handleVerifyCode = async () => {
    const verificationCode = code.join("");
    
    // Check if code is complete
    if (verificationCode.length !== 6) {
      setVerificationError("Please enter all 6 digits of the verification code");
      return;
    }
    
    setIsVerifying(true);
    setVerificationError("");
    
    try {
      const success = await verify(verificationCode);
      if (success) {
        setSuccessMessage("Email verified successfully! Redirecting to login...");
        // Redirect after a short delay
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setVerificationError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setVerificationError("An error occurred during verification. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resending verification code
  const handleResendCode = async () => {
    if (resendDisabled) return;
    
    setResendDisabled(true);
    setCountdown(60); // 60 seconds cooldown
    
    try {
      if (verificationEmail) {
        // You need to implement a resend verification endpoint
        await authAPI.forgotPassword(verificationEmail);
        setSuccessMessage("Verification code resent. Please check your email.");
      } else {
        setVerificationError("Email address not found. Please register again.");
      }
    } catch (error) {
      setVerificationError("Failed to resend verification code. Please try again later.");
    }
  };

  return (
    <Container maxWidth="sm" className={styles["verification-page"]}>
      <Typography variant="h4" className={styles["verification-page__title"]}>
        LOGO
      </Typography>
      <Typography variant="h6" className={styles["verification-page__subtitle"]}>
        Email Verification
      </Typography>

      {verificationEmail && (
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          We've sent a verification code to <strong>{verificationEmail}</strong>
        </Typography>
      )}

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={clearAuthError}
        >
          {typeof error === 'string' ? error : 'Verification failed. Please try again.'}
        </Alert>
      )}

      {verificationError && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setVerificationError("")}
        >
          {verificationError}
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

      <Box className={styles["verification-page__form"]}>
        <Box className={styles["verification-page__code-container"]}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              inputRef={inputRefs[index]}
              className={styles["verification-page__code-input"]}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' }
              }}
              disabled={isVerifying || isLoading}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={handleVerifyCode}
          className={styles["verification-page__verify-button"]}
          disabled={isVerifying || isLoading || code.some(digit => !digit)}
        >
          {isVerifying || isLoading ? <CircularProgress size={24} color="inherit" /> : "Verify Email"}
        </Button>

        <Box className={styles["verification-page__resend-container"]}>
          <Button
            variant="text"
            onClick={handleResendCode}
            className={styles["verification-page__resend-button"]}
            disabled={resendDisabled || isVerifying || isLoading}
          >
            Resend verification code
          </Button>
          
          {resendDisabled && (
            <Typography className={styles["verification-page__timer"]}>
              Resend available in {countdown} seconds
            </Typography>
          )}
        </Box>

        <Button
          variant="outlined"
          onClick={() => router.push("/auth/login")}
          className={styles["verification-page__back-button"]}
          disabled={isVerifying || isLoading}
        >
          Back to Login
        </Button>
      </Box>
    </Container>
  );
}