
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 my-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300">
      <p className="font-bold">An Error Occurred</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
