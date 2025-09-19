import React from 'react';
import { Monitor, Code, Server, Terminal } from 'lucide-react';
import { useLanguageContext } from '../../context/LanguageContext';
import '../../styles/windows/AboutWindow.css';

const AboutWindow: React.FC = () => {
  const { t } = useLanguageContext();

  return (
    <div className="about-window">
      <div className="about-header">
        <h2>{t('aboutMe')}</h2>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <Monitor size={24} className="about-icon" />
          <div className="section-content">
            <h3>{t('whoIAm')}</h3>
            <p>
              {t('whoIAmText')}
            </p>
          </div>
        </div>
        
        <div className="about-section">
          <Code size={24} className="about-icon" />
          <div className="section-content">
            <h3>{t('mySetup')}</h3>
            <p>
              {t('mySetupText')}
            </p>
          </div>
        </div>
        
        <div className="about-section">
          <Server size={24} className="about-icon" />
          <div className="section-content">
            <h3>{t('learningPhilosophy')}</h3>
            <p>
              {t('learningPhilosophyText')}
            </p>
          </div>
        </div>
        
        <div className="about-section">
          <Terminal size={24} className="about-icon" />
          <div className="section-content">
            <h3>{t('beyondCoding')}</h3>
            <p>
              {t('beyondCodingText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;