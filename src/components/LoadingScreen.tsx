import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 grid-background"></div>
      <div className="relative text-center">
        <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-4 animate-pulse backdrop-blur-sm">
          LOADING
        </div>
        <div className="text-2xl font-bold tracking-tight animate-pulse">
          StichUp
        </div>
        <div className="mt-4 flex justify-center">
          <div className="relative w-12 h-1 bg-secondary/30 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-full bg-primary/50 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
