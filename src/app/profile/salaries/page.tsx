// app/salaries/page.tsx
import { Suspense } from 'react';
import SalariesClient from './SalariesClient';

export default function SalariesPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-[50vh] flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin text-[#800000] mb-4" />
          <p className="text-xl font-medium">Загрузка данных о зарплатах...</p>
        </div>
      </div>
    }>
      <SalariesClient />
    </Suspense>
  );
}