import React from 'react';
import { 
  Home, User, Code2, Folder, Computer, LogOut,
  Github, Linkedin, AtSign, Settings, Gamepad2
} from 'lucide-react';
import { useWindowContext } from '../context/WindowContext';
import { useSoundContext } from '../context/SoundContext';
import { useThemeContext } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import { useOSTheme } from '../context/OSThemeContext';
import '../styles/StartMenu.css';

interface StartMenuProps {
  onClose: () => void;
  onShutdown: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onShutdown }) => {
  const { openWindow } = useWindowContext();
  const { playSound } = useSoundContext();
  const { isDarkMode } = useThemeContext();
  const { t } = useLanguageContext();
  const { themeConfig } = useOSTheme();

  const handleItemClick = (id: 'home' | 'about' | 'skills' | 'projects' | 'computer' | 'snake') => {
    playSound('click');
    openWindow(id);
    onClose();
  };

  const handleShutdown = () => {
    playSound('shutdown');
    onShutdown();
    onClose();
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('mailto:eliasrezai.dev@gmail.com', '_blank');
    playSound('click');
    onClose();
  };

  return (
    <div 
      className={`start-menu start-menu-${themeConfig.layout.startMenuStyle} ${isDarkMode ? 'dark' : ''}`}
      style={{ 
        borderColor: themeConfig.colors.primary,
        fontFamily: themeConfig.fonts.system 
      }}
    >
      <div className="start-menu-header">
        <div className="start-menu-user">
          <User size={48} className="user-icon" />
          <span className="user-name">Web Developer</span>
        </div>
      </div>
      
      <div className="start-menu-content">
        <div className="start-menu-left">
          <button className="start-menu-item" onClick={() => handleItemClick('home')}>
            <Home size={20} />
            <span>{t('welcome')}</span>
          </button>
          <button className="start-menu-item" onClick={() => handleItemClick('about')}>
            <User size={20} />
            <span>{t('aboutMe')}</span>
          </button>
          <button className="start-menu-item" onClick={() => handleItemClick('skills')}>
            <Code2 size={20} />
            <span>{t('skills')}</span>
          </button>
          <button className="start-menu-item" onClick={() => handleItemClick('projects')}>
            <Folder size={20} />
            <span>{t('projects')}</span>
          </button>
          <button className="start-menu-item" onClick={() => handleItemClick('computer')}>
            <Computer size={20} />
            <span>{t('computer')}</span>
          </button>
          <button className="start-menu-item" onClick={() => handleItemClick('snake')}>
            <Gamepad2 size={20} />
            <span>Snake Game</span>
          </button>
          
          <div className="start-menu-divider"></div>
          
          <a href="https://github.com/elias6969" target="_blank" rel="noopener noreferrer" className="start-menu-item">
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/elias-rezai-523035210/" target="_blank" rel="noopener noreferrer" className="start-menu-item">
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:eliasrezai.dev@gmail.com" onClick={handleEmailClick} className="start-menu-item">
            <AtSign size={20} />
            <span>Email Me</span>
          </a>
        </div>
        
        <div className="start-menu-right">
          <button className="start-menu-item shutdown" onClick={handleShutdown}>
            <LogOut size={20} />
            <span>{t('shutdown')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;