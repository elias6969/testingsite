import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import { WindowProvider } from './context/WindowContext';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import ShutdownScreen from './components/ShutdownScreen';
import ToastQuote from './components/ToastQuote';
import './styles/App.css';

function App() {
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setTimeout(() => {
      setIsShuttingDown(false);
    }, 5000);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <WindowProvider>
            <div className="app-container">
              {isShuttingDown ? (
                <ShutdownScreen />
              ) : (
                <>
                  <Desktop />
                  <WindowManager />
                  <Taskbar onShutdown={handleShutdown} />
                  <ToastQuote />
                </>
              )}
            </div>
          </WindowProvider>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;