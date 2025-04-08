"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { CheckCircleOutline, Email } from "@mui/icons-material";
import styles from "./VerifyEmailPage.module.scss";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const directToken = searchParams.get("token"); // If user comes directly from email link
  
  const [token, setToken] = useState(directToken || "");
  const [isVerifying, setIsVerifying] = useState(!!directToken);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [remainingTime, setRemainingTime] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // For the 6-digit code entry
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle direct token verification
  useEffect(() => {
    if (directToken) {
      verifyToken(directToken);
    }
  }, [directToken]);

  // Handle countdown timer for resend
  useEffect(() => {
    if (!canResend && remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (remainingTime === 0) {
      setCanResend(true);
    }
  }, [remainingTime, canResend]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;
    
    const newCode = [...verificationCode];
    
    // If pasting a full code
    if (value.length > 1) {
      const digits = value.split("").slice(0, 6);
      const newFullCode = [...verificationCode];
      
      digits.forEach((digit, idx) => {
        if (idx < 6) {
          newFullCode[idx] = digit;
        }
      });
      
      setVerificationCode(newFullCode);
      
      // Focus on the appropriate input
      if (digits.length < 6 && inputRefs.current[digits.length]) {
        inputRefs.current[digits.length]?.focus();
      }
      return;
    }
    
    // Handle single digit input
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && index > 0 && verificationCode[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyToken = async (tokenValue: string) => {
    setIsVerifying(true);
    setError("");
    
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenValue }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }
      
      // Success
      setVerified(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      
    } catch (error) {
      console.error('Verification error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during verification');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerify = () => {
    const codeString = verificationCode.join("");
    
    if (codeString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    
    verifyToken(codeString);
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setRemainingTime(60);
    setError("");
    
    try {
      // Call API to resend verification code
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification code');
      }
      
    } catch (error) {
      console.error('Resend error:', error);
      setError(error instanceof Error ? error.message : 'Failed to resend verification code');
      setCanResend(true);
    }
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Box className={styles.formWrapper}>
          <Box className={styles.logoContainer}>
            <Typography variant="h4" className={styles.logo}>
              IWork
            </Typography>
          </Box>

          {verified ? (
            <Box className={styles.successContainer}>
              <CheckCircleOutline className={styles.successIcon} />
              
              <Typography variant="h5" className={styles.title}>
                Email Verified Successfully
              </Typography>
              
              <Typography variant="body1" className={styles.message}>
                Your email has been successfully verified. You will be redirected to the login page shortly.
              </Typography>
              
              <Button
                component={Link}
                href="/auth/login"
                fullWidth
                variant="contained"
                className={styles.loginButton}
              >
                Go to Login
              </Button>
            </Box>
          ) : isVerifying ? (
            <Box className={styles.loadingContainer}>
              <CircularProgress size={60} className={styles.loader} />
              <Typography variant="h6" className={styles.loadingText}>
                Verifying your email...
              </Typography>
            </Box>
          ) : (
            <>
              <Box className={styles.emailIconContainer}>
                <Email className={styles.emailIcon} />
              </Box>
              
              <Typography variant="h5" className={styles.title}>
                Verify Your Email
              </Typography>
              
              <Typography variant="body1" className={styles.subtitle}>
                We've sent a verification code to
                <Box component="span" fontWeight="bold"> {email}</Box>
              </Typography>
              
              {error && (
                <Alert severity="error" className={styles.alert}>
                  {error}
                </Alert>
              )}
              
              <Box className={styles.codeContainer}>
                {verificationCode.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    variant="outlined"
                    className={styles.codeInput}
                    inputProps={{
                      maxLength: 1,
                      className: styles.codeInputField,
                    }}
                    autoFocus={index === 0}
                    onFocus={(e) => e.target.select()}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasteData = e.clipboardData.getData('text');
                      handleCodeChange(index, pasteData);
                    }}
                  />
                ))}
              </Box>
              
              <Box className={styles.actions}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleVerify}
                  className={styles.verifyButton}
                  disabled={verificationCode.some(digit => digit === '')}
                >
                  Verify Email
                </Button>
                
                <Box className={styles.resendContainer}>
                  <Typography variant="body2" className={styles.resendText}>
                    Didn't receive the code?
                  </Typography>
                  <Button
                    onClick={handleResendCode}
                    disabled={!canResend}
                    className={styles.resendButton}
                  >
                    {canResend ? "Resend Code" : `Resend code in ${remainingTime}s`}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}