
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-4xl text-center py-6 mt-auto">
      <p className="text-sm text-gray-500">
        A Project by <a href="https://www.linkedin.com/in/gmuraliyadav" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-400 underline">G. Murali Yadav</a>
      </p>
      <p className="text-xs text-gray-600 mt-1">
        AI Developer & Founder | Virtual Tech Talks
      </p>
    </footer>
  );
};
