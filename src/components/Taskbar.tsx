import React, { useState } from 'react';
import { Clock, Volume2, VolumeX, Sun, Moon, Globe, Menu, Search, Grid3X3 } from 'lucide-react';
import StartMenu from './StartMenu';
import TaskbarItem from './TaskbarItem';
import { useWindowContext } from '../context/WindowContext';
import { useSoundContext } from '../context/SoundContext';
import { useThemeContext } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import { useOSTheme } from '../context/OSThemeContext';
import OSThemeSelector from './OSThemeSelector';
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
  const { themeConfig, currentTheme } = useOSTheme();

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

  const renderTaskbarContent = () => {
    switch (currentTheme) {
      case 'windows-xp':
        return (
          <>
            <div className="taskbar-left">
              <button 
                className={`start-button xp-start ${isStartMenuOpen ? 'active' : ''}`} 
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
            
            <div className="taskbar-right xp-tray">
              <OSThemeSelector />
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
          </>
        );

      case 'ubuntu':
        return (
          <div className="ubuntu-launcher">
            <button 
              className={`ubuntu-dash-button ${isStartMenuOpen ? 'active' : ''}`}
              onClick={handleStartClick}
            >
              <Grid3X3 size={24} />
            </button>
            <div className="ubuntu-dock">
              {windows
                .filter(window => window.isOpen)
                .map(window => (
                  <div 
                    key={window.id}
                    className={`ubuntu-dock-item ${!window.isMinimized ? 'active' : ''}`}
                    onClick={() => handleTaskbarItemClick(window.id)}
                  >
                    <div className="dock-icon"></div>
                  </div>
                ))
              }
            </div>
            <div className="ubuntu-controls">
              <OSThemeSelector />
              <button className="ubuntu-control" onClick={toggleLanguage}>
                <Globe size={16} />
              </button>
              <button className="ubuntu-control" onClick={toggleTheme}>
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button className="ubuntu-control" onClick={toggleMute}>
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </div>
        );

      case 'macos':
        return (
          <>
            <div className="macos-menu-bar">
              <div className="macos-left">
                <button className="macos-apple-menu" onClick={handleStartClick}>
                🍎
                </button>
                <span className="macos-app-name">Portfolio</span>
              </div>
              <div className="macos-right">
                <OSThemeSelector />
                <button className="macos-menu-item" onClick={toggleLanguage}>
                  <Globe size={14} />
                </button>
                <button className="macos-menu-item" onClick={toggleTheme}>
                  {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                </button>
                <button className="macos-menu-item" onClick={toggleMute}>
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <div className="macos-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            <div className="macos-dock">
              {windows
                .filter(window => window.isOpen)
                .map(window => (
                  <div 
                    key={window.id}
                    className={`macos-dock-item ${!window.isMinimized ? 'active' : ''}`}
                    onClick={() => handleTaskbarItemClick(window.id)}
                  >
                    <div className="dock-icon-macos"></div>
                  </div>
                ))
              }
            </div>
          </>
        );

      default: // arch, debian (GNOME-style)
        return (
          <>
            <div className="gnome-panel">
              <div className="gnome-left">
                <button 
                  className={`gnome-activities ${isStartMenuOpen ? 'active' : ''}`}
                  onClick={handleStartClick}
                >
                  Activities
                </button>
              </div>
              
              <div className="gnome-center">
                <div className="gnome-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div className="gnome-right">
                <OSThemeSelector />
                <button className="gnome-indicator" onClick={toggleLanguage}>
                  <Globe size={16} />
                </button>
                <button className="gnome-indicator" onClick={toggleTheme}>
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button className="gnome-indicator" onClick={toggleMute}>
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
            
            <div className="gnome-dock">
              {windows
                .filter(window => window.isOpen)
                .map(window => (
                  <div 
                    key={window.id}
                    className={`gnome-dock-item ${!window.isMinimized ? 'active' : ''}`}
                    onClick={() => handleTaskbarItemClick(window.id)}
                  >
                    <div className="dock-icon-gnome"></div>
                  </div>
                ))
              }
            </div>
          </>
        );
    }
  };

  return (
    <div 
      className={`taskbar taskbar-${currentTheme} ${isDarkMode ? 'dark' : ''}`}
      style={{ 
        background: themeConfig.colors.taskbar,
        height: themeConfig.layout.taskbarHeight,
        [themeConfig.layout.taskbarPosition]: 0,
        fontFamily: themeConfig.fonts.system
      }}
    >
      {renderTaskbarContent()}
      {isStartMenuOpen && <StartMenu onClose={() => setIsStartMenuOpen(false)} onShutdown={onShutdown} />}
    </div>
  );
};

export default Taskbar;