// app/verify-email/page.tsx
import React, { Suspense } from 'react';
import VerifyEmailPage from '@/app/auth/verify-email/page';

export default function VerifyEmail(): JSX.Element {
  return (  
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
}
