import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface InputAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ value, onChange, onSubmit, onClear, isLoading }) => {
  const placeholderText = `Paste directly from a spreadsheet (e.g., Excel).\nIt should have two columns: one for the game name and one for the provider.\n\nExample:\nCleopatra II\tIGT\nSugar Rush 1000\tPragmatic Play`;
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col gap-4">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholderText}
          rows={10}
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 placeholder:text-slate-500 whitespace-pre-wrap"
          disabled={isLoading}
          aria-label="Game list input"
        />
        <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onSubmit}
              disabled={isLoading || !value.trim()}
              className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Fetching Info...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Get Game Info
                </>
              )}
            </button>
            <button
                onClick={onClear}
                disabled={isLoading || !value.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-slate-700 text-slate-300 font-bold rounded-lg hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Clear input"
            >
                Clear
            </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;