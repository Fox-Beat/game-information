import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <img
        src="https://digibeat.com/wp-content/uploads/2022/06/logo-white.png"
        alt="Digibeat Logo"
        className="h-12 w-auto mx-auto mb-4 object-contain"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-sky-400">
        Casino Game Info Finder
      </h1>
      <p className="mt-2 text-md md:text-lg text-slate-400 max-w-2xl mx-auto">
        Instantly get details like volatility, theme, and features for a batch of online slot games using AI.
      </p>
    </header>
  );
};

export default Header;
