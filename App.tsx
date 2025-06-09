
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TextAreaInput } from './components/TextAreaInput';
import { Button } from './components/Button';
import { CopyButton } from './components/CopyButton';
import { enhancePromptWithGemini } from './services/geminiService';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [rawMessage, setRawMessage] = useState<string>('');
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhanceClick = useCallback(async () => {
    if (!rawMessage.trim()) {
      setError('Please enter your idea or message first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEnhancedPrompt('');

    try {
      const result = await enhancePromptWithGemini(rawMessage);
      setEnhancedPrompt(result);
    } catch (e: any) {
      console.error("Error enhancing prompt:", e);
      setError(e.message || 'Failed to enhance prompt. Please ensure your API key is configured and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [rawMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans antialiased">
      <Header />
      <main className="w-full max-w-4xl mt-8 mb-12 space-y-10 flex-grow">
        <section aria-labelledby="input-section-title" className="bg-slate-800/70 backdrop-blur-md p-6 rounded-xl shadow-2xl ring-1 ring-slate-700">
          <h2 id="input-section-title" className="text-2xl sm:text-3xl font-semibold text-sky-400 mb-3 sm:mb-5 flex items-center">
            <span className="mr-3 text-3xl sm:text-4xl">💡</span>
            Your Idea, Simply Stated
          </h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Enter your raw message, topic, or question. Even a few words can be transformed into a powerful prompt.
          </p>
          <TextAreaInput
            value={rawMessage}
            onChange={(e) => setRawMessage(e.target.value)}
            placeholder="e.g., 'write a story about a time traveling cat' or 'explain quantum entanglement simply'"
            rows={6}
            className="bg-slate-700/50 border-slate-600 focus:ring-sky-500 focus:border-sky-500 text-gray-100"
          />
          <div className="mt-6 text-right">
            <Button
              onClick={handleEnhanceClick}
              disabled={isLoading || !rawMessage.trim()}
              isLoading={isLoading}
              className="px-8 py-3 text-lg bg-sky-500 hover:bg-sky-600 disabled:bg-sky-800 text-white"
            >
              {isLoading ? 'Crafting...' : 'Enhance Prompt'}
            </Button>
          </div>
        </section>

        {isLoading && !enhancedPrompt && (
          <div className="flex justify-center items-center py-10">
            <LoadingSpinner />
            <p className="ml-4 text-xl text-gray-400">Generating your optimized prompt...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-800/60 border border-red-700 text-red-300 p-4 rounded-lg shadow-md animate-fadeIn" role="alert">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {enhancedPrompt && !isLoading && (
          <section aria-labelledby="output-section-title" className="bg-slate-800/70 backdrop-blur-md p-6 rounded-xl shadow-2xl ring-1 ring-slate-700 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 sm:mb-5">
              <h2 id="output-section-title" className="text-2xl sm:text-3xl font-semibold text-green-400 flex items-center mb-3 sm:mb-0">
                <span className="mr-3 text-3xl sm:text-4xl">✨</span>
                Your Powerful AI Prompt
              </h2>
              <CopyButton textToCopy={enhancedPrompt} />
            </div>
            <TextAreaInput
              value={enhancedPrompt}
              readOnly={true}
              rows={12}
              className="bg-slate-700/50 border-slate-600 focus:ring-green-500 focus:border-green-500 text-gray-100"
            />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
