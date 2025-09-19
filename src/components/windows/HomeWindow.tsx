import React from 'react';
import { useLanguageContext } from '../../context/LanguageContext';
import '../../styles/windows/HomeWindow.css';

const HomeWindow: React.FC = () => {
  const { t } = useLanguageContext();

  return (
    <div className="home-window">
      <div className="welcome-screen">
        <h1 className="welcome-title">Elias Rezai</h1>
        <h2 className="welcome-subtitle">{t('developerTitle')}</h2>
        <p className="welcome-tagline">{t('welcomeTagline')}</p>
        
        <div className="welcome-instructions">
          <p>{t('welcomeInstructions')}</p>
          <p>{t('useStartMenu')}</p>
          <p>{t('dragWindows')}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeWindow;