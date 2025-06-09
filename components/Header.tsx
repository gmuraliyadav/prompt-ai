
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl text-center py-6 sm:py-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">
        PromptCraft AI
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-gray-400">
        Transforming Raw Ideas into Powerful, Precision-Engineered AI Prompts
      </p>
    </header>
  );
};
