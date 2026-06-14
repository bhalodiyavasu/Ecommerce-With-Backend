import React from 'react';
import AppRouter from '@/utils/AppRouter';
import { ToastProvider } from '@/contexts/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}
