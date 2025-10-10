"use client";

import { useEffect, useState } from 'react';

export const LoadingSpinner = ({ size = 'md', text = 'Cargando...' }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
      {text && (
        <p className="mt-2 text-sm text-gray-600">
          {text}{dots}
        </p>
      )}
    </div>
  );
};

export const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="lg" text="Cargando página" />
  </div>
);

export const InlineLoading = ({ text }) => (
  <div className="flex items-center justify-center py-4">
    <LoadingSpinner size="sm" text={text} />
  </div>
);

