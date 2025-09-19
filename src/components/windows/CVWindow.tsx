import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useLanguageContext } from '../../context/LanguageContext';
import '../../styles/windows/CVWindow.css';

const CVWindow: React.FC = () => {
  const { language, t } = useLanguageContext();

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const fileName = language === 'en' ? 'cveng.pdf' : 'cvsve.pdf';
    
    fetch(`/cvs/${fileName}`)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="cv-window">
      <div className="cv-header">
        <h2>{t('cv')}</h2>
      </div>
      
      <div className="cv-content">
        <div className="cv-section">
          <h3>Elias Rezai</h3>
          <p className="cv-title">{t('developerTitle')}</p>
          
          <div className="cv-download">
            <a href="#" onClick={handleDownload} className="download-button">
              <Download size={16} />
              {t('downloadCV')}
            </a>
          </div>
          
          <div className="cv-preview">
            <div className="cv-section">
              <h4>{t('education')}</h4>
              <div className="cv-item">
                <h5>LBS Kreativa Gymnasiet</h5>
                <p>System Development • 2021 - 2024</p>
              </div>
              <div className="cv-item">
                <h5>Tekniska Högskola</h5>
                <p>.NET Developer • Aug 2024 - May 2026</p>
              </div>
            </div>
            
            <div className="cv-section">
              <h4>{t('work')}</h4>
              <div className="cv-item">
                <h5>Freelance Backend Developer</h5>
                <p>Self-employed • Mar 2025 - Present</p>
                <ul className="cv-details">
                  <li>Building robust backend systems with Node.js and Express</li>
                  <li>Implementing real-time features with Socket.io</li>
                  <li>Database design and management with PostgreSQL</li>
                </ul>
              </div>
            </div>
            
            <div className="cv-section">
              <h4>{t('skills')}</h4>
              <div className="cv-skills">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">Socket.io</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">JWT</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Git</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVWindow;