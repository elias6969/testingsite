import React, { useState, useRef, useEffect } from 'react';
import { XIcon as Icon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useWindowContext, WindowType } from '../context/WindowContext';
import { useSoundContext } from '../context/SoundContext';
import { useThemeContext } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import { useOSTheme } from '../context/OSThemeContext';
import '../styles/Window.css';

interface WindowProps {
  id: WindowType;
  title: string;
  icon: string;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ id, title, icon, children }) => {
  const { 
    windows, 
    closeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowContext();
  const { playSound } = useSoundContext();
  const { isDarkMode } = useThemeContext();
  const { t } = useLanguageContext();
  const { themeConfig } = useOSTheme();
  
  const window = windows.find(w => w.id === id);
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const LucideIcon = (LucideIcons[icon as keyof typeof LucideIcons] ?? Icon) as React.FC<React.ComponentProps<typeof Icon>>;

  useEffect(() => {
    if (!window) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        updateWindowPosition(id, { x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [id, isDragging, dragOffset, updateWindowPosition, window?.isMaximized]);

  useEffect(() => {
    if (window?.isOpen && !window?.isMinimized) {
      focusWindow(id);
    }
  }, [window?.isOpen, window?.isMinimized]);

  if (!window || !window.isOpen || window.isMinimized) {
    return null;
  }

  const handleMouseDown = () => {
    focusWindow(id);
  };

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    
    setIsDragging(true);
    
    const boundingRect = headerRef.current?.getBoundingClientRect();
    if (boundingRect) {
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
    }
  };

  const handleClose = () => {
    playSound('close');
    closeWindow(id);
  };

  const windowStyle = window.isMaximized
    ? { zIndex: window.zIndex }
    : {
        width: window.size.width,
        height: window.size.height,
        left: window.position.x,
        top: window.position.y,
        zIndex: window.zIndex
      };

  return (
    <div
      ref={windowRef}
      className={`window ${window.isMaximized ? 'maximized' : ''} ${isDarkMode ? 'dark' : ''}`}
      style={{
        ...windowStyle,
        backgroundColor: themeConfig.colors.window,
        color: themeConfig.colors.text,
        fontFamily: themeConfig.fonts.system
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        ref={headerRef}
        className="window-header"
        style={{ background: `linear-gradient(180deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)` }}
        onMouseDown={handleHeaderMouseDown}
      >
        <div className="window-title">
          <LucideIcon size={16} />
          <span>{t(id)}</span>
        </div>
        <div className="window-controls">
          <button className="window-control close" onClick={handleClose}>
            <Icon size={12} />
          </button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;