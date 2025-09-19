import React, { createContext, useContext, useState } from 'react';

export type OSTheme = 'windows-xp' | 'arch' | 'debian' | 'ubuntu' | 'macos';

interface OSThemeConfig {
  name: string;
  wallpaper: string;
  darkWallpaper: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    taskbar: string;
    window: string;
    text: string;
    windowHeader: string;
    startButton: string;
  };
  fonts: {
    system: string;
    mono: string;
  };
  layout: {
    taskbarPosition: 'bottom' | 'top' | 'left' | 'right';
    taskbarHeight: string;
    windowStyle: 'xp' | 'gnome' | 'kde' | 'macos';
    iconStyle: 'xp' | 'linux' | 'macos';
    startMenuStyle: 'xp' | 'gnome' | 'unity' | 'dock';
  };
  sounds: {
    startup: string;
    click: string;
    error: string;
  };
}

const osThemes: Record<OSTheme, OSThemeConfig> = {
  'windows-xp': {
    name: 'Windows XP',
    wallpaper: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    darkWallpaper: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    colors: {
      primary: '#0c52cd',
      secondary: '#245edb',
      accent: '#3c8b27',
      taskbar: 'linear-gradient(180deg, #245edb 0%, #2c62e3 3%, #2c62e3 10%, #245edb 100%)',
      window: '#ece9d8',
      text: '#000000',
      windowHeader: 'linear-gradient(180deg, #0c52cd 0%, #1373de 100%)',
      startButton: 'linear-gradient(180deg, #3c8b27 0%, #2bd820 50%, #1da810 51%, #2db81d 100%)'
    },
    fonts: {
      system: "'MS Sans Serif', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      mono: "'Courier New', monospace"
    },
    layout: {
      taskbarPosition: 'bottom',
      taskbarHeight: '40px',
      windowStyle: 'xp',
      iconStyle: 'xp',
      startMenuStyle: 'xp'
    },
    sounds: {
      startup: '/sounds/windows-xp-startup.mp3',
      click: '/sounds/windows-xp-click.mp3',
      error: '/sounds/windows-xp-error.mp3'
    }
  },
  'arch': {
    name: 'Arch Linux',
    wallpaper: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    darkWallpaper: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    colors: {
      primary: '#1793d1',
      secondary: '#0f7ba4',
      accent: '#ff6b35',
      taskbar: '#1a1a1a',
      window: '#2d2d2d',
      text: '#ffffff',
      windowHeader: '#1793d1',
      startButton: '#1793d1'
    },
    fonts: {
      system: "'Fira Sans', 'Ubuntu', sans-serif",
      mono: "'Fira Code', 'Source Code Pro', monospace"
    },
    layout: {
      taskbarPosition: 'bottom',
      taskbarHeight: '32px',
      windowStyle: 'gnome',
      iconStyle: 'linux',
      startMenuStyle: 'gnome'
    },
    sounds: {
      startup: '/sounds/linux-startup.mp3',
      click: '/sounds/linux-click.mp3',
      error: '/sounds/linux-error.mp3'
    }
  },
  'debian': {
    name: 'Debian',
    wallpaper: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    darkWallpaper: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    colors: {
      primary: '#d70a53',
      secondary: '#a50d3d',
      accent: '#ce262f',
      taskbar: '#2c2c2c',
      window: '#f5f5f5',
      text: '#000000',
      windowHeader: '#d70a53',
      startButton: '#d70a53'
    },
    fonts: {
      system: "'DejaVu Sans', 'Liberation Sans', sans-serif",
      mono: "'DejaVu Sans Mono', 'Liberation Mono', monospace"
    },
    layout: {
      taskbarPosition: 'bottom',
      taskbarHeight: '36px',
      windowStyle: 'gnome',
      iconStyle: 'linux',
      startMenuStyle: 'gnome'
    },
    sounds: {
      startup: '/sounds/linux-startup.mp3',
      click: '/sounds/linux-click.mp3',
      error: '/sounds/linux-error.mp3'
    }
  },
  'ubuntu': {
    name: 'Ubuntu',
    wallpaper: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    darkWallpaper: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    colors: {
      primary: '#e95420',
      secondary: '#c7431a',
      accent: '#77216f',
      taskbar: '#2c001e',
      window: '#f7f7f7',
      text: '#000000',
      windowHeader: '#e95420',
      startButton: '#e95420'
    },
    fonts: {
      system: "'Ubuntu', 'Cantarell', sans-serif",
      mono: "'Ubuntu Mono', 'Source Code Pro', monospace"
    },
    layout: {
      taskbarPosition: 'left',
      taskbarHeight: '64px',
      windowStyle: 'gnome',
      iconStyle: 'linux',
      startMenuStyle: 'unity'
    },
    sounds: {
      startup: '/sounds/linux-startup.mp3',
      click: '/sounds/linux-click.mp3',
      error: '/sounds/linux-error.mp3'
    }
  },
  'macos': {
    name: 'macOS',
    wallpaper: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    darkWallpaper: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    colors: {
      primary: '#007aff',
      secondary: '#5856d6',
      accent: '#ff3b30',
      taskbar: 'rgba(255,255,255,0.8)',
      window: '#ffffff',
      text: '#000000',
      windowHeader: 'rgba(255,255,255,0.95)',
      startButton: 'transparent'
    },
    fonts: {
      system: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif",
      mono: "'SF Mono', 'Monaco', monospace"
    },
    layout: {
      taskbarPosition: 'top',
      taskbarHeight: '28px',
      windowStyle: 'macos',
      iconStyle: 'macos',
      startMenuStyle: 'dock'
    },
    sounds: {
      startup: '/sounds/macos-startup.mp3',
      click: '/sounds/macos-click.mp3',
      error: '/sounds/macos-error.mp3'
    }
  }
};

interface OSThemeContextType {
  currentTheme: OSTheme;
  setTheme: (theme: OSTheme) => void;
  themeConfig: OSThemeConfig;
  availableThemes: { id: OSTheme; name: string }[];
}

const OSThemeContext = createContext<OSThemeContextType | undefined>(undefined);

export const OSThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<OSTheme>('windows-xp');

  const setTheme = (theme: OSTheme) => {
    setCurrentTheme(theme);
    // Apply theme CSS variables to document root
    const root = document.documentElement;
    const config = osThemes[theme];
    
    root.style.setProperty('--os-primary', config.colors.primary);
    root.style.setProperty('--os-secondary', config.colors.secondary);
    root.style.setProperty('--os-accent', config.colors.accent);
    root.style.setProperty('--os-window', config.colors.window);
    root.style.setProperty('--os-text', config.colors.text);
    root.style.setProperty('--os-window-header', config.colors.windowHeader);
    root.style.setProperty('--os-taskbar', config.colors.taskbar);
    root.style.setProperty('--os-font-system', config.fonts.system);
    root.style.setProperty('--os-font-mono', config.fonts.mono);
    root.style.setProperty('--taskbar-height', config.layout.taskbarHeight);
    
    // Add OS-specific class to body
    document.body.className = `os-${theme}`;
  };

  const availableThemes = Object.entries(osThemes).map(([id, config]) => ({
    id: id as OSTheme,
    name: config.name
  }));

  return (
    <OSThemeContext.Provider value={{
      currentTheme,
      setTheme,
      themeConfig: osThemes[currentTheme],
      availableThemes
    }}>
      {children}
    </OSThemeContext.Provider>
  );
};

export const useOSTheme = () => {
  const context = useContext(OSThemeContext);
  if (context === undefined) {
    throw new Error('useOSTheme must be used within an OSThemeProvider');
  }
  return context;
};