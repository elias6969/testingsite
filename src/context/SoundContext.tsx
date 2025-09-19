import React, { createContext, useContext, useState } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (sound: 'startup' | 'close' | 'minimize' | 'maximize' | 'click' | 'error' | 'shutdown') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  // Updated sound URLs to more reliable sources
  const sounds = {
    startup: '/sounds/windows-xp-startup.mp3',
    close: '/sounds/windows-xp-error.mp3',
    minimize: '/sounds/windows-xp-minimize.mp3',
    maximize: '/sounds/windows-xp-maximize.mp3',
    click: '/sounds/windows-xp-click.mp3',
    error: '/sounds/windows-xp-error.mp3',
    shutdown: '/sounds/windows-xp-shutdown.mp3'
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const playSound = (sound: 'startup' | 'close' | 'minimize' | 'maximize' | 'click' | 'error' | 'shutdown') => {
    if (isMuted) return;
    
    try {
      const audio = new Audio(sounds[sound]);
      audio.volume = 0.3;
      
      // Add event listeners for better error handling
      audio.onerror = (e) => {
        console.warn(`Failed to play sound ${sound}:`, e);
      };
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Error playing sound ${sound}:`, error);
        });
      }
    } catch (err) {
      console.warn(`Error initializing sound ${sound}:`, err);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};