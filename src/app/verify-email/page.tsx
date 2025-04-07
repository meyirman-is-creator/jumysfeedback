"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmailRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // Redirect to the verification page with the token
    if (token) {
      router.push(`/auth/verify?token=${token}`);
    } else {
      // If no token, redirect to registration
      router.push('/auth/register');
    }
  }, [token, router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column'
    }}>
      <h2>Redirecting...</h2>
      <p>Please wait while we redirect you to the verification page.</p>
    </div>
  );
}