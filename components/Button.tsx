
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-6 py-2.5 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75
                  transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                  flex items-center justify-center
                  ${className}`}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
};
