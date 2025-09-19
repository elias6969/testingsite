import React, { createContext, useContext, useState, useEffect } from 'react';

export type WindowType = 'home' | 'about' | 'skills' | 'projects' | 'contact' | 'computer' | 'work' | 'education' | 'cv' | 'snake';

interface WindowState {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  icon: string;
}

interface WindowContextType {
  windows: WindowState[];
  openWindow: (id: WindowType) => void;
  closeWindow: (id: WindowType) => void;
  minimizeWindow: (id: WindowType) => void;
  maximizeWindow: (id: WindowType) => void;
  restoreWindow: (id: WindowType) => void;
  focusWindow: (id: WindowType) => void;
  updateWindowPosition: (id: WindowType, position: { x: number; y: number }) => void;
  getHighestZIndex: () => number;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

const initialWindows: WindowState[] = [
  {
    id: 'home',
    title: 'Welcome',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 50, y: 50 },
    size: { width: 500, height: 400 },
    icon: 'home'
  },
  {
    id: 'about',
    title: 'About Me',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 100 },
    size: { width: 600, height: 500 },
    icon: 'user'
  },
  {
    id: 'skills',
    title: 'My Skills',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 150, y: 150 },
    size: { width: 650, height: 600 },
    icon: 'code2'
  },
  {
    id: 'projects',
    title: 'My Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 200, y: 120 },
    size: { width: 700, height: 550 },
    icon: 'folder'
  },
  {
    id: 'contact',
    title: 'Contact Me',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 200, y: 120 },
    size: { width: 700, height: 550 },
    icon: 'mail'
  },
  {
    id: 'computer',
    title: 'My Computer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 300, y: 100 },
    size: { width: 600, height: 500 },
    icon: 'computer'
  },
  {
    id: 'work',
    title: 'Work History',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 350, y: 120 },
    size: { width: 600, height: 500 },
    icon: 'briefcase'
  },
  {
    id: 'education',
    title: 'Education',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 400, y: 140 },
    size: { width: 600, height: 500 },
    icon: 'graduationCap'
  },
  {
    id: 'cv',
    title: 'My CV',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 450, y: 160 },
    size: { width: 600, height: 800 },
    icon: 'fileText'
  },
  {
    id: 'snake',
    title: 'Snake Game',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 200, y: 100 },
    size: { width: 500, height: 600 },
    icon: 'gamepad2'
  }
];

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const getHighestZIndex = () => {
    return maxZIndex;
  };

  const focusWindow = (id: WindowType) => {
    setWindows(prevWindows => {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);

      return prevWindows.map(window =>
        window.id === id
          ? { ...window, zIndex: newZIndex, isMinimized: false }
          : window
      );
    });
  };

  const openWindow = (id: WindowType) => {
    setWindows(prevWindows => {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);

      return prevWindows.map(window =>
        window.id === id
          ? { ...window, isOpen: true, isMinimized: false, zIndex: newZIndex }
          : window
      );
    });
  };

  const closeWindow = (id: WindowType) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === id
          ? { ...window, isOpen: false, isMinimized: false, isMaximized: false }
          : window
      )
    );
  };

  const minimizeWindow = (id: WindowType) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === id
          ? { ...window, isMinimized: true }
          : window
      )
    );
  };

  const maximizeWindow = (id: WindowType) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === id
          ? { ...window, isMaximized: true }
          : window
      )
    );
  };

  const restoreWindow = (id: WindowType) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === id
          ? { ...window, isMaximized: false }
          : window
      )
    );
  };

  const updateWindowPosition = (id: WindowType, position: { x: number; y: number }) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === id
          ? { ...window, position }
          : window
      )
    );
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        updateWindowPosition,
        getHighestZIndex
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};
