import React, { useState } from 'react';

const ClipboardIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('rect', { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }),
    React.createElement('path', { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" })
);

const CheckIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('polyline', { points: "20 6 9 17 4 12" })
);

const Tag = ({ children, color }) => React.createElement('span', { className: `inline-block px-2 py-0.5 text-xs font-medium rounded-full ${color}` },
    children
);

const getVolatilityColor = (volatility) => {
    if (volatility >= 7) return 'bg-red-500/20 text-red-300';
    if (volatility >= 5) return 'bg-orange-500/20 text-orange-300';
    if (volatility >= 3) return 'bg-yellow-500/20 text-yellow-300';
    if (volatility >= 1) return 'bg-sky-500/20 text-sky-300';
    return 'bg-slate-700 text-slate-400';
};

const ResultsTable = ({ results }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (results.length === 0) {
    return React.createElement('div', { className: "text-center p-10 border-2 border-dashed border-slate-700 rounded-lg max-w-6xl mx-auto mt-6" },
        React.createElement('p', { className: "text-slate-400" }, "Results will appear here once you fetch game info.")
    );
  }

  const handleCopyToClipboard = () => {
    const headers = ['Game', 'Provider', 'Theme', 'Features', 'Volatility', 'RTP', 'Lines', 'Reels'];
    const rows = results.map(game => [
        game.gameName,
        game.provider,
        game.theme.join(', '),
        game.features.join(', '),
        game.volatility,
        game.rtp,
        game.lines,
        game.reels
    ].join('\t'));

    const tsvContent = [headers.join('\t'), ...rows].join('\n');
    
    navigator.clipboard.writeText(tsvContent).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }, (err) => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy results to clipboard.');
    });
  };

  return React.createElement('div', { className: "px-4 py-6 max-w-7xl mx-auto" },
    React.createElement('div', { className: "flex justify-end mb-4" },
      React.createElement('button', {
        onClick: handleCopyToClipboard,
        className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all w-36 justify-center",
        disabled: isCopied,
      },
        isCopied 
          ? React.createElement(React.Fragment, null, React.createElement(CheckIcon, { className: "w-4 h-4 text-emerald-400" }), "Copied!")
          : React.createElement(React.Fragment, null, React.createElement(ClipboardIcon, { className: "w-4 h-4" }), "Copy for Excel")
      )
    ),
    React.createElement('div', { className: "overflow-x-auto bg-slate-800/50 rounded-lg border border-slate-700" },
      React.createElement('table', { className: "min-w-full divide-y divide-slate-700" },
        React.createElement('thead', { className: "bg-slate-800" },
          React.createElement('tr', null,
            React.createElement('th', { scope: "col", className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-300 sm:pl-6" }, "Game"),
            React.createElement('th', { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-300" }, "Provider"),
            React.createElement('th', { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-300" }, "Theme"),
            React.createElement('th', { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-300" }, "Features"),
            React.createElement('th', { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-300" }, "Volatility"),
            React.createElement('th', { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-300" }, "RTP"),
            React.createElement('th', { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-300" }, "Lines"),
            React.createElement('th', { scope: "col", className: "px-3 py-3.5 text-left text-sm font-semibold text-slate-300" }, "Reels")
          )
        ),
        React.createElement('tbody', { className: "divide-y divide-slate-800" },
          results.map((game, index) => 
            React.createElement('tr', { key: `${game.gameName}-${index}`, className: "hover:bg-slate-700/50 transition-colors" },
              React.createElement('td', { className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6" }, game.gameName),
              React.createElement('td', { className: "whitespace-nowrap px-3 py-4 text-sm text-slate-400" }, game.provider),
              React.createElement('td', { className: "whitespace-normal px-3 py-4 text-sm text-slate-300 max-w-xs" }, game.theme.join(', ')),
              React.createElement('td', { className: "whitespace-normal px-3 py-4 text-sm text-slate-300 max-w-xs" }, game.features.join(', ')),
              React.createElement('td', { className: "whitespace-nowrap px-3 py-4 text-sm text-slate-300" }, game.volatility > 0 && React.createElement(Tag, { color: getVolatilityColor(game.volatility) }, `${game.volatility}/8`)),
              React.createElement('td', { className: "whitespace-nowrap px-3 py-4 text-sm text-slate-300" }, game.rtp && React.createElement(Tag, { color: "bg-emerald-500/20 text-emerald-300" }, game.rtp)),
              React.createElement('td', { className: "whitespace-nowrap px-3 py-4 text-sm text-slate-300" }, game.lines && React.createElement(Tag, { color: "bg-purple-500/20 text-purple-300" }, game.lines)),
              React.createElement('td', { className: "whitespace-nowrap px-3 py-4 text-sm text-slate-300" }, game.reels && React.createElement(Tag, { color: "bg-blue-500/20 text-blue-300" }, game.reels))
            )
          )
        )
      )
    )
  );
};

export default ResultsTable;
