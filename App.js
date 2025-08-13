import React, { useState, useCallback } from 'react';
import { fetchGameData } from './services/geminiService.js';
import Header from './components/Header.js';
import InputArea from './components/InputArea.js';
import ResultsTable from './components/ResultsTable.js';
import ErrorMessage from './components/ErrorMessage.js';

const App = () => {
  const [gameInput, setGameInput] = useState('');
  const [gameResults, setGameResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } catch (err) {
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

  return React.createElement('div', { className: 'min-h-screen bg-slate-900 font-sans' },
    React.createElement('main', { className: 'container mx-auto px-4 py-8' },
      React.createElement(Header),
      React.createElement(InputArea, {
        value: gameInput,
        onChange: (e) => setGameInput(e.target.value),
        onSubmit: handleFetchData,
        onClear: handleClearInput,
        isLoading: isLoading
      }),
      error && React.createElement(ErrorMessage, { message: error }),
      React.createElement('div', { className: 'mt-6' },
        React.createElement(ResultsTable, { results: gameResults })
      )
    ),
    React.createElement('footer', { className: 'text-center py-4 text-sm text-slate-500' },
      React.createElement('p', { className: 'font-semibold' }, 'Created by Bob Fox'),
      React.createElement('p', { className: 'mt-1' }, 'Powered by Google Gemini. Data provided for informational purposes only.')
    )
  );
};

export default App;
