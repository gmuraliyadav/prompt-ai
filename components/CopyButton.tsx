
import React, { useState, useCallback } from 'react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);


export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className = '' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // You could add user feedback for error here
    }
  }, [textToCopy]);

  return (
    <button
      onClick={handleCopy}
      disabled={!textToCopy || isCopied}
      className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                  transition-colors duration-150 ease-in-out
                  flex items-center
                  ${isCopied 
                    ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500' 
                    : 'bg-slate-600 hover:bg-slate-500 text-gray-200 focus:ring-sky-500'}
                  disabled:opacity-70 disabled:cursor-not-allowed
                  ${className}`}
    >
      {isCopied ? (
        <>
          <CheckIcon className="mr-2" /> Copied!
        </>
      ) : (
        <>
          <ClipboardIcon className="mr-2" /> Copy Prompt
        </>
      )}
    </button>
  );
};
