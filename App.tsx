import React, { useState, useCallback } from 'react';
import { GameInfo } from './types';
import { fetchGameData } from './services/geminiService';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResultsTable from './components/ResultsTable';
import ErrorMessage from './components/ErrorMessage';
// Loader is not used as a standalone component here, but integrated into InputArea and a text loader.

const App: React.FC = () => {
  const [gameInput, setGameInput] = useState('');
  const [gameResults, setGameResults] = useState<GameInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = useCallback(async () => {
    if (!gameInput.trim()) {
      setError("Please enter at least one game name.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGameResults([]); // Clear previous results

    try {
      const results = await fetchGameData(gameInput);
      setGameResults(results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [gameInput]);

  const handleClearInput = useCallback(() => {
    setGameInput('');
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <InputArea 
          value={gameInput}
          onChange={(e) => setGameInput(e.target.value)}
          onSubmit={handleFetchData}
          onClear={handleClearInput}
          isLoading={isLoading}
        />
        
        {error && <ErrorMessage message={error} />}

        <div className="mt-6">
          <ResultsTable results={gameResults} />
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-slate-500">
        <p className="font-semibold">Created by Bob Fox</p>
        <p className="mt-1">Powered by Google Gemini. Data provided for informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;