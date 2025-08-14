import React from 'react';

const ErrorMessage = ({ message }) => {
  return React.createElement('div', { className: "max-w-4xl mx-auto p-4 my-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300" },
    React.createElement('p', { className: "font-bold" }, "An Error Occurred"),
    React.createElement('p', { className: "mt-1 text-sm" }, message)
  );
};

export default ErrorMessage;
