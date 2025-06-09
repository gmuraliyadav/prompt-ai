
import React from 'react';

interface TextAreaInputProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  onChange,
  placeholder,
  rows = 5,
  readOnly = false,
  disabled = false,
  className = '',
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      readOnly={readOnly}
      disabled={disabled}
      className={`w-full p-3 sm:p-4 border rounded-lg shadow-sm transition-colors duration-200
                  bg-slate-800 border-slate-700 text-gray-200 placeholder-gray-500 
                  focus:ring-2 focus:ring-opacity-50 focus:outline-none
                  disabled:bg-slate-700 disabled:cursor-not-allowed
                  ${readOnly ? 'cursor-default select-all' : ''}
                  ${className}`}
    />
  );
};
