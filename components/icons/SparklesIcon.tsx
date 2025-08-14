
import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6-11.5A.5.5 0 0 1 3 2l11.5 6a2 2 0 0 0 1.437-1.437L22 3a.5.5 0 0 1 .5.5l-3.578 7.875a2 2 0 0 0 1.437 1.437L18 21a.5.5 0 0 1-.5-.5l-1.938-5.5a2 2 0 0 0-1.437-1.437Z" />
    <path d="M10 3 8 8" />
    <path d="m21 14-5-2" />
  </svg>
);

export default SparklesIcon;
