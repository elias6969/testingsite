import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import '../../styles/windows/EducationWindow.css';

const EducationWindow: React.FC = () => {
  return (
    <div className="education-window">
      <div className="education-header">
        <h2>Education</h2>
      </div>
      
      <div className="education-content">
        <div className="education-timeline">
          <div className="education-entry">
            <div className="education-icon">
              <GraduationCap size={24} />
            </div>
            <div className="education-details">
              <h3>LBS Kreativa Gymnasiet</h3>
              <div className="education-meta">
                <span className="program">System Development</span>
                <span className="duration">
                  <Calendar size={14} />
                  2021 - 2024
                </span>
              </div>
              <div className="skills-learned">
                <h4>Key Skills:</h4>
                <div className="skill-tags">
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">C#</span>
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">PHP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="education-entry">
            <div className="education-icon">
              <GraduationCap size={24} />
            </div>
            <div className="education-details">
              <h3>Tekniska Högskola</h3>
              <div className="education-meta">
                <span className="program">.NET Developer</span>
                <span className="duration">
                  <Calendar size={14} />
                  Aug 2024 - May 2026
                </span>
              </div>
              <p className="education-description">
                Currently studying C# and .NET development, exploring new tools and technologies for software development.
              </p>
              <div className="skills-learned">
                <h4>Key Skills:</h4>
                <div className="skill-tags">
                  <span className="skill-tag">C#</span>
                  <span className="skill-tag">SQL</span>
                  <span className="skill-tag">Cloud Applications</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">API</span>
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">PHP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationWindow;