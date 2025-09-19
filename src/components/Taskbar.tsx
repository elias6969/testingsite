import React, { useState } from 'react';
import { Clock, Volume2, VolumeX, Sun, Moon, Globe } from 'lucide-react';
import StartMenu from './StartMenu';
import TaskbarItem from './TaskbarItem';
import { useWindowContext } from '../context/WindowContext';
import { useSoundContext } from '../context/SoundContext';
import { useThemeContext } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import '../styles/Taskbar.css';

interface TaskbarProps {
  onShutdown: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onShutdown }) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { windows, openWindow, focusWindow, closeWindow } = useWindowContext();
  const { isMuted, toggleMute, playSound } = useSoundContext();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { language, setLanguage, t } = useLanguageContext();

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
    if (!isStartMenuOpen) {
      playSound('click');
    }
  };

  const handleTaskbarItemClick = (id: string) => {
    playSound('click');
    const window = windows.find(w => w.id === id);
    if (window) {
      if (window.isMinimized || !window.isOpen) {
        openWindow(id as any);
      } else {
        closeWindow(id as any);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sv' : 'en');
    playSound('click');
  };

  return (
    <div className={`taskbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="taskbar-left">
        <button 
          className={`start-button ${isStartMenuOpen ? 'active' : ''}`} 
          onClick={handleStartClick}
        >
          <span className="start-logo">XP</span>
          <span>{t('welcome')}</span>
        </button>
        
        <div className="taskbar-items">
          {windows
            .filter(window => window.isOpen)
            .map(window => (
              <TaskbarItem 
                key={window.id}
                id={window.id}
                title={t(window.id)}
                icon={window.icon}
                isActive={!window.isMinimized}
                onClick={() => handleTaskbarItemClick(window.id)}
              />
            ))
          }
        </div>
      </div>
      
      <div className="taskbar-right">
        <button className="taskbar-icon-button" onClick={toggleLanguage}>
          <Globe size={16} />
          <span className="language-indicator">{language.toUpperCase()}</span>
        </button>
        <button className="taskbar-icon-button" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="taskbar-icon-button" onClick={toggleMute}>
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <div className="taskbar-time">
          <Clock size={16} />
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      {isStartMenuOpen && <StartMenu onClose={() => setIsStartMenuOpen(false)} onShutdown={onShutdown} />}
    </div>
  );
};

export default Taskbar;