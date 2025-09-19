import React, { useState } from 'react';
import { Monitor, ChevronDown } from 'lucide-react';
import { useOSTheme, OSTheme } from '../context/OSThemeContext';
import { useSoundContext } from '../context/SoundContext';
import '../styles/OSThemeSelector.css';

const OSThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useOSTheme();
  const { playSound } = useSoundContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: OSTheme) => {
    setTheme(theme);
    playSound('click');
    setIsOpen(false);
  };

  const currentThemeName = availableThemes.find(t => t.id === currentTheme)?.name || 'Unknown';

  return (
    <div className="os-theme-selector">
      <button 
        className="theme-selector-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Monitor size={16} />
        <span>{currentThemeName}</span>
        <ChevronDown size={14} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          {availableThemes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <Monitor size={14} />
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OSThemeSelector;